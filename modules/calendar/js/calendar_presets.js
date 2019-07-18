function create_season_events(id, season_name){

	if(season_name == "Winter"){
		equinox_name = "Vernal"
	}else if(season_name == "Summer"){
		equinox_name = "Autumnal"
	}else{
		equinox_name = season_name
	}

	return [
		{
			"name":`${season_name} Solstice`,
			"description":"",
			"data":{
				"length":1,
				"show_start_end":false,
				"show_first_last":false,
				"conditions":[
					["Season","0",[id]],["&&"],["Season","8",["1"]]
				]
			},
			"category":"-1",
			"settings":{
				"color":"Green",
				"text":"text",
				"hide":false,
				"noprint":false
			}
		},
		{
			"name": `${equinox_name} Equinox`,
			"description":"",
			"data":{
				"length":1,
				"show_start_end":false,
				"show_first_last":false,
				"conditions":[
					["Season","0",[id]],["&&"],["Season","2",["50"]]
				]
			},
			"category":"-1",
			"settings":{
				"color":"Green",
				"text":"text",
				"hide":false,
				"noprint":false
			}
		}
	]
}

var date = new Date();

var calendar_presets = {
	'Earth': {
		'dynamic_data': {"year":date.getFullYear(),"timespan":date.getMonth(),"day":date.getDate(),"epoch":0,"custom_location":false,"location":"Cool and Rainy","hour":date.getHours(),"minute":date.getMinutes()},
		'static_data': {"year_data":{"first_day":1,"overflow":true,"global_week":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],"timespans":[{"name":"January","type":"month","length":31,"interval":1,"offset":1},{"name":"February","type":"month","length":28,"interval":1,"offset":1},{"name":"March","type":"month","length":31,"interval":1,"offset":1},{"name":"April","type":"month","length":30,"interval":1,"offset":1},{"name":"May","type":"month","length":31,"interval":1,"offset":1},{"name":"June","type":"month","length":30,"interval":1,"offset":1},{"name":"July","type":"month","length":31,"interval":1,"offset":1},{"name":"August","type":"month","length":31,"interval":1,"offset":1},{"name":"September","type":"month","length":30,"interval":1,"offset":1},{"name":"October","type":"month","length":31,"interval":1,"offset":1},{"name":"November","type":"month","length":30,"interval":1,"offset":1},{"name":"December","type":"month","length":31,"interval":1,"offset":1}],"leap_days":[{"name":"Leap Day","intercalary":false,"timespan":1,"adds_week_day":false,"day":0,"week_day":"Week day name","interval":"400,!100,4","offset":0,"reference":"timespan"}]},"moons":[{"name":"Moon","cycle":29.530588853,"shift":10.24953,"granularity":32,"color":"#ffffff","hidden":false}],"clock":{"hours":24,"minutes":60,"offset":0,"enabled":true},"seasons":{"data":[{"name":"Winter","time":{"sunrise":{"hour":9,"minute":0},"sunset":{"hour":18,"minute":0}},"transition_length":182.62125,"duration":0},{"name":"Summer","time":{"sunrise":{"hour":9,"minute":0},"sunset":{"hour":18,"minute":0}},"transition_length":182.62125,"duration":0}],"locations":[],"global_settings":{"season_offset":-12,"weather_offset":56,"seed":826116802,"temp_sys":"metric","wind_sys":"metric","cinematic":true,"enable_weather":true}},"eras":[{"name":"Before Christ","abbreviation":"B.C.","description":"","settings":{"show_as_event":false,"event_category":-1,"ends_year":false,"restart":false},"date":{"year":-9000,"timespan":0,"day":0,"era_year":-9000,"epoch":-3287161}},{"name":"Anno Domini","abbreviation":"A.D.","description":"","settings":{"show_as_event":false,"event_category":-1,"ends_year":false,"restart":false},"date":{"year":-1,"timespan":11,"day":31,"era_year":-1,"epoch":-1}}],"settings":{"layout":"grid","show_current_month":false,"show_era_abbreviation":true,"allow_view":false,"only_backwards":false,"only_reveal_today":false,"hide_moons":false,"hide_clock":false,"hide_events":false,"hide_eras":false,"hide_all_weather":false,"hide_future_weather":false,"add_month_number":false,"add_year_day_number":false},"cycles":{"0":["21","21","21"],"format":"","data":[]},"event_data":{"categories":[{"name":"Christian Holiday","color":"Dark-Solid","text":"text","category_settings":{"hide":false,"player_usable":false},"event_settings":{"hide":false,"noprint":false,"color":"Red","text":"text"}},{"name":"Secular Holiday","color":"Dark-Solid","text":"text","category_settings":{"hide":false,"player_usable":false},"event_settings":{"hide":false,"noprint":false}},{"name":"Historical Event","color":"Dark-Solid","text":"text","category_settings":{"hide":false,"player_usable":false},"event_settings":{"hide":false,"noprint":false}},{"name":"Miscalaneous event","color":"Dark-Solid","text":"text","category_settings":{"hide":false,"player_usable":false},"event_settings":{"hide":false,"noprint":false,"color":"Blue-Grey"}},{"name":"Natural Event","category_settings":{"hide":false,"player_usable":false},"event_settings":{"color":"Green","text":"text","hide":false,"noprint":false}}],"events":[{"name":"Work on This Calendar Started","description":"Aecius started work on the Gregorian Calendar for Fantasy Calendar on this day.<br>","data":{"has_duration":false,"duration":0,"show_first_last":false,"only_happen_once":false,"conditions":[["Year","0",["2019"]],["&&"],["Month","0",["5"]],["&&"],["Day","0",["23"]]],"connected_events":[]},"category":"3","settings":{"color":"Blue-Grey","text":"text","hide":false,"hide_full":false,"noprint":false}},{"name":"Christmas","description":"Christmas is a Christian holiday celebrating the birth of Christ. Due to a combination of marketability and long lasting traditions it is popular even among many non-Christians, especially in countries that have a strong Christian tradition.<br>","data":{"has_duration":false,"duration":0,"show_first_last":false,"only_happen_once":false,"conditions":[["Month","0",["11"]],["&&"],["Day","0",["25"]]],"connected_events":[]},"category":"1","settings":{"color":"Red","text":"text","hide":false,"hide_full":false,"noprint":false}},{"name":"Winter Solstice","description":"The Winter Solstice is the day of the year with the least time between sunrise and sunset. Many western cultures consider it the official start of winter.<br>","data":{"has_duration":false,"duration":0,"show_first_last":false,"only_happen_once":false,"conditions":[["Season","0",["0"]],["&&"],["Season","8",["1"]]],"connected_events":[]},"category":"4","settings":{"color":"Green","text":"text","hide":false,"hide_full":false,"noprint":false}},{"name":"Summer Solstice","description":"<p>The Summer Solstice is the day of the year with the most time between \nsunrise and sunset. Many western cultures consider it the official start\n of summer.</p>","data":{"has_duration":false,"duration":0,"show_first_last":false,"only_happen_once":false,"conditions":[["Season","0",["1"]],["&&"],["Season","8",["1"]]],"connected_events":[]},"category":"4","settings":{"color":"Green","text":"text","hide":false,"hide_full":false,"noprint":false}},{"name":"Spring Equinox","description":"The Vernal Equinox,\nalso called the spring equinox is the day between the winter and\nsummer solstices where the day is the exact same length as the night.\nMany western cultures consider it the official start of Spring.\n","data":{"has_duration":false,"duration":0,"show_first_last":false,"only_happen_once":false,"conditions":[["Season","0",["0"]],["&&"],["Season","2",["50"]]],"connected_events":[]},"category":"4","settings":{"color":"Green","text":"text","hide":false,"hide_full":false,"noprint":false}},{"name":"Autumnal Equinox","description":"The Autmumnal Equinox,\nalso called the Fall equinox is the day between the summer and\nwinter solstices where the day is the exact same length as the night.\nMany western cultures consider it the official start of Autumn.\n","data":{"has_duration":false,"duration":0,"show_first_last":false,"only_happen_once":false,"conditions":[["Season","0",["1"]],["&&"],["Season","2",["50"]]],"connected_events":[]},"category":"4","settings":{"color":"Green","text":"text","hide":false,"hide_full":false,"noprint":false}},{"name":"Easter (old)","description":"<p>Easter is considered the most important feast for Christians, celebrating the resurrection of Christ. It is classed as a moveable feast occurring on the first full moon after the spring equinox, which is considered to be fixed at March 21st for the sake of computing the date.</p>(This version of the event was created before events could use eachother as conditions and can be considered deprecated. It can still serve as an example of how to make a moveable holiday as specific as Easter without event based events.)<br>","data":{"has_duration":false,"duration":0,"show_first_last":false,"only_happen_once":false,"conditions":[["",[["Moons","2",["0","15"]],["&&"],["!",[["Day","5",["21"]],["&&"],["Month","0",["2"]]]]]],["&&"],["",[["Month","0",["2"]],["||"],["",[["Month","0",["3"]],["&&"],["Day","3",["25"]],["&&"],["!",[["Day","4",["19"]],["&&"],["Moons","3",["0","15"]]]],["&&"],["!",[["Moons","3",["0","19"]],["&&"],["Day","2",["24"]]]]]]]],["&&"],["Weekday","0",["7"]],["&&"],["!",[["Month","0",["2"]],["&&"],["",[["",[["Moons","0",["0","21"]],["||"],["Moons","0",["0","19"]]]],["&&"],["Day","3",["24"]]]],["||"],["",[["Day","3",["26"]],["&&"],["Moons","3",["0","21"]]]],["&&"],["!",[["Moons","0",["0","15"]],["||"],["",[["Day","2",["22"]],["&&"],["Month","0",["2"]],["&&"],["Moons","0",["0","17"]]]]]]]],["&&"],["",[["",[["Moons","5",["0","23"]],["&&"],["Month","0",["3"]]]],["||"],["",[["Month","0",["2"]],["&&"],["Moons","5",["0","22"]]]]]]],"connected_events":[]},"category":"0","settings":{"color":"Red","text":"text","hide":false,"hide_full":true,"noprint":false}},{"name":"Valentine&#39;s Day","description":"Valentine's day is a celebration of love and romance that is popular across the world. Many more cynically minded people mosty consider it an attempt to monetize the expecation of romantic gestures on the holiday through gift cards, flowers, chocolate and dates.<br>","data":{"has_duration":false,"duration":0,"show_first_last":false,"only_happen_once":false,"conditions":[["Month","0",["1"]],["&&"],["Day","0",["14"]]],"connected_events":[]},"category":"2","settings":{"color":"Pink","text":"text","hide":false,"hide_full":false,"noprint":false}},{"name":"New Year&#39;s Day","description":"New Year's day marks the start of a new year on the Gregorian Calendar. It starts when the clock strikes midnight and is often celebrated with fireworks, champagne and kissing.<br>","data":{"has_duration":false,"duration":0,"show_first_last":false,"only_happen_once":false,"conditions":[["Day","7",["1"]]],"connected_events":[]},"category":"1","settings":{"color":"Dark-Solid","text":"text","hide":false,"hide_full":false,"noprint":false}},{"name":"Halloween","description":"<p>Halloween is holiday popular in the US, Canada and Ireland that has gradually been adopted by more and more countries. It is often celebrated by people dressing up, usually as something scary. Children will often go from door to door shouting \"trick or treat\" in the hopes of receiving candy, while adults tend to go to parties.<br></p>","data":{"has_duration":false,"duration":0,"show_first_last":false,"only_happen_once":false,"event_based_event":false,"conditions":[["Month","0",["9"]],["&&"],["Day","0",["31"]]]},"category":"1","settings":{"color":"Dark-Solid","text":"text","hide":false,"noprint":false}},{"name":"Paschal Full Moon","description":"The first full moon after march 21st, which is considered the fixed date for the spring equinox.<br>","data":{"has_duration":false,"duration":0,"show_first_last":false,"only_happen_once":true,"conditions":[["",[["",[["Month","0",["2"]],["&&"],["Day","2",["21"]]]],["||"],["",[["Month","0",["3"]],["&&"],["Day","5",["21"]]]]]],["&&"],["Moons","0",["0","15"]]],"connected_events":[]},"category":"-1","settings":{"color":"Purple","text":"text","hide":false,"hide_full":true,"noprint":false}},{"name":"Easter","description":"<p>Easter is considered the most important feast for Christians, \ncelebrating the resurrection of Christ. It is classed as a moveable \nfeast occurring on the first full moon after the spring equinox, which \nis considered to be fixed at March 21st for the sake of computing the \ndate.</p>","data":{"has_duration":false,"duration":0,"show_first_last":false,"only_happen_once":false,"conditions":[["Events","5",[0,"6"]],["&&"],["Weekday","0",["7"]]],"connected_events":[10]},"category":"0","settings":{"color":"Red","text":"text","hide":false,"hide_full":false,"noprint":false}},{"name":"Easter Monday","description":"The monday following the Easter Sunday is often considered part of the Easter Celebration and is a free day in many countries with a strong Christian tradition.<br>","data":{"has_duration":false,"duration":0,"show_first_last":false,"only_happen_once":false,"conditions":[["Events","0",[0,"1"]]],"connected_events":[11]},"category":"0","settings":{"color":"Red","text":"text","hide":false,"hide_full":false,"noprint":false}},{"name":"Good Friday","description":"Good Friday is the friday preceding Easter. It comemmorates the crucifixion of Christ according to the Bible.<br>","data":{"has_duration":false,"duration":0,"show_first_last":false,"only_happen_once":false,"conditions":[["Events","1",[0,"2"]]],"connected_events":[11]},"category":"0","settings":{"color":"Red","text":"text","hide":false,"hide_full":false,"noprint":false}},{"name":"Ascenscion Day","description":"<p>Traditionally celebrated on the 40th day after Easter, Ascenscion celebrates the day in which the Bible marks as the one Jesus ascended into heaven.<br><br>Some denominations celebrate it on the sunday following the 40th day instead.<br></p><br><br>","data":{"has_duration":false,"duration":0,"show_first_last":false,"only_happen_once":false,"conditions":[["Events","0",[0,"39"]]],"connected_events":[11]},"category":"0","settings":{"color":"Red","text":"text","hide":false,"hide_full":false,"noprint":false}},{"name":"Pentecost","description":"Celebrated exactly 50 days after easter, Pentecost is the celebration of the Holy Spirit appearing before the Apostles as described in the Bible.<br>","data":{"has_duration":false,"duration":0,"show_first_last":false,"only_happen_once":false,"conditions":[["Events","0",[0,"49"]]],"connected_events":[11]},"category":"0","settings":{"color":"Red","text":"text","hide":false,"hide_full":false,"noprint":false}}]}}
	},
	'Forgotten Realms': {
		'dynamic_data': {'year':1,'timespan':0,'day':0,'epoch':0,'custom_location':false,'location':'Equatorial'},
		'static_data': {
			'year_data':{
				'first_day':1,
				'overflow':false,
				'global_week':[
					'I',
					'II',
					'III',
					'IV',
					'V',
					'VI',
					'VII',
					'VIII',
					'IX',
					'X'
				],
				'timespans':[
					{
						'name':'Hammer (Deepwinter)',
						'type':'month',
						'length':30,
						'interval':1,
						'offset':0
					},
					{
						'name':'Midwinter',
						'type':'intercalary',
						'length':1,
						'interval':1,
						'offset':0
					},
					{
						'name':'Alturiak (The Claw of Winter)',
						'type':'month',
						'length':30,
						'interval':1,
						'offset':0
					},
					{
						'name':'Ches (The Claw of the Sunsets)',
						'type':'month',
						'length':30,
						'interval':1,
						'offset':0
					},
					{
						'name':'Tarsakh (The Claw of Storms)',
						'type':'month',
						'length':30,
						'interval':1,
						'offset':0
					},
					{
						'name':'Greengrass',
						'type':'intercalary',
						'length':1,
						'interval':1,
						'offset':0
					},
					{
						'name':'Mirtul (The Melting)',
						'type':'month',
						'length':30,
						'interval':1,
						'offset':0
					},
					{
						'name':'Kythorn (The Time of Flowers)',
						'type':'month',
						'length':30,
						'interval':1,
						'offset':0
					},
					{
						'name':'Flamerule (Summertide)',
						'type':'month',
						'length':30,
						'interval':1,
						'offset':0
					},
					{
						'name':'Midsummer',
						'type':'intercalary',
						'length':1,
						'interval':1,
						'offset':0
					},
					{
						'name':'Shieldmeet',
						'type':'intercalary',
						'length':1,
						'interval':4,
						'offset':0
					},
					{
						'name':'Eleasis (Highsun)',
						'type':'month',
						'length':30,
						'interval':1,
						'offset':0
					},
					{
						'name':'Eleint (The Fading)',
						'type':'month',
						'length':30,
						'interval':1,
						'offset':0
					},
					{
						'name':'Highharvestide',
						'type':'intercalary',
						'length':1,
						'interval':1,
						'offset':0
					},
					{
						'name':'Marpenoth (Leaffall)',
						'type':'month',
						'length':30,
						'interval':1,
						'offset':0
					},
					{
						'name':'Uktar (The Rotting)',
						'type':'month',
						'length':30,
						'interval':1,
						'offset':0
					},
					{
						'name':'The Feast of the Moon',
						'type':'intercalary',
						'length':1,
						'interval':1,
						'offset':0
					},
					{
						'name':'Nightal (The Drawing Down)',
						'type':'month',
						'length':30,
						'interval':1,
						'offset':0
					}
				],
				'leap_days':[

				]
			},
			'moons':[

			],
			'clock':{
				'hours':24,
				'minutes':60,
				'offset':0
			},
			'seasons':{
				'data':[

				],
				'locations':[

				],
				'global_settings':{
					'season_offset':0,
					'weather_offset':0,
					'seed':-192482740,
					'temp_sys':'metric',
					'wind_sys':'metric',
					'cinematic':false,
					'enable_weather':false
				}
			},
			'eras':[

			],
			'settings':{
				'layout':'grid',
				'show_current_month':false,
				'show_era_abbreviation':false,
				'allow_view':false,
				'only_backwards':false,
				'only_reveal_today':false,
				'hide_moons':false,
				'hide_clock':false,
				'hide_events':false,
				'hide_eras':false,
				'hide_all_weather':false,
				'hide_future_weather':false,
				'add_month_number':false,
				'add_year_day_number':false
			},
			'cycles':{
				'format':'',
				'data':[

				]
			},
			'event_data':{
				'categories':[

				],
				'events':[

				]
			}
		}
	},
	"Exandria/Tal'Dorei":{
		'dynamic_data': {"year":835,"month":0,"day":16,"epoch":273596,"custom_location":false,"location":"Cool and Rainy","timespan":1,"hour":0,"minute":0},
		'static_data': {"year_data":{"first_day":1,"overflow":false,"global_week":["Miresen","Grissen","Whelsen","Conthsen","Folsen","Yulisen","Da&#39;leysen"],"timespans":[{"name":"Horisal","type":"month","length":29,"interval":1,"offset":0},{"name":"Misuthar","type":"month","length":30,"interval":1,"offset":0},{"name":"Dualahei","type":"month","length":30,"interval":1,"offset":0},{"name":"Thunsheer","type":"month","length":31,"interval":1,"offset":0},{"name":"Unndilar","type":"month","length":28,"interval":1,"offset":0},{"name":"Brussendar","type":"month","length":31,"interval":1,"offset":0},{"name":"Sydenstar","type":"month","length":32,"interval":1,"offset":0},{"name":"Fessuran","type":"month","length":29,"interval":1,"offset":0},{"name":"Quen&#39;pillar","type":"month","length":27,"interval":1,"offset":0},{"name":"Cuersaar","type":"month","length":29,"interval":1,"offset":0},{"name":"Duscar","type":"month","length":32,"interval":1,"offset":0}],"leap_days":[]},"moons":[{"name":"Moon","cycle":29.8181,"shift":5.9986,"granularity":24,"color":"#ffffff","hidden":false},{"name":"Red Moon","cycle":16,"shift":-3.125,"granularity":16,"color":"#d15858","hidden":false}],"clock":{"enabled":true,"hours":24,"minutes":60,"offset":0},"seasons":{"data":[{"name":"Winter","time":{"sunrise":{"hour":10,"minute":0},"sunset":{"hour":16,"minute":0}},"transition_length":164,"duration":0},{"name":"Summer","time":{"sunrise":{"hour":7,"minute":0},"sunset":{"hour":21,"minute":0}},"transition_length":164,"duration":0}],"locations":[],"global_settings":{"season_offset":-11,"weather_offset":33,"seed":755201528,"temp_sys":"both_i","wind_sys":"both","cinematic":true,"enable_weather":true}},"eras":[{"name":"The Age of Arcanum","abbreviation":"","description":"","settings":{"show_as_event":false,"event_category":null,"ends_year":false,"restart":false},"date":{"year":-1500,"timespan":0,"day":1,"era_year":-1500,"epoch":-492000}},{"name":"The Calamity","abbreviation":"","description":"","settings":{"show_as_event":false,"event_category":null,"ends_year":false,"restart":false},"date":{"year":-665,"timespan":0,"day":1,"era_year":-665,"epoch":-218120}},{"name":"Post-Divergence","abbreviation":"PD","description":"<p>Much time has passed since, and the world has been reborn once again.Â  The gods still exhibit their influence and guidance from beyond the Divine Gate, bestowing their knowledge and power to their most devout worshipers, but the path of mortals is now their own to make.</p>","settings":{"show_as_event":false,"event_category":null,"ends_year":false,"restart":false},"date":{"year":1,"timespan":0,"day":1,"era_year":1,"epoch":0}}],"settings":{"layout":"grid","show_current_month":false,"show_era_abbreviation":true,"allow_view":true,"only_backwards":true,"only_reveal_today":false,"hide_moons":false,"hide_clock":false,"hide_events":false,"hide_eras":false,"hide_all_weather":false,"hide_future_weather":false,"add_month_number":true,"add_year_day_number":false},"cycles":{"format":"","data":[]},"event_data":{"categories":[],"events":[{"name":"New Dawn","description":"<p>The first day of the new year is also the holy day of the Changebringer, as the old year gives way to a new path. Emon celebrates New Dawn with a grand midnight feast, which commonly features a short play celebrating the changes witnessed in the past year.</p>","data":{"length":1,"show_start_end":false,"show_first_last":false,"conditions":[["Month","0",["0"]],["&&"],["Day","0",["1"]]]},"category":null,"settings":{"color":"Dark-Solid","text":"text","hide":false,"noprint":false}},{"name":"Hillsgold","description":"<p><em>No information on this event is available.</em></p>","data":{"has_duration":false,"duration":0,"show_first_last":false,"only_happen_once":false,"conditions":[["Month","0",["0"]],["&&"],["Day","0",["27"]]],"connected_events":[]},"category":null,"settings":{"color":"Dark-Solid","text":"text","hide":false,"hide_full":false,"noprint":false}},{"name":"Day of Challenging","description":"<p>The holy day of the Stormlord is one of the most raucous holidays in Emon. Thousands of spectators attend the annual Godsbrawl, which is held in the fighting ring within the Temple of the Stormlord. The people root for their deity's favored champion, and there is a fierce (yet friendly) rivalry between the Champion of the Stormlord and the Champion of the Platinum Dragon. The winner earns the title of \"Supreme Champion\" for an entire year.</p>","data":{"length":1,"show_start_end":false,"show_first_last":false,"conditions":[["Month","0",["1"]],["&&"],["Day","0",["7"]]]},"category":null,"settings":{"color":"Dark-Solid","text":"text","hide":false,"noprint":false}},{"name":"Renewal Festival","description":"<p>Though the Archeart is the god of spring, the peak of the spring season is the holy day of the Wildmother. The people in the southern wilds of Tal'Dorei celebrate the Wildmother's strength by journeying to a place of great natural beauty. This could be the top of a mountainous waterfall, the center of a desert, or even an old and peaceful city park (such as Azalea Street Park in Emon). Though Emon rarely celebrates Wild's Grandeur, the few who do will plant trees in observance of the holiday.</p>","data":{"length":1,"show_start_end":false,"show_first_last":false,"conditions":[["Month","0",["2"]],["&&"],["Day","0",["13"]]]},"category":null,"settings":{"color":"Dark-Solid","text":"text","hide":false,"noprint":false}},{"name":"Wild&#39;s Grandeur","description":"<p><em>No information on this event is available.</em></p>","data":{"has_duration":false,"duration":0,"show_first_last":false,"only_happen_once":false,"conditions":[["Month","0",["2"]],["&&"],["Day","0",["20"]]],"connected_events":[]},"category":null,"settings":{"color":"Dark-Solid","text":"text","hide":false,"hide_full":false,"noprint":false}},{"name":"Harvest&#39;s Rise","description":"<p><em>No information on this event is available.</em></p>","data":{"has_duration":false,"duration":0,"show_first_last":false,"only_happen_once":false,"conditions":[["Month","0",["3"]],["&&"],["Day","0",["11"]]],"connected_events":[]},"category":null,"settings":{"color":"Dark-Solid","text":"text","hide":false,"hide_full":false,"noprint":false}},{"name":"Merryfrond&#39;s Day","description":"<p><em>No information on this event is available.</em></p>","data":{"has_duration":false,"duration":0,"show_first_last":false,"only_happen_once":false,"conditions":[["Month","0",["3"]],["&&"],["Day","0",["31"]]],"connected_events":[]},"category":null,"settings":{"color":"Dark-Solid","text":"text","hide":false,"hide_full":false,"noprint":false}},{"name":"Deep Solace","description":"<p>The holy day of The Allhammer is celebrated by especially devout followers in isolation. They meditate on the meaning of family and how they may be better mothers, fathers, siblings, and children. Dwarven communities, such as Kraghammer, celebrate with a full day of feasting and drinking.</p>","data":{"has_duration":false,"duration":0,"show_first_last":false,"only_happen_once":false,"conditions":[["Month","0",["4"]],["&&"],["Day","0",["8"]]],"connected_events":[]},"category":null,"settings":{"color":"Dark-Solid","text":"text","hide":false,"hide_full":false,"noprint":false}},{"name":"Zenith","description":"<p><em>No information on this event is available.</em></p>","data":{"has_duration":false,"duration":0,"show_first_last":false,"only_happen_once":false,"conditions":[["Month","0",["4"]],["&&"],["Day","0",["26"]]],"connected_events":[]},"category":null,"settings":{"color":"Dark-Solid","text":"text","hide":false,"hide_full":false,"noprint":false}},{"name":"Artisan&#39;s Faire","description":"<p><em>No information on this event is available.</em></p>","data":{"has_duration":false,"duration":0,"show_first_last":false,"only_happen_once":false,"conditions":[["Month","0",["5"]],["&&"],["Day","0",["15"]]],"connected_events":[]},"category":null,"settings":{"color":"Dark-Solid","text":"text","hide":false,"hide_full":false,"noprint":false}},{"name":"Elvendawn","description":"<p>The holy day of the Archeart celebrates the first emergence of the Elves into Exandria from the Feywild. In Syngorn, the Elves open small doorways into the Feywild and celebrate alongside the wild fey with uncharacteristic vigor.</p>","data":{"has_duration":false,"duration":0,"show_first_last":false,"only_happen_once":false,"conditions":[["Month","0",["5"]],["&&"],["Day","0",["20"]]],"connected_events":[]},"category":"-1","settings":{"color":"Dark-Solid","text":"text","hide":false,"hide_full":false,"noprint":false}},{"name":"Highsummer","description":"<p>The holy day of the Dawnfather is the peak of the summer season. Emon celebrates with an entire week of gift-giving and feasting, ending at midnight on the 21st of Sydenstar (the anniversary of the Battle of the Umbra Hills, where Zan Tal'Dorei dethroned Trist Drassig). Whitestone (where the Dawnfather is the city's patron god) celebrates with gift-giving and a festival of lights around the Sun Tree. Due to the Briarwood occupation, money is thin, so most Whitestone folk choose to recount the small things they are thankful for, rather than buy gifts.</p>","data":{"has_duration":false,"duration":0,"show_first_last":false,"only_happen_once":false,"conditions":[["Month","0",["6"]],["&&"],["Day","0",["7"]]],"connected_events":[]},"category":"-1","settings":{"color":"Dark-Solid","text":"text","hide":false,"hide_full":false,"noprint":false}},{"name":"Morn of Largesse","description":"<p><em>No information on this event is available.</em></p>","data":{"has_duration":false,"duration":0,"show_first_last":false,"only_happen_once":false,"conditions":[["Month","0",["6"]],["&&"],["Day","0",["14"]]],"connected_events":[]},"category":"-1","settings":{"color":"Dark-Solid","text":"text","hide":false,"hide_full":false,"noprint":false}},{"name":"Harvest&#39;s Close","description":"<p><em>No information on this event is available.</em></p>","data":{"has_duration":false,"duration":0,"show_first_last":false,"only_happen_once":false,"conditions":[["Month","0",["7"]],["&&"],["Day","0",["3"]]],"connected_events":[]},"category":"-1","settings":{"color":"Dark-Solid","text":"text","hide":false,"hide_full":false,"noprint":false}},{"name":"The Hazel Festival","description":"<p><em>No information on this event is available.</em></p>","data":{"has_duration":false,"duration":0,"show_first_last":false,"only_happen_once":false,"conditions":[["Month","0",["8"]],["&&"],["Day","0",["10"]]],"connected_events":[]},"category":"-1","settings":{"color":"Dark-Solid","text":"text","hide":false,"hide_full":false,"noprint":false}},{"name":"Civilization&#39;s Dawn","description":"<p>The holy day of the Lawbearer is the peak of the autumn season. Emon celebrates with a great bonfire in the square of each neighborhood, around which each community dances and gives gifts.</p>","data":{"has_duration":false,"duration":0,"show_first_last":false,"only_happen_once":false,"conditions":[["Month","0",["8"]],["&&"],["Day","0",["22"]]],"connected_events":[]},"category":"-1","settings":{"color":"Dark-Solid","text":"text","hide":false,"hide_full":false,"noprint":false}},{"name":"Night of Ascension","description":"<p>Though the actual date of her rise to divinity is unclear, the holy day of the Matron of Ravens is nonetheless celebrated as the day of her apotheosis. Though most in Emon see this celebration of the dead as unnerving and macabre, the followers of the Matron of Ravens believe that the honored dead would prefer to be venerated with cheer, not misery.</p>","data":{"length":1,"show_start_end":false,"show_first_last":false,"conditions":[["Month","0",["9"]],["&&"],["Day","0",["13"]]]},"category":"-1","settings":{"color":"Dark-Solid","text":"text","hide":false,"noprint":false}},{"name":"Zan&#39;s Cup","description":"<p><em>No information on this event is available.</em></p>","data":{"has_duration":false,"duration":0,"show_first_last":false,"only_happen_once":false,"conditions":[["Month","0",["9"]],["&&"],["Day","0",["21"]]],"connected_events":[]},"category":"-1","settings":{"color":"Dark-Solid","text":"text","hide":false,"hide_full":false,"noprint":false}},{"name":"Barren Eve","description":"<p><em>No information on this event is available.</em></p>","data":{"has_duration":false,"duration":0,"show_first_last":false,"only_happen_once":false,"conditions":[["Month","0",["10"]],["&&"],["Day","0",["2"]]],"connected_events":[]},"category":"-1","settings":{"color":"Dark-Solid","text":"text","hide":false,"hide_full":false,"noprint":false}},{"name":"Embertide","description":"<p>The holy day of the Platinum Dragon is a day of remembrance. Solemnity and respect are shown to those who have fallen in the defense of others.</p>","data":{"has_duration":false,"duration":0,"show_first_last":false,"only_happen_once":false,"conditions":[["Month","0",["10"]],["&&"],["Day","0",["5"]]],"connected_events":[]},"category":"-1","settings":{"color":"Dark-Solid","text":"text","hide":false,"hide_full":false,"noprint":false}},{"name":"Winter&#39;s Crest","description":"<p>This day celebrates the freedom of Tal'Dorei from Errevon the Rimelord. It is the peak of the winter season, so devout followers of the Matron of Ravens (as the goddess of winter) consider it to be one of her holy days. However, in most of the land, people see Winter's Crest as a secular holiday, often celebrated with omnipresent music in public areas, lavish gift-giving to relatives and loved ones, and the cutting and decorating of trees placed indoors. The Sun Tree in Whitestone is often decorated with lights and other baubles for Winter's Crest. Winter's Crest is also when the barrier between planes is at its thinnest, as seen when Raishan was able to tear open the rift to the Elemental Plane of Fire and allow Thordak back into Exandria.</p>","data":{"has_duration":false,"duration":0,"show_first_last":false,"only_happen_once":false,"conditions":[["Month","0",["10"]],["&&"],["Day","0",["20"]]],"connected_events":[]},"category":"-1","settings":{"color":"Dark-Solid","text":"text","hide":false,"hide_full":false,"noprint":false}}]}}
	}
}


function parse_json(json){

	try{

		var calendar = JSON.parse(json);

		var dynamic_data = {
			'year': 1,
			'month': 0,
			'day': 1,
			'epoch': 0,
			'custom_location': false,
			'location': 'Equatorial'
		};

		var static_data = {
			'year_data':{
				'first_day':1,
				'overflow':false,
				'global_week':[],
				'timespans':[],
				'leap_days':[]
			},
			'moons':[],
			'clock':{
				'enabled':false,
				'hours':24,
				'minutes':60,
				'offset':0
			},
			'seasons':{
				'data':[],
				'locations':[],
				'global_settings':{
					'season_offset':0,
					'weather_offset':0,
					'seed':(Math.random().toString().substr(7)|0),
					'temp_sys':'metric',
					'wind_sys':'metric',
					'cinematic':false,
					'enable_weather':false
				}
			},
			'eras':[],
			'settings':{
				'layout':'grid',
				'show_current_month':false,
				'show_era_abbreviation':false,
				'allow_view':false,
				'only_backwards':false,
				'only_reveal_today':false,
				'hide_moons':false,
				'hide_clock':false,
				'hide_events':false,
				'hide_eras':false,
				'hide_all_weather':false,
				'hide_future_weather':false,
				'add_month_number':false,
				'add_year_day_number':false
			},
			'cycles':{
				'format':'',
				'data':[]
			},
			'event_data':{
				'categories':[],
				'events':[]
			}
		};

		if(calendar.dynamic_data !== undefined){
			var source = '2.0';
		}else if(calendar.month_len[0] !== undefined){
			var source = '1.0';
		}else if(calendar.year_len){
			var source = 'donjon';
		}

		switch(source){
			case '2.0':
				return {
					dynamic_data: calendar.dynamic_data,
					static_data: calendar.static_data
				}
			case '1.0':
				return process_old_fantasycalendar(calendar, dynamic_data, static_data);
			case 'donjon':
				return process_donjon(calendar, dynamic_data, static_data);

			default:
				return false;
		}
	} catch (e) {

		console.log(e)
		return false;

	}
}

function process_old_fantasycalendar(calendar, dynamic_data, static_data){

	dynamic_data.year = calendar.year;
	dynamic_data.month = calendar.month-1;
	dynamic_data.day = calendar.day;

	static_data.year_data.first_day = calendar.first_day+1;

	static_data.year_data.global_week = calendar.weekdays;

	static_data.year_data.overflow = calendar.overflow;

	for(var i = 0; i < calendar.months.length; i++){
		static_data.year_data.timespans.push({
			'name': escapeHtml(calendar.months[i]),
			'type': 'month',
			'interval': 1,
			'offset': 0,
			'length': calendar.month_len[i]
		});
	}

	for(var i = 0; i < calendar.moons.length; i++){
		static_data.moons.push({
			'name': escapeHtml( calendar.moons[i]),
			'cycle': calendar.lunar_cyc[i],
			'shift': calendar.lunar_shf[i],
			'granularity': get_moon_granularity(calendar.lunar_cyc[i]),
			'color': calendar.lunar_color[i],
			'hidden': false
		});
	}

	for(var i = 0; i < calendar.events.length; i++){
		var event = calendar.events[i];
		static_data.event_data.events.push({
			'name': escapeHtml(event.name),
			'description': escapeHtml(event.description),
			'data':{
				'length':1,
				'show_start_end':false,
				'show_first_last':false,
				'conditions': convert_old_event(event)
			},
			'category':-1,
			'settings':{
				'color':'Dark-Solid',
				'text':'text',
				'hide': event.hide === undefined ? false : event.hide,
				'noprint': event.noprint === undefined ? false : event.noprint
			}
		});
	}

	if(calendar.year_leap !== undefined && calendar.year_leap > 1){
		static_data.year_data.leap_days.push({
			'name': 'Leap day',
			'intercalary': false,
			'timespan': calendar.month_leap-1,
			'removes_day': false,
			'removes_week_day': false,
			'adds_week_day': false,
			'day': 0,
			'week_day': '',
			'interval': calendar.year_leap.toString(),
			'offset': 0
		});
	}

	if(calendar.clock_enabled){
		static_data.clock.enabled = true;
		static_data.clock.hours = calendar.n_hours;
		static_data.clock.minutes = 60;

		dynamic_data.hour = calendar.hour;
		dynamic_data.minute = calendar.minute;
	}

	if(calendar.solstice_enabled){

		static_data.seasons.global_settings = {
			season_offset: 0,
			weather_offset: 0,
			seed: calendar.weather.weather_seed,
			temp_sys: calendar.weather.weather_temp_sys,
			wind_sys: calendar.weather.weather_wind_sys,
			cinematic: calendar.weather.weather_cinematic
		}

		if(calendar.winter_month > calendar.summer_month){

			var avg_length = fract_year_length(static_data)

			var summer_epoch = evaluate_calendar_start(static_data, 0, calendar.summer_month-1, calendar.summer_day).epoch;

			var winter_epoch = evaluate_calendar_start(static_data, 0, calendar.winter_month-1, calendar.winter_day).epoch;
			
			if(winter_epoch > summer_epoch){
				var first_season = {
					'name': 'Summer',
					'epoch': summer_epoch,
					'rise': calendar.summer_rise,
					'set': calendar.summer_set
				}
				var second_season = {
					'name': 'Winter',
					'epoch': winter_epoch,
					'rise': calendar.winter_rise,
					'set': calendar.winter_set
				}
			}else{
				var first_season = {
					'name': 'Winter',
					'epoch': winter_epoch,
					'rise': calendar.winter_rise,
					'set': calendar.winter_set
				}
				var second_season = {
					'name': 'Summer',
					'epoch': summer_epoch,
					'rise': calendar.summer_rise,
					'set': calendar.summer_set
				}
			}

			first_season.length = second_season.epoch - first_season.epoch

			second_season.length = avg_length + second_season.epoch - first_season.epoch

			offset = first_season.epoch;

			static_data.seasons.data = [
				{
					'Name': first_season.name,
					'transition_length': first_season.length,
					'duration': 0,
					'time': {
						'sunrise': {
							'hour': first_season.rise,
							'minute': 0
						},
						'sunset': {
							'hour': first_season.set,
							'minute': 0
						}
					}
				},
				{
					'Name': second_season.name,
					'transition_length': second_season.length,
					'duration': 0,
					'time': {
						'sunrise': {
							'hour': second_season.rise,
							'minute': 0
						},
						'sunset': {
							'hour': second_season.set,
							'minute': 0
						}
					}
				}
			];
		}

	}

	if(calendar.weather_enabled){

		var keys = Object.keys(calendar.weather.custom_climates);

		for(var i = 0; i < keys.length; i++){

			var location = calendar.weather.custom_climates[keys[i]];
				
			static_data.seasons.locations.push({
				'name': keys[i],
				'seasons': [
					{
						'name': '',
						'custom_name': false,
						'time': {
							'sunrise': {
								'hour': first_season.rise,
								'minute': 0
							},
							'sunset': {
								'hour': first_season.set,
								'minute': 0
							}
						},
						'weather':{
							'temp_low': location[first_season.name.toLowerCase()].temperature.cold,
							'temp_high': location[first_season.name.toLowerCase()].temperature.hot,
							'precipitation': location[first_season.name.toLowerCase()].precipitation,
							'precipitation_intensity': location[first_season.name.toLowerCase()].precipitation*0.5
						}
					},
					{
						'name': '',
						'custom_name': false,
						'time': {
							'sunrise': {
								'hour': second_season.rise,
								'minute': 0
							},
							'sunset': {
								'hour': second_season.set,
								'minute': 0
							}
						},
						'weather':{
							'temp_low': location[second_season.name.toLowerCase()].temperature.cold,
							'temp_high': location[second_season.name.toLowerCase()].temperature.hot,
							'precipitation': location[second_season.name.toLowerCase()].precipitation,
							'precipitation_intensity': location[second_season.name.toLowerCase()].precipitation*0.5
						}
					}
				],
				'settings': {
					'timezone': {
						'hour': 0,
						'minute': 0
					},
					'large_noise_frequency': calendar.weather.weather_temp_scale*0.1,
					'large_noise_amplitude': calendar.weather.weather_temp_scale*5,

					'medium_noise_frequency': calendar.weather.weather_temp_scale*3,
					'medium_noise_amplitude': calendar.weather.weather_temp_scale*2,

					'small_noise_frequency': calendar.weather.weather_temp_scale*8,
					'small_noise_amplitude': calendar.weather.weather_temp_scale*3
				}
			});
		}

		dynamic_data.custom_location = calendar.weather.current_climate_type === 'custom';

		if(dynamic_data.custom_location){
			dynamic_data.location = keys.indexOf(calendar.weather.current_climate);
		}else{
			dynamic_data.location = calendar.weather.current_climate;
		}

	}

	static_data.settings = {
		layout: 'grid',
		show_current_month: calendar.settings.show_current_month,
		show_era_abbreviation: false,
		allow_view: calendar.settings.allow_view,
		only_backwards: calendar.settings.only_backwards,
		only_reveal_today: calendar.settings.only_reveal_today,
		hide_moons: calendar.settings.hide_moons,
		hide_clock: calendar.settings.hide_clock,
		hide_events: calendar.settings.hide_events,
		hide_eras: false,
		hide_all_weather: calendar.settings.hide_weather,
		hide_future_weather: false,
		add_month_number: calendar.settings.add_month_number,
		add_year_day_number: calendar.settings.add_year_day_number,
		year_zero_exists: true
	}

	return {
		dynamic_data: dynamic_data,
		static_data: static_data
	}

}

function process_donjon(calendar, dynamic_data, static_data){

	dynamic_data.year = calendar.year;

	static_data.year_data.first_day = calendar.first_day;

	static_data.year_data.global_week = calendar.weekdays;

	for(var i = 0; i < calendar.months.length; i++){
		var name = calendar.months[i];
		static_data.year_data.timespans.push({
			'name': escapeHtml(name),
			'type': 'month',
			'interval': 1,
			'offset': 0,
			'length': calendar.month_len[name]
		});
	}

	for(var i = 0; i < calendar.moons.length; i++){
		var name = calendar.moons[i];
		static_data.moons.push({
			'name': escapeHtml(name),
			'cycle': calendar.lunar_cyc[name],
			'shift': calendar.lunar_shf[name],
			'granularity': get_moon_granularity(calendar.lunar_cyc[name]),
			'color': '#ffffff',
			'hidden': false
		});
	}

	return {
		dynamic_data: dynamic_data,
		static_data: static_data
	}

}


function convert_old_event(event){

	switch(event.repeats){
		case 'once':
			return [
				['Year', '0', [event.data.year]],
				['&&'],
				['Month', '0', [event.data.month-1]],
				['&&'],
				['Day', '0', [event.data.day]]
			];
		case 'daily':
			return [
				['Epoch', '6', ["1", "0"]]
			];
		case 'weekly':
			return [
				['Weekday', '0', [event.data.week_day+1]]
			];

		case 'fortnightly':
			return [
				['Weekday', '0', [event.data.week_day+1]],
				['&&'],
				['Week', '13', [event.data.week_even ? '2' : '1', '0']]
			];

		case 'monthly_date':
			return [
				['Day', '0', [event.data.day]],
			];

		case 'annually_date':
			return [
				['Month', '0', [event.data.month-1]],
				['&&'],
				['Day', '0', [event.data.day]]
			];

		case 'monthly_weekday':
			return [
				['Weekday', '0', [event.data.week_day+1]],
				['&&'],
				['Week', '0', [event.data.week_day_number]]
			];

		case 'annually_month_weekday':
			return [
				['Month', '0', [event.data.month-1]],
				['&&'],
				['Weekday', '0', [event.data.week_day+1]],
				['&&'],
				['Week', '0', [event.data.week_day_number]]
			];

		case 'every_x_day':
			return [
				['Epoch', '6', [event.data.every, event.data.modulus+1]]
			];

		case 'every_x_weekday':
			return [
				['Weekday', '0', [event.data.week_day]],
				['&&'],
				['Week', '20', [event.data.every, event.data.modulus+1]]
			];

		case 'every_x_monthly_date':
			return [
				['Day', '0', [event.data.day]],
				['&&'],
				['Month', '13', [event.data.every, event.data.modulus+1]]
			];

		case 'every_x_monthly_weekday':
			return [
				['Weekday', '0', [event.data.week_day+1]],
				['&&'],
				['Week', '0', [event.data.week_day_number]],
				['&&'],
				['Month', '13', [event.data.every, event.data.modulus+1]]
			];

		case 'every_x_annually_date':
			return [
				['Day', '0', [event.data.day]],
				['&&'],
				['Month', '0', [event.data.month-1]],
				['&&'],
				['Year', '6', [event.data.every, event.data.modulus+1]]
			];

		case 'every_x_annually_weekday':
			return [
				['Weekday', '0', [event.data.week_day+1]],
				['&&'],
				['Week', '0', [event.data.week_day_number]],
				['&&'],
				['Month', '0', [event.data.month-1]],
				['&&'],
				['Year', '6', [event.data.every, event.data.modulus+1]]
			];


		case 'moon_every':
			return [
				['Moons', '0', [event.data.moon_id, convert_to_granularity(event.data.moon_phase)]]
			];

		case 'moon_monthly':
			return [
				['Moons', '0', [event.data.moon_id, convert_to_granularity(event.data.moon_phase)]],
				['&&'],
				['Moons', '7', [event.data.moon_id, convert_to_granularity(event.data.moon_phase_number)]]
			];

		case 'moon_anually':
			return [
				['Moons', '0', [event.data.moon_id, convert_to_granularity(event.data.moon_phase)]],
				['&&'],
				['Moons', '7', [event.data.moon_id, event.data.moon_phase_number]],
				['&&'],
				['Month', '0', [event.data.month-1]]
			];

		case 'multimoon_every':
			var result = [];
			for(var i = 0; i < event.data.moons.length; i++){
				result.push(['Moons', '0', [i, convert_to_granularity(event.data.moons[i].moon_phase)]])
				if(i != event.data.moons.length-1){
					result.push(['&&']);
				}
			}
			return result;

		case 'multimoon_anually':
			var result = [];
			result.push(['Month', '0', [event.data.month-1]]);
			result.push(['&&']);
			for(var i = 0; i < event.data.moons.length; i++){
				result.push(['Moons', '0', [i, convert_to_granularity(event.data.moons[i].moon_phase)]])
				if(i != event.data.moons.length-1){
					result.push(['&&']);
				}
			}
			return result;
	}
}


function jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function convert_to_granularity(cycle){

	if(cycle >= 32){
		return cycle*2;
	}else if(cycle >= 24){
		return Math.floor(cycle*1.5);
	}else if(cycle >= 16){
		return cycle;
	}else if(cycle >= 8){
		return Math.floor(cycle/2);
	}else{
		return Math.floor(cycle/3);
	}

}