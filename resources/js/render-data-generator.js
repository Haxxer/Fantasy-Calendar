const render_data_generator = {

	get_weather_icon: function(epoch){
	
		let epoch_data = this.epoch_data[epoch];
		let weather = epoch_data.weather;

		if(weather === undefined ||
			(!Perms.player_at_least('co-owner')
				&&
				(
					static_data.settings.hide_all_weather
					||
					(
						static_data.settings.hide_future_weather
						&&
						epoch > dynamic_data.epoch
					)
				)
			)
		){
			return "";
		}

		if(weather.clouds == "Clear"){
			if(weather.feature == "Fog"){
				return `wi wi-fog`;
			}else{
				return `wi wi-day-sunny`;
			}
		}else{

			if(weather.precipitation.key == "None"){

				if(weather.clouds == "A few clouds"){
					return `wi wi-day-cloudy`;
				}else if(weather.clouds == "Mostly cloudy"){
					return `wi wi-cloud`;
				}else{
					return `wi wi-cloudy`;
				}

			}else{

				if(weather.temperature.metric.actual > 0){

					if(weather.precipitation.actual > 0.375){
						if(weather.feature == "Lightning"){
							return `wi wi-thunderstorm`;
						}else{
							return `wi wi-rain`;
						}
					}else {
						if(weather.feature == "Lightning"){
							return `wi wi-storm-showers`;
						}else{
							if(weather.feature == "Fog" && weather.precipitation.actual < 0.375){
								return `wi wi-fog`;
							}
							return `wi wi-showers`;
						}
					}

				}else{

					if(weather.feature == "Hail"){
						return `wi wi-hail`;
					}else{
						return `wi wi-snow`;
					}

				}
			}
		}

	},

	get_moon_data: function(epoch_data){

		let moons = [];
		for(let moon_index = 0; moon_index < static_data.moons.length; moon_index++){
			let moon = static_data.moons[moon_index];
			moons.push({
				"index": moon_index,
				"name": moon.name,
				"phase": moon_phases[moon.granularity][epoch_data.moon_phase[moon_index]],
				"path": moon_paths[Math.floor((svg_moon_shadows.length/moon.granularity)*epoch_data.moon_phase[moon_index])]
            });
        }
        

		return moons;

	},

	get_day_data: function(epoch){
	
		let epoch_data = this.epoch_data[epoch];

		if(static_data.settings.only_reveal_today && epoch > dynamic_data.epoch && !Perms.player_at_least('co-owner')){
			return {
				"number": false,
				"text": false,
				"type": "empty",
                "weekday": false,
				"epoch": false,
				"year_day": false,
				"weather_icon": false,
				"season_color": false,
				"events": false,
				"moons": false
			}
		}

		let text = ""
		if(epoch_data.leap_day !== undefined){
			let index = epoch_data.leap_day;
			text = static_data.year_data.leap_days[index].name;
		}

		let season_color = epoch_data.season ? (epoch_data.season.color !== undefined ? epoch_data.season.color : false) : false;
		let weather_icon = this.get_weather_icon(epoch);
		
		let moons = false;
		if(!static_data.settings.hide_moons || (static_data.settings.hide_moons && Perms.player_at_least('co-owner'))){
			moons = this.get_moon_data(epoch_data);
		}

        let year_day = static_data.settings.add_year_day_number ? epoch_data.year_day : false;

		return {
			"number": `${epoch_data.day}`,
			"text": text,
            "type": "day",
            "weekday": epoch_data.week_day_name,
			"epoch": epoch,
			"year_day": year_day,
			"weather_icon": weather_icon,
			"season_color": season_color,
			"events": [],
			"moons": moons
		};
	},

	overflow: function(){
		return {
			"number": ``,
			"text": "",
            "type": "overflow",
            "weekday": false,
			"epoch": false,
			"year_day": false,
			"weather_icon": false,
			"season_color": false,
			"events": [],
			"moons": []
		};
    },
    
    _create_render_data: function(processed_data){

        if(processed_data !== undefined){
            this.processed_data = processed_data;
        }else if(this.processed_data === undefined){
            return {
                success: false,
                message: 'No calendar data available'
            };
        }

        let timespans_to_build = this.processed_data.timespans_to_build;
        let year_data = this.processed_data.year_data;
        this.epoch_data = this.processed_data.epoch_data;

        let render_data = {
            "current_epoch": dynamic_data.epoch,
            "preview_epoch": dynamic_data.epoch,
            "render_style": static_data.settings.layout,
            "timespans": [],
            "event_epochs": {},
            "timespan_event_epochs": {},
        }

        let indexes = Object.keys(timespans_to_build)
        let length = indexes.length

        let epoch = year_data.start_epoch;
        let week_day = year_data.week_day;

        for(var index = 0; index < length; index++){

            let timespan = timespans_to_build[indexes[index]];

            var filtered_leap_days_beforestart = timespan.leap_days.filter(function(features){
                return features.intercalary && features.day === 0;
            });

            if(filtered_leap_days_beforestart.length > 0){
                    
                let timespan_data = {
                    "title": "",
                    "show_title": false,
                    "number": static_data.settings.add_month_number ? index+1 : false,
                    "weekdays": static_data.year_data.global_week,
                    "show_weekdays": false,
                    "days": [[]],
                    "events": []
                }

                let weekday_number = 1;

                for(var leap_day_index in filtered_leap_days_beforestart){

                    let day_data = this.get_day_data(epoch);
                    timespan_data.days[timespan_data.days.length-1].push(day_data);
                    render_data.event_epochs[epoch] = day_data;
                    render_data.timespan_event_epochs[epoch] = timespan_data;

                    weekday_number++;
                    epoch++;

                    if(weekday_number > timespan.week.length){
                        weekday_number = 1;
                        if(static_data.settings.layout != "vertical"){
                            timespan_data.days.push([]);
                        }
                    }
                }

                for(weekday_number; weekday_number <= static_data.year_data.global_week.length; weekday_number++){
                    timespan_data.days[timespan_data.days.length-1].push(this.overflow());
                }

                render_data.timespans.push(timespan_data);

            }

            let show_months = timespan.type === "month";

            let timespan_data = {
                "title": timespan.name,
                "show_title": true,
                "number": static_data.settings.add_month_number ? index+1 : false,
                "weekdays": timespan.week,
                "short_weekdays": timespan.truncated_week,
                "show_weekdays": !static_data.settings.hide_weekdays ? timespan.type === "month" : false,
                "days": [[]],
                "events": []
            }

            if(!static_data.year_data.overflow){
                week_day = 1;
            }

            for(let day_number = 1; day_number <= timespan.length;){
                
                if(timespan_data.days[timespan_data.days.length-1].length != 0){
                    if(static_data.settings.layout != "vertical"){
                        timespan_data.days.push([])
                    }
                }

                for(let weekday_number = 1; weekday_number <= timespan.week.length; weekday_number++){

                    if(week_day > weekday_number && show_months && static_data.settings.layout != "vertical"){

                        timespan_data.days[timespan_data.days.length-1].push(this.overflow());
                        
                    }else if(day_number <= timespan.length){

                        let day_data = this.get_day_data(epoch);
                        timespan_data.days[timespan_data.days.length-1].push(day_data);
                        render_data.event_epochs[epoch] = day_data;
                        render_data.timespan_event_epochs[epoch] = timespan_data;

                        epoch++;

                        filtered_leap_days = timespan.leap_days.filter(function(leap_day){
                            return leap_day.intercalary && leap_day.day === day_number && leap_day.day !== timespan.length;
                        });

                        if(filtered_leap_days.length > 0){

                            for(let internal_weekday_number = week_day; internal_weekday_number < timespan.week.length; internal_weekday_number++){
                                timespan_data.days[timespan_data.days.length-1].push(this.overflow());
                            }

                            render_data.timespans.push(timespan_data);

                            timespan_data = {
                                "title": "",
                                "show_title": false,
                                "number": static_data.settings.add_month_number ? index+1 : false,
                                "weekdays": static_data.year_data.global_week,
                                "show_weekdays": false,
                                "days": [[]],
                                "events": []
                            }

                            let internal_weekday_number = 1;

                            for(var leap_day_index in filtered_leap_days){

                                let day_data = this.get_day_data(epoch);
                                timespan_data.days[timespan_data.days.length-1].push(day_data);
                                render_data.event_epochs[epoch] = day_data;
                                render_data.timespan_event_epochs[epoch] = timespan_data;

                                internal_weekday_number++;
                                epoch++;

                                if(internal_weekday_number > timespan.week.length){
                                    internal_weekday_number = 1;
                                    if(static_data.settings.layout != "vertical"){
                                        timespan_data.days.push([]);
                                    }
                                }
                            }

                            for(internal_weekday_number; internal_weekday_number <= static_data.year_data.global_week.length; internal_weekday_number++){
                                timespan_data.days[timespan_data.days.length-1].push(this.overflow());
                            }

                            render_data.timespans.push(timespan_data);

                            timespan_data = {
                                "title": timespan.name,
                                "show_title": true,
                                "number": static_data.settings.add_month_number ? index+1 : false,
                                "weekdays": timespan.week,
                                "short_weekdays": timespan.truncated_week,
                                "show_weekdays": !static_data.settings.hide_weekdays ? timespan.type === "month" : false,
                                "days": [[]],
                                "events": []
                            }

                            if(week_day != timespan.week.length){
                                for(let internal_weekday_number = 0; internal_weekday_number < week_day; internal_weekday_number++){
                                    timespan_data.days[timespan_data.days.length-1].push(this.overflow());
                                }
                            }

                        }

                        day_number++;

                        if(show_months){
                            week_day++;
                            
                            if(week_day > timespan.week.length){
                                week_day = 1;
                            }
                        }

                    }else{

                        if(static_data.settings.layout != "vertical"){
                            timespan_data.days[timespan_data.days.length-1].push(this.overflow());
                        }

                    }
                }
            }

            render_data.timespans.push(timespan_data);

            var filtered_leap_days_end = timespan.leap_days.filter(function(features){
                return features.intercalary && features.day === timespan.length;
            });

            if(filtered_leap_days_end.length > 0){
                    
                let timespan_data = {
                    "title": "",
                    "show_title": false,
                    "number": static_data.settings.add_month_number ? index+1 : false,
                    "weekdays": static_data.year_data.global_week,
                    "show_weekdays": false,
                    "days": [[]],
                    "events": []
                }

                let weekday_number = 1;

                for(var leap_day_index in filtered_leap_days_end){

                    timespan_data.days[timespan_data.days.length-1].push(this.get_day_data(epoch));

                    weekday_number++;
                    epoch++;

                    if(weekday_number > timespan.week.length){
                        weekday_number = 1;
                        if(static_data.settings.layout != "vertical"){
                            timespan_data.days.push([]);
                        }
                    }
                }

                for(weekday_number; weekday_number <= static_data.year_data.global_week.length; weekday_number++){
                    timespan_data.days[timespan_data.days.length-1].push(this.overflow());
                }

                render_data.timespans.push(timespan_data);

            }

        }

        this.render_data = render_data;

        return {
            success: true,
            render_data: render_data
        };

    },

	create_render_data: function(processed_data){

        return new Promise(function(resolve, reject){

            var result = render_data_generator._create_render_data(processed_data);

            if(result.success){
                resolve(result.render_data);
            }else{
                reject(result.message);
            }

        });
    
	}

}

module.exports = render_data_generator;