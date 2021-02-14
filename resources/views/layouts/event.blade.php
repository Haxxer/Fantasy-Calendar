<div id="event_show_background" class='clickable_background hidden'>
	<div class='modal-basic-container'>
		<div class='modal-basic-wrapper'>
			<div class='modal-wrapper'>
            
				<div class='close-ui-btn-bg'></div>
				<i class="close_ui_btn fas fa-times-circle"></i>

				<div class='row no-gutters modal-form-heading'>
					<h2><span class='event_name'>Editing Event</span> <i class="fas fa-pencil-alt edit_event_btn"></i></h2>
				</div>
				
				<div class='row'>
					<div class="event_desc col-12"></div>
				</div>

				<div id='event_comment_mastercontainer' class="row">

					<div class="col-12">
						<hr>

						<h4>Comments:</h4>

						<div class='row'>
							<div id='event_comments' class='loading col-12'></div>
						@if(Auth::check())
							<div class='col-12 mt-2' id='event_comment_input_container'>
								<textarea class='form-control' id='event_comment_input' placeholder='Enter your comment and press submit.' autofocus=''></textarea>
								<button type='button' class='btn btn-primary mt-2' style="z-index: 200" id='submit_comment'>Submit</button>
							</div>
						@endif
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div
    x-data="CalendarEventEditor"
    class='clickable_background'
    id='event_editor'
    @event-editor-modal-new-event.window="create_new_event"
    @event-editor-modal-edit-event.window="edit_event"
    @event-editor-modal-delete-event.window="query_delete_event"
    x-show='open'
>

    <div class='modal-basic-container'>
		<div class='modal-basic-wrapper'>
			<form id="event-form" class="modal-wrapper container" action="post">

				<div class='close-ui-btn-bg'></div>
				<i class="close_ui_btn fas fa-times-circle" @click='callback_do_close'></i>

				<div class='row no-gutters mb-1 modal-form-heading'>
					<h2 class='event_action_type'><span>Editing Event</span> <i class="fas fa-eye view_event_btn"></i></h2>
				</div>

				<div class='row no-gutters my-1'>
					<input type='text' class='form-control' x-model='working_event.name' placeholder='Event name' autofocus='' />
				</div>

				<div class='row no-gutters my-1'>
					<textarea class='form-control event_desc editable' x-ref='description' placeholder='Event description' autofocus=''></textarea>
				</div>

                @if(!isset($calendar) || (Auth::user() != Null && Auth::user()->can('advance-date', $calendar)))

                    <h5 class='row no-gutters mt-2 modal-form-heading' x-show="new_event">Condition presets:</h5>

                    <div class='row no-gutters mb-1' x-show="new_event">
                        <select class="form-control" @change='condition_preset_changed' x-model="preset" x-ref="condition_presets">
                            <template x-for="key in Object.keys(presets)">
                                <option x-show='presets[key].enabled' x-text='presets[key].text' :value='key'></option>
                            </template>
                            <optgroup value='moons' label='Moons' x-show="moon_presets.length > 0">
                                <template x-for="moon_preset in moon_presets">
                                    <option x-text='moon_preset.text' :value='moon_preset.value' :moon_index="moon_preset.moon_index"></option>
                                </template>
                            </optgroup>
                        </select>
                    </div>
                    
                    <div class='row no-gutters mb-1' x-show='selected_preset.nth' >
                        <input type='number' class='form-control' @change='nth_input_changed' x-model='nth' min='1' placeholder='Every nth' />
                    </div>

                    <h5 class='row no-gutters my-2 modal-form-heading'>Conditions:</h5>

                    <div class='row no-gutters my-2' id='non_preset_buttons'>
                        <div class='col-11 pr-1'>
                            <div class='row p-0'>
                                <div class='col-6 pr-1'>
                                    <button type='button' @click='add_condition_clicked' class='btn btn-primary full'>Add condition</button>
                                </div>
                                <div class='col-6 pl-1'>
                                    <button type='button' @click='add_group_clicked' class='btn btn-secondary full'>Add group</button>
                                </div>
                            </div>
                        </div>
                        <div class='col-1 pl-1'>
                            <button type='button' @click='remove_clicked' @mouseenter='remove_mouseover' @mouseleave='remove_mouseout' id='condition_remove_button' class='btn btn-danger full'><i class="icon fas fa-trash-alt"></i></button>
                        </div>
                    </div>
                    <div class='row no-gutters my-2'>
                        <ol class='form-control group_list_root' id='event_conditions_container' x-ref='event_conditions_container'>
                        </ol>
                    </div>

                    <span class='hidden'></span>

                    <div class='event_occurrences' x-show='working_event.data.conditions != []'>
                    
                        <div class='row no-gutters'>
                            <h5>Test event occurrences for the next:</h5>
                        </div>

                        <div class='row no-gutters'>
                            <div class='col-md-3 px-1'>
                                <button type='button' class='btn btn-info full test_event_btn' years="1">This year</button>
                            </div>
                            <div class='col-md-3 px-1'>
                                <button type='button' class='btn btn-info full test_event_btn' years="10">10 years</button>
                            </div>
                            <div class='col-md-3 px-1'>
                                <button type='button' class='btn btn-info full test_event_btn' years="100">100 years</button>
                            </div>
                            <div class='col-md-3 px-1'>
                                <button type='button' class='btn btn-info full test_event_btn' years="1000">1000 years</button>
                            </div>
                        </div>

                        <div class='event_occurrences_list_container hidden my-2'>
                            <div class='text'></div>
                            <div class='list hidden row no-gutters'>
                                <ul class='col half col1 list-unstyled'></ul>
                                <ul class='col half col2 list-unstyled'></ul>
                                <div class='full page_number'></div>
                                <div class='col half pr-1'>
                                    <button type='button' class='btn btn-info full prev' disabled>Previous</button>
                                </div>
                                <div class='col half pl-1'>
                                    <button type='button' class='btn btn-info full next' disabled>Next</button>
                                </div>
                            </div>
                        </div>

                    </div>
                @endif

                    <div class='row no-gutters mt-2'>
                        <div class='separator'></div>
                    </div>
                        
                    <div class='row no-gutters mt-2'>
                        <h4 @click='settings_open = !settings_open' class='cursor-pointer user-select-none'>
                            <i class="icon fas" x-bind:class='{
                                "fa-angle-right": !settings_open,
                                "fa-angle-down": settings_open,
                            }'></i>
                            Settings
                        </h4>
                    </div>

                    <div class='container settings_container p-0' x-show="settings_open">


                    @if(!isset($calendar) || (Auth::user() != Null && Auth::user()->can('advance-date', $calendar)))
                        <div class='row no-gutters'>
                            <div class='col-md-6 pl-0 pr-1'>
                                <label class='form-control checkbox'>
                                    <input type='checkbox' class='event_setting' x-model='working_event.data.limited_repeat'> Limit repetitions
                                </label>
                            </div>
                            <div class='col-md-6 pl-1 pr-0 form-control'>
                                <label class='row no-gutters'>
                                    <div class='col-auto pl-4 pr-1'>Limit for</div>
                                    <div class='col-4'>
                                        <input type='number' min='1' value='1' class='form-control form-control-sm' x-model='working_event.data.limited_repeat_num' :disabled='!working_event.data.limited_repeat'>
                                    </div>
                                    <div class='col-auto pl-1 pr-0'>days.</div>
                                </label>
                            </div>
                        </div>

                        <div class='limit_for_warning hidden row no-gutters p-2 mb-2 border rounded'>
                            <p class='m-0'><strong>Use with caution.</strong> This setting will simulate to check dates backward to ensure consistency across the beginning of years. That process can take a while if this number is particularly high, like 50 or more.</p>
                        </div>

                        <div class='row no-gutters'>
                            <div class='col-md-6 pl-0 pr-1'>
                                <label class='form-control checkbox'>
                                    <input type='checkbox' class='event_setting' x-model='working_event.data.has_duration'> Has duration
                                </label>
                            </div>

                            <div class='col-md-6 pl-1 pr-0 form-control'>
                                <label class='row no-gutters'>
                                    <div class='col-auto pl-4 pr-1'>Lasts for</div>
                                    <div class='col-4'>
                                        <input type='number' min='1' value='1' class='form-control form-control-sm' x-model='working_event.data.duration' :disabled='!working_event.data.has_duration'>
                                    </div>
                                    <div class='col-auto pl-1 pr-0'>days.</div>
                                </label>
                            </div>
                        </div>

                        <div class='duration_warning hidden row no-gutters p-2 mb-2 border rounded'>
                            <p class='m-0'><strong>Use with caution.</strong> This setting will simulate to check dates backward/forward to ensure consistency across the beginning/end of years. That process can take a while if this number is particularly high, like 50 or more.</p>
                        </div>

                        <div class='row no-gutters mb-2'>
                            <div class='col-12 pl-0 pr-1'>
                                <label class='form-control checkbox'>
                                    <input type='checkbox' class='event_setting' x-model='working_event.data.show_first_last'> Show only first and last event
                                </label>
                            </div>
                        </div>
                    @endif

                    <div class='row no-gutters my-2'>
                        <div class='separator'></div>
                    </div>
                    
                    @if(!isset($calendar) || count($calendar->event_categories) || (Auth::user() != Null && Auth::user()->can('update', $calendar)))
                        <div class='row mb-2 no-gutters'>
                            <div class='col-auto pl-0 pr-1'>
                                <h5 class='modal-form-heading'>Event Category:</h5>
                            </div>
                            <div class='col pl-0 pl-1'>
                                <select class="form-control event-category-list" x-model='working_event.event_category_id' @change="event_category_changed" placeholder='Event Category'>

                                </select>
                            </div>
                        </div>
                    @endif

                    @if(!isset($calendar) || (Auth::user() != Null && Auth::user()->can('update', $calendar)))
                        <div class='row no-gutters'>
                            <div class='col'>
                                <label class='form-control checkbox'>
                                    <input type='checkbox' class='event_setting' x-model='working_event.settings.hide_full'> Hide ENTIRELY (useful for event-based-events)
                                </label>
                            </div>
                        </div>
                    @endif

                    <div class='row no-gutters'>
                        <div class='col'>
                            <label class='form-control checkbox'>
                                <input type='checkbox' class='event_setting' x-model='working_event.settings.hide'> Hide event 
                                @if(!isset($calendar) || (Auth::user() != Null && !Auth::user()->can('update', $calendar)))
                                    (still visible for owner and co-owners)
                                @endif
                            </label>
                        </div>
                    </div>

                    @if(!isset($calendar) || (Auth::user() != Null && Auth::user()->can('update', $calendar)))
                        <div class='row no-gutters'>
                            <div class='col'>
                                <label class='form-control checkbox'>
                                    <input type='checkbox' class='event_setting' x-model='working_event.settings.print'> Show when printing
                                </label>
                            </div>
                        </div>
                    @endif

                    <div class='row no-gutters'>
                        <div class='col pr-1'>
                            <h5 class='modal-form-heading'>Color:</h5>
                            <select x-model='working_event.settings.color' class='form-control'>
                                <option>Dark-Solid</option>
                                <option>Red</option>
                                <option>Pink</option>
                                <option>Purple</option>
                                <option>Deep-Purple</option>
                                <option>Blue</option>
                                <option>Light-Blue</option>
                                <option>Cyan</option>
                                <option>Teal</option>
                                <option>Green</option>
                                <option>Light-Green</option>
                                <option>Lime</option>
                                <option>Yellow</option>
                                <option>Orange</option>
                                <option>Blue-Grey</option>
                            </select>
                        </div>

                        <div class='col pl-1'>
                            <h5 class='modal-form-heading'>Display:</h5>
                            <select x-model='working_event.settings.text' class='form-control'>
                                <option value="text">Just text</option>
                                <option value="dot">• Dot with text</option>
                                <option value="background">Background</option>
                            </select>
                        </div>
                    </div>

                    <div class='row no-gutters mt-3'>
                        Event look:
                    </div>
                    <div class='row no-gutters mt-0'>
                        <div class='col-4'>
                            <div class='event-text-output event' :class='working_event.settings.color + " " + working_event.settings.text'>Event (visible)</div>
                        </div>
                        <div class='col-4 px-1'>
                            <div class='event-text-output hidden_event event' :class='working_event.settings.color + " " + working_event.settings.text'>Event (hidden)</div>
                        </div>
                    </div>

                    <div class='row no-gutters'>
                        <div class='col'>
                            <div id='event_messagebox'></div>
                        </div>
                    </div>
				</div>

                <div class='row no-gutters mt-2'>
                    <div class='separator'></div>
                </div>

				<div class='row no-gutters my-1'>
					<div class='btn btn-lg btn-primary btn-block' @click="save_event">Save</div>
				</div>
				<div class='row no-gutters my-1'>
					<div class='btn btn-sm btn-danger btn-block' id='btn_event_delete'>Delete</div>
				</div>
			</form>
		</div>
	</div>
</div>

<div id="html_edit_background" class='clickable_background hidden'>
	<div class='modal-basic-container'>
		<div class='modal-basic-wrapper'>
			<form id="html-form" class="modal-wrapper" action="post">

				<div class='close-ui-btn-bg'></div>
				<i class="close_ui_btn fas fa-times-circle"></i>

				<h2 class='modal-form-heading'>Edit HTML</h2>

				<div class='row'>
					<textarea class='form-control html_input editable' name='html_input' placeholder='Event description' autofocus=''></textarea>
				</div>

				<div class='btn btn-lg btn-primary btn-block' id='btn_html_save'>Save</div>
			</form>
		</div>
	</div>
</div>
