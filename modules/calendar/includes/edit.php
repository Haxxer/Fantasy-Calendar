<?php

header('Cache-Control: no-cache');

$calendar_name = $calendar_data['calendar_name'];
$owner = $calendar_data['owner'];

$title = $calendar_name;

include('header.php');

?>

<script src="calendar_json_02.json?ver=<?php echo $jsversion; ?>"></script>

<script>

function reload_calendar(data){
	calendar 	  = data.structure;
	calendar.name = data.name;
	calendar.date = data.date;
}

function update_date(base){
	console.log(base)
	if(calendar.date.year != base.year){
		calendar.date = base;
		rebuild_calendar('calendar');
	}else if(calendar.date.timespan != base.timespan){
		if(calendar.settings.show_current_month){
			rebuild_calendar('calendar');
		}else{
			calendar.date = base;
			update_epoch(true);
		}
	}else if(calendar.date.day != base.day){
		calendar.date.epoch += (base.day-calendar.date.day);
		calendar.date = base;
		update_epoch(false);
	}else{
		calendar.date = base;
	}
}

hash = getUrlParameter('id');

/*data = {};
data.name = "<?php echo $calendar_data['calendar_name'] ?>";
data.date = JSON.parse(<?php echo json_encode($calendar_data['date']); ?>);
data.structure = JSON.parse(<?php echo json_encode($calendar_data['structure']); ?>);*/
last_date_changed = new Date("<?php echo $calendar_data['last_date_changed']; ?>");
last_structure_changed = new Date("<?php echo $calendar_data['last_structure_changed']; ?>");

$(document).ready(function(){
	//reload_calendar(data);
	set_up_edit_inputs();
	bind_calendar_events();
	rebuild_calendar('calendar');
	//edit_event_ui.bind_events();
	//edit_event_ui.set_current_event(0);

});

function reload_calendar(data){
	calendar 	  = data.structure;
	calendar.name = data.name;
	calendar.date = data.date;
}

</script>

<div id="generator_container">

	<?php

	include('modules/calendar/includes/layouts/weather_tooltip_layout.html');
	include('modules/calendar/includes/layouts/event_layout.html');
	include('modules/calendar/includes/inputs/full_inputs.php');

	?>

</div>



<?php

include('footer.php');

?>