var utcDate1 = Date.now();

const worker_calendar = new Worker('modules/calendar/webworkers/worker_calendar.js?v='+utcDate1);
const worker_events = new Worker('modules/calendar/webworkers/worker_events.js?v='+utcDate1);
const worker_climate = new Worker('modules/calendar/webworkers/worker_climate.js?v='+utcDate1);

function bind_calendar_events(){

	$(".timespan_container").on('scroll', function(e) {
		//calculate left position
		var left = $(this).scrollLeft();
		//apply to header in negative
		$(this).children().first().css('left', left);
	});

	calendar_weather.tooltip.set_up();
	
	$(document).on('mouseenter', '.weather_icon', function(){
		calendar_weather.tooltip.show($(this));
	});

	$(document).on('mouseleave', '.weather_icon', function(){
		calendar_weather.tooltip.hide();
	});

	$(document).on('scroll', function(){
		calendar_weather.tooltip.hide();
	});

	$('#calendar').scroll(function(){
		eras.evaluate_position();
	});




}


var evaluated_calendar_data = {};


function rebuild_calendar(action){
	worker_calendar.postMessage({
		calendar: calendar,
		action: action
	});
}

function rebuild_climate(){
	worker_climate.postMessage({
		calendar: calendar,
		calendar_data: evaluated_calendar_data
	});
}

function rebuild_events(event_id){

	worker_events.postMessage({
		calendar: calendar,
		pre_epoch_data: evaluated_calendar_data.pre_epoch_data,
		epoch_data: evaluated_calendar_data.epoch_data,
		event_id: event_id
	});

}


worker_events.onmessage = e => {

	display_events(calendar, e.data)

}

worker_climate.onmessage = e => {

	calendar_weather.epoch_data = e.data;

	evaluate_weather_charts();

}

worker_calendar.onmessage = e => {

	evaluated_calendar_data = e.data.processed_data;

	calendar = evaluated_calendar_data.calendar;

	if(evaluated_calendar_data.success){
	
		if(e.data.action === "calendar"){

			calendar_layouts.insert_calendar(evaluated_calendar_data);

			calendar_weather.epoch_data = evaluated_calendar_data.epoch_data;

			evaluate_weather_charts();

			var start_epoch = Number(Object.keys(calendar_layouts.epoch_data)[0]);
			var end_epoch = Number(Object.keys(calendar_layouts.epoch_data)[Object.keys(calendar_layouts.epoch_data).length-1]);
			eras.evaluate_current_era(calendar, start_epoch, end_epoch);
			eras.set_up_position();
			eras.display_era_events(calendar);

			rebuild_events();

		}else if(e.data.action === "weather"){

			evaluate_weather_charts();

		}

	}else{

		calendar_layouts.insert_empty_calendar(evaluated_calendar_data);

	}

};