/* ------------------------------------------------------- */
/* ------------------ Calendar UI class ------------------ */
/* ------------------------------------------------------- */

var edit_event_ui = {

	data: {},

	bind_events: function(){

		this.event_id							= null;
		this.event_condition_sortables			= [];
		this.current_sortable					= null;
		this.delete_droppable					= false;

		this.event_background 					= $('#event_edit_background');
		this.event_conditions_container			= $('#event_conditions_container');
		this.save_btn							= this.event_background.find('#btn_event_save');
		this.close_ui_btn						= this.event_background.find('.close_ui_btn');
		this.trumbowyg							= this.event_background.find('.event_desc');

		this.trumbowyg.trumbowyg();

		$(document).on('click', '.open-edit-event-ui', function(){

			var index = $(this).closest('.sortable-container').attr('key');

			edit_event_ui.set_current_event(index);

		});

		this.save_btn.click(function(){
			edit_event_ui.save_current_event();
		})

		edit_event_ui.close_ui_btn.click(function(){
			edit_event_ui.clear_ui();
		});

		$(document).on('change', '.event-text-input', function(){

			if($(this).closest('#event-form').length){
				var parent = $(this).closest('#event-form');
			}else{
				var parent = $(this).closest('.sortable-container');
			}

			var classes = parent.find('.event-text-output').attr('class').split(' ');
			classes.length = 3;

			classes.push($(this).val());
			classes.push(parent.find('.event-text-input').not(this).val());

			classes = classes.join(' ');

			parent.find('.event-text-output').prop('class', classes);

		});

		edit_event_ui.event_conditions_container.nestedSortable({
			handle: ".handle",
			containerSelector: ".group_list_root, .group_list",
			onDragStart: function (item, container, _super, event) {
				item.css({
					height: item.outerHeight(),
					width: item.outerWidth()
				})
				item.addClass(container.group.options.draggedClass)
				$("body").addClass(container.group.options.bodyClass)
				var height = item.css("height");
				container.rootGroup.placeholder.css('height', height);
				$('#remove_dropped').removeClass('hidden');

			},
			onDrop: function (item, container, _super, event) {
				item.removeClass(container.group.options.draggedClass).removeAttr("style");
				$("body").removeClass(container.group.options.bodyClass);
				$('#remove_dropped').addClass('hidden');
				if(edit_event_ui.delete_droppable){
					item.remove();
				}
				edit_event_ui.evaluate_condition_selects(edit_event_ui.event_conditions_container);
			},
			tolerance: -5
		});

		$('#remove_dropped').mouseover(function(){
			edit_event_ui.delete_droppable = true;
		}).mouseout(function(){
			edit_event_ui.delete_droppable = false;
		})

		$("#event_categories").change(function(){
			if($(this).val() != -1){
				var category = static_data.event_data.categories[$(this).val()].event_settings;
				$('#color_style').val(category.color);
				$('#text_style').val(category.text).change();
				$('#event_hide_players').prop('checked', category.hide);
				$('#event_dontprint_checkbox').prop('checked', category.noprint);
			}
		});

		edit_event_ui.evaluate_condition_selects(edit_event_ui.event_conditions_container);

		$('#add_event_condition_group').click(function(){
			edit_event_ui.add_group(edit_event_ui.event_conditions_container, "normal");
			edit_event_ui.evaluate_condition_selects(edit_event_ui.event_conditions_container);
		});

		$('#add_event_condition').click(function(){
			edit_event_ui.add_condition(edit_event_ui.event_conditions_container, "Year");
			edit_event_ui.evaluate_inputs(edit_event_ui.event_conditions_container.children().last())
			edit_event_ui.evaluate_condition_selects(edit_event_ui.event_conditions_container);
		});


		$(document).on('change', '.moon_select', function(){
			edit_event_ui.evaluate_inputs($(this).closest('.condition'))
		});


		$(document).on('change', '.condition_type', function(){

			var selected_option = $(this).find(":selected");
			var type = selected_option.parent().attr('label');

			var lastClass = $(this).closest('.condition_container').attr('class').split(' ').pop();
			$(this).closest('.condition_container').removeClass(lastClass).addClass(type);

			edit_event_ui.evaluate_inputs($(this).closest('.condition'));

		});

		$(document).on('change', '.group_type input[type="radio"]', function(){
			var container = $(this).parent().parent().parent();
			var type = $(this).parent().parent().attr('class');
			container.attr('type', type);
			if(type == "num"){
				container.find('.num_group_con').prop('disabled', false).attr('min', 1).attr('max', Math.max(1, container.find('.group_list').children().length)).val("1");
			}else{
				container.find('.num_group_con').prop('disabled', true).val('');
			}
			edit_event_ui.evaluate_condition_selects(edit_event_ui.event_conditions_container);
		})

	},

	set_current_event: function(event_id){

		this.event_id = event_id;

		this.event_background.find('.event_name').val(unescapeHtml(static_data.event_data.events[this.event_id].name));

		this.trumbowyg.trumbowyg('html', static_data.event_data.events[this.event_id].description);

		edit_event_ui.create_conditions(static_data.event_data.events[this.event_id].data.conditions, edit_event_ui.event_conditions_container);

		edit_event_ui.evaluate_condition_selects(edit_event_ui.event_conditions_container);
		
		if(static_data.event_data.events[this.event_id].category !== undefined){
			$('#event_categories').val(static_data.event_data.events[this.event_id].category);
		}else{
			$('#event_categories').val(-1);
		}

		$('#color_style').val(static_data.event_data.events[this.event_id].settings.color);
		$('#text_style').val(static_data.event_data.events[this.event_id].settings.text).change();

		$('#event_hide_players').prop('checked', static_data.event_data.events[this.event_id].settings.hide);

		$('#event_dontprint_checkbox').prop('checked', static_data.event_data.events[this.event_id].settings.noprint);

		edit_event_ui.event_background.removeClass('hidden');

	},

	save_current_event: function(){

		static_data.event_data.events[this.event_id] = {};

		static_data.event_data.events[this.event_id].name = escapeHtml(this.event_background.find('.event_name').val());

		static_data.event_data.events[this.event_id].description = this.trumbowyg.trumbowyg('html');

		static_data.event_data.events[this.event_id].data = {
			length: 1,
			show_start_end: false,
			show_first_last: false,
			conditions: this.create_condition_array(edit_event_ui.event_conditions_container)
		};

		static_data.event_data.events[this.event_id].category = $('#event_categories').val();

		static_data.event_data.events[this.event_id].settings = {
			color: $('#color_style').val(),
			text: $('#text_style').val(),
			hide: $('#event_hide_players').prop('checked'),
			noprint: $('#event_dontprint_checkbox').prop('checked')
		}

		edit_event_ui.clear_ui();

		error_check();

		rebuild_events();

	},

	clear_ui: function(){

		this.event_id = null;

		this.event_background.find('.event_name').val('');

		this.trumbowyg.trumbowyg('html', '');

		edit_event_ui.event_conditions_container.empty();
		
		$('#event_categories').val('');

		$('#color_style').val('');
		$('#text_style').val('');

		$('#event_hide_players').prop('checked', false);

		$('#event_dontprint_checkbox').prop('checked',false);

		edit_event_ui.event_background.addClass('hidden');

	},

	// This function creates an array for the conditions so that it may be stored
	create_condition_array: function(element){

		var array = [];

		element.children().each(function(){

			if($(this).hasClass('condition')){

				var selected_option = $(this).find('.condition_type').find(":selected");
				var type = selected_option.parent().attr('label');
				var values = [];

				if(type === "Moons"){

					values.push($(this).find('.moon_select').val());

					$(this).find('.input_container').children().each(function(i){

						if($(this).val() == ""){
							var val = 0;
						}else{
							var val = $(this).val();
						}

						values.push(val);

					});

				}else if(type === "Cycle"){
					values.push($(this).find('.input_container').find("option:selected").parent().attr("value"));
					values.push($(this).find('.input_container').find("option:selected").val());
				}else if(type === "Year" && selected_option.val() != 6){
					var val = $(this).find('.input_container').children().first().val()|0;
					values.push(val > 0 ? val-1 : val);
				}else{
					$(this).find('.input_container').children().each(function(){
						if($(this).val() == ""){
							var val = 0;
						}else{
							var val = $(this).val();
						}
						values.push(val);
					});
				}

				array.push([type, selected_option.val(), values])

			}else if($(this).hasClass('group')){

				var type = $(this).find('.group_type');

				if(type.attr("type") === "normal"){
					type = "";
				}else if(type.attr("type") === "not"){
					type = "!";
				}else{
					type = type.find('.num_group_con').val();
				}

				array.push([type, edit_event_ui.create_condition_array($(this).children('.group_list'))])

			}

			var condition_operator = $(this).children('.condition_operator');

			if(!condition_operator.prop('disabled')){
				array.push([condition_operator.val()])
			}

		});

		return array;
	},

	// This function finds and replaces all NAND operators and places !( and ) around them
	replace_NAND: function(array){
		for(var i = array.length-1; i > -1 ; i--){
			element = array[i];
			if(element[1] && Array.isArray(element[1]) && element[1].length > 0){
				array[i][1] = replace_NAND(element[1]);
			}else if(element[0] === "NAND"){

				array.splice(i-1, 0, ["!("])
				i++;
				array[i] = ['&&'];
				i++;

				if(array[i] === "!("){
					var j = i;
					loop:
					while(array[j] != ")"){
						j++;
						if(j > 100){
							break loop;
						}
					}
					array.splice(j, 0, ")")
				}else if(array[i] === "!"){
					array.splice(i+2, 0, [")"])
				}else{
					array.splice(i+1, 0, [")"])
				}

			}
		}
		return array;
	},

	// This function takes an array of conditions, and the parent which to attach the conditions UI
	create_conditions: function(array, parent, group_type){

		var increment = group_type === "num" ? 1 : 2;

		for(var i = 0; i < array.length; i+=increment){

			element = array[i];

			if(Array.isArray(element[1])){

				var group_type = "normal";
				if(element[0] === "!"){
					group_type = "not";
				}else if(element[0] >= 1){
					group_type = "num";
				}

				var parent_new = edit_event_ui.add_group(parent, group_type);

				if(element[0] >= 1){
					parent_new.parent().find('.num_group_con').prop('disabled', false).val(element[0]);
				}

				edit_event_ui.create_conditions(element[1], parent_new, group_type);

				if(array[i+1] && group_type !== "num"){
					parent_new.next().val(array[i+1][0]);
				}

			}else{

				condition = edit_event_ui.add_condition(parent, element[0]);

				condition.find('.condition_type').find(`optgroup[label=${element[0]}]`).find(`option[value=${element[1]}]`).prop('selected', true);

				if(element[0] === "Moons"){
					condition.find('.moon_select').val(element[2][0])
				}else if(element[0] === "Year" && element[1] != 6){
					element[2][0] = element[2][0] >= 0 ? element[2][0]+1 : element[2][0];
				}

				edit_event_ui.evaluate_inputs(condition);

				if(element[0] === "Moons"){
					condition.find('.moon_select').val(element[2][0])
					condition.find('.input_container').children().each(function(i){
						$(this).val(element[2][i+1]);
					})
				}else{
					condition.find('.input_container').children().each(function(i){
						$(this).val(element[2][i]);
					})
				}

				if(array[i+1] && group_type !== "num"){
					condition.children().last().val(array[i+1][0])
				}
			}
		}
	},

	// This function evaluates what inputs should be connected to any given condition based on its input
	evaluate_inputs: function(element){

		var selected_option = element.find('.condition_type').find(":selected");

		var type = selected_option.parent().attr('label');
		var selected = selected_option.val();
		var condition_selected = condition_mapping[type][selected][2];

		var html = [];

		if(type == "Month"){

			var next_start = 0;

			if(condition_selected[0] == "select"){
				html.push("<select class='form-control form-control-sm'>")

				for(var i = 0; i < static_data.year_data.timespans.length; i++){
					html.push(`<option value='${i}'>`);
					html.push(static_data.year_data.timespans[i].name);
					html.push("</option>");
				}

				html.push("</select>")
				next_start++;
			}

			for(var i = next_start; i < condition_selected.length; i++){

				html.push(`<input type='${condition_selected[i][0]}' placeholder='${condition_selected[i][1]}' class='form-control form-control-sm ${condition_selected[i][1]}'`);

				if(condition_selected[i][2]){
					html.push(` value='${condition_selected[i][2]}'`);
				}
				if(condition_selected[i][3]){
					html.push(` min='${condition_selected[i][3]}'`);
				}

				html.push(">");

			}

		}else if(type == "Moons"){

			var next_start = 0;

			if(condition_selected[0] == "select"){

				var selected_moon = element.find('.moon_select').val();

				selected_moon = selected_moon ? selected_moon : 0;

				html.push("<select class='form-control form-control-sm'>")

				for(var i = 0; i < moon_phases[static_data.moons[selected_moon].granularity].length; i++){
					html.push(`<option value='${i}'>`);
					html.push(moon_phases[static_data.moons[selected_moon].granularity][i]);
					html.push("</option>");
				}

				html.push("</select>")

				next_start++;

			}


			for(var i = next_start; i < condition_selected.length; i++){

				html.push(`<input type='${condition_selected[i][0]}' placeholder='${condition_selected[i][1]}' class='form-control form-control-sm ${condition_selected[i][1]}'`);

				if(condition_selected[i][2]){
					html.push(` value='${condition_selected[i][2]}'`);
				}

				if(condition_selected[i][3]){
					html.push(` min='${condition_selected[i][3]}'`);
				}

				html.push(">");

			}

		}else if(type == "Cycle"){

			html.push("<select class='form-control form-control-sm'>")
			for(var i = 0; i < static_data.cycles.data.length; i++){
				html.push(`<optgroup label='${ordinal_suffix_of(i+1)} cycle group' value='${i}'>`);
				for(var j = 0; j < static_data.cycles.data[i].names.length; j++){
					html.push(`<option value='${j}'>`);
					html.push(static_data.cycles.data[i].names[j]);
					html.push("</option>");
				}
				html.push("</optgroup>");
			}

			html.push("</select>")

		}else if(type == "Era"){

			html.push("<select class='form-control form-control-sm'>")
			for(var i = 0; i < static_data.eras.length; i++){
				html.push(`<option value='${j}'>`);
				html.push(static_data.eras[i].name);
				html.push("</option>");
			}

			html.push("</select>")

		}else if(type == "Season"){


			if(condition_selected[0] == "select"){
				html.push("<select class='form-control form-control-sm'>")
				for(var i = 0; i < static_data.seasons.data.length; i++){
					html.push(`<option value='${i}'>`);
					html.push(static_data.seasons.data[i].name);
					html.push("</option>");
				}

				html.push("</select>")

			}else{

				for(var i = 0; i < condition_selected.length; i++){

					html.push(`<input type='${condition_selected[i][0]}' placeholder='${condition_selected[i][1]}' class='form-control form-control-sm ${condition_selected[i][1]}'`);

					if(condition_selected[i][2]){
						html.push(` value='${condition_selected[i][2]}'`);
					}

					if(condition_selected[i][3]){
						html.push(` min='${condition_selected[i][3]}'`);
					}

					if(condition_selected[i][4]){
						html.push(` max='${condition_selected[i][4]}'`);
					}

					html.push(">");

				}

			}

		}else if(type == "Weekday"){

			var next_start = 0;

			if(condition_selected[0] == "select"){

				var selected_moon = element.find('.moon_select').val();

				selected_moon = selected_moon ? selected_moon : 0;

				html.push("<select class='form-control form-control-sm'>")

				html.push(`<optgroup label='Global week' value='global_week'>`);

				for(var i = 0; i < static_data.year_data.global_week.length; i++){

					html.push(`<option value='${i+1}'>`);
					html.push(static_data.year_data.global_week[i]);
					html.push("</option>");
					
				}

				html.push("</optgroup>");

				for(var i = 0; i < static_data.year_data.timespans.length; i++){

					if(static_data.year_data.timespans[i].week){

						html.push(`<optgroup label='${static_data.year_data.timespans[i].name} (custom week)' value='${i}'>`);

						for(var j = 0; j < static_data.year_data.timespans[i].week.length; j++){

							html.push(`<option value='${j+1}'>`);
							html.push(static_data.year_data.timespans[i].week[j]);
							html.push("</option>");

						}

						html.push("</optgroup>");

					}
				}

				next_start++;

			}


			for(var i = next_start; i < condition_selected.length; i++){

				html.push(`<input type='${condition_selected[i][0]}' placeholder='${condition_selected[i][1]}' class='form-control form-control-sm ${condition_selected[i][1]}'`);

				if(condition_selected[i][2]){
					html.push(` value='${condition_selected[i][2]}'`);
				}

				if(condition_selected[i][3]){
					html.push(` min='${condition_selected[i][3]}'`);
				}

				if(condition_selected[i][4]){
					html.push(` max='${condition_selected[i][4]}'`);
				}

				html.push(">");

			}

			html.push("</select>");

		}else if(type == "Year" && condition_selected.length == 1){

			for(var i = 0; i < condition_selected.length; i++){

				html.push(`<input type='${condition_selected[i][0]}' placeholder='${condition_selected[i][1]}' class='form-control form-control-sm ${condition_selected[i][1]}'`);

				if(condition_selected[i][2]){
					html.push(` value='${(condition_selected[i][2]|0) >= 0 ? (condition_selected[i][2]|0)+1 : (condition_selected[i][2]|0)}'`);
				}

				if(condition_selected[i][3]){
					html.push(` min='${condition_selected[i][3]}'`);
				}

				html.push(">");

			}

		}else{

			for(var i = 0; i < condition_selected.length; i++){

				html.push(`<input type='${condition_selected[i][0]}' placeholder='${condition_selected[i][1]}' class='form-control form-control-sm ${condition_selected[i][1]}'`);

				if(condition_selected[i][2]){
					html.push(` value='${condition_selected[i][2]}'`);
				}

				if(condition_selected[i][3]){
					html.push(` min='${condition_selected[i][3]}'`);
				}

				if(condition_selected[i][4]){
					html.push(` max='${condition_selected[i][4]}'`);
				}

				html.push(">");

			}

		}

		element.find('.input_container').empty().append(html.join(''));

	},

	add_condition: function(parent, type){

		var html = [];

		html.push("<li class='condition'>");
			html.push(`<div class='condition_container ${type}'>`);
				html.push("<div class='handle icon-reorder'></div>");
				html.push("<select class='form-control form-control-sm moon_select'>");
					for(var i = 0; i < static_data.moons.length; i++){
						html.push(`<option value='${i}'>`);
						html.push(static_data.moons[i].name);
						html.push("</option>");
					}
				html.push("</select>");
				html.push("<select class='form-control form-control-sm condition_type'>");

					var keys = Object.keys(condition_mapping);

					for(var i = 0; i < keys.length; i++){


						if(
							(keys[i] === "Era year" && static_data.eras === undefined)
							||
							(keys[i] === "Era" && static_data.eras === undefined)
							||
							(keys[i] === "Month" && static_data.year_data.timespans === undefined)
							||
							(keys[i] === "Weekday" && static_data.year_data.global_week === undefined)
							||
							(keys[i] === "Moons" && static_data.moons === undefined)
							||
							(keys[i] === "Cycle" && static_data.cycles === undefined)
						){
							continue;
						}

						html.push(`<optgroup label='${keys[i]}'>`);

						var options = condition_mapping[keys[i]];

						for(var j = 0; j < options.length; j++){

							html.push(`<option value='${j}'>`);
							html.push(options[j][0]);
							html.push("</option>");
						}

						html.push("</optgroup>");
					}

				html.push("</select>");
				html.push("<div class='input_container'>");
				html.push("</div>");
			html.push("</div>");
			html.push("<select class='form-control condition_operator'>");
				html.push("<option value='&&'>AND - both must be true</option>");
				html.push("<option value='NAND'>NAND - neither can be true</option>");
				html.push("<option value='||'>OR - at least one is true</option>");
				html.push("<option value='^'>XOR - only one must be true</option>");
			html.push("</select>");
		html.push("</li>");

		var condition = $(html.join(''));
		parent.append(condition);
		return condition;

	},

	add_group: function(parent, group_class){

		var html = [];

		html.push("<li class='group'>");
			html.push(`<div class='group_type' type='${group_class}'>`);
				html.push("<div class='normal'>");
					html.push(`<label><input type='radio' ${(group_class === "normal" ? "checked" : "")} name=''>NORMAL</label>`);
				html.push("</div>");
				html.push("<div class='not'>");
					html.push(`<label><input type='radio' ${(group_class === "not" ? "checked" : "")} name=''>NOT</label>`);
				html.push("</div>");
				html.push("<div class='num'>");
					html.push(`<label><input type='radio' ${(group_class === "num" ? "checked" : "")} name=''>AT LEAST</label><input type='number' class='form-control form-control-sm num_group_con' disabled>`);
				html.push("</div>");
			html.push("</div>");
			html.push("<div class='handle icon-reorder'></div>");
			html.push("<ol class='group_list'></ol>");
			html.push("<select class='form-control condition_operator'>");
				html.push("<option value='&&'>AND  - both must be true</option>");
				html.push("<option value='NAND'>NAND - neither can be true</option>");
				html.push("<option value='||'>OR   - at least one is true</option>");
				html.push("<option value='XOR'>XOR  - only one must be true</option>");
			html.push("</select>");
		html.push("</li>");

		var group = $(html.join(''));

		parent.append(group);

		edit_event_ui.update_radio_button_names();

		return group.children('.group_list');

	},

	update_radio_button_names: function(){
		var array = []
		$(".group_type").each(function(i){
			$(this).find("input[type='radio']").attr("name", `${i}_group_type`);
			var type = $(this).attr('type');
			$(this).find(`.${type} input[type='radio']`).prop('checked', true);
		});
	},

	evaluate_condition_selects: function(element){

		element.children().each(function(){

			if($(this).next().length === 0){
				$(this).children('.condition_operator').prop('disabled', true).addClass('hidden');
			}else{
				$(this).children('.condition_operator').prop('disabled', false).removeClass('hidden');
			}

			if($(this).hasClass('group')){
				edit_event_ui.evaluate_condition_selects($(this).find('.group_list'));
			}
		});

		if(element.hasClass('group_list')){
			if(element.parent().children().first().attr('type') === 'num'){
				element.parent().find('.num_group_con').attr('min', 1).attr('max', Math.max(1, element.children().length));
				element.children().each(function(){
					$(this).children('.condition_operator').prop('disabled', true).addClass('hidden');
				});
				element.children().each(function(){
					if($(this).hasClass('group')){
						edit_event_ui.evaluate_condition_selects($(this).find('.group_list'));
					}
				});
			}
		}
	}
}

var show_event_ui = {

	bind_events: function(){

		this.event_id							= null;
		this.event_condition_sortables			= [];
		this.current_sortable					= null;
		this.delete_droppable					= false;

		this.event_background 					= $('#event_show_background');
		this.close_ui_btn						= show_event_ui.event_background.find('.close_ui_btn');

		this.event_wrapper						= this.event_background.find('.event-wrapper');
		this.event_name							= this.event_background.find('.event_name');
		this.event_desc							= this.event_background.find('.event_desc');

		this.close_ui_btn.click(function(){
			show_event_ui.clear_ui();
		});

		this.event_wrapper.mousedown(function(event){
			event.stopPropagation();
		});

		this.event_background.mousedown(function(){
			show_event_ui.clear_ui();
		});

		$(document).on('click', '.event:not(.event-text-output)', function(){

			show_event_ui.set_current_event($(this).attr('event_id')|0)

		});

	},

	set_current_event: function(event_id){

		this.event_id = event_id;

		var event = static_data.event_data.events[event_id];

		this.event_name.text(event.name)
		
		this.event_desc.html(event.description).toggleClass('hidden', event.description.length == 0);

		this.event_background.removeClass('hidden');

	},

	clear_ui: function(){

		this.event_id = null;

		this.event_name.text('');

		this.event_desc.html('').removeClass('hidden');

		this.event_background.addClass('hidden');

	},
}

var edit_HTML_ui = {

	bind_events: function(){

		this.html_edit_background 				= $('#html_edit_background');
		this.save_btn							= this.html_edit_background.find('#btn_html_save');
		this.close_ui_btn						= this.html_edit_background.find('.close_ui_btn');
		this.data								= null;
		this.key								= null;
		this.value								= null;
		this.trumbowyg							= this.html_edit_background.find('.html_input');

		this.trumbowyg.trumbowyg();

		edit_HTML_ui.save_btn.click(function(){
			edit_HTML_ui.save_html();
		})

		edit_HTML_ui.close_ui_btn.click(function(){
			edit_HTML_ui.clear_ui();
		});

		$(document).on('click', '.html_edit', function(){
			var data = $(this).attr('data');
			edit_HTML_ui.key = $(this).attr('key');
			edit_HTML_ui.data = get_calendar_data(data);
			edit_HTML_ui.value = clone(edit_HTML_ui.data[edit_HTML_ui.key]);
			edit_HTML_ui.set_html();
		})

	},

	set_html: function(){

		this.trumbowyg.trumbowyg('html', this.value);

		this.html_edit_background.removeClass('hidden');

	},

	save_html: function(){

		this.data[this.key] = this.trumbowyg.trumbowyg('html');

		edit_HTML_ui.key = null;
		edit_HTML_ui.data = null;
		edit_HTML_ui.value = null;

		evaluate_save_button();

		this.clear_ui();

	},

	clear_ui: function(){

		this.trumbowyg.trumbowyg('html', '');

		this.reference = null;

		this.html_edit_background.addClass('hidden');

	},
}