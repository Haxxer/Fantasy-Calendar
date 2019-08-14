<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

use App\CalendarEvent;

class SaveCalendarEvents implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($events, $categoryids, $calendarId)
    {
        $this->events = $events;
        $this->categoryids = $categoryids;
        $this->calendarId = $calendarId;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $eventids = [];
        foreach($this->events as $sort_by => $event) {
            $event['sort_by'] = $sort_by;

            if(!empty($event['event_category_id']) && !is_numeric($event['event_category_id'])) {
                $event['event_category_id'] = $this->categoryids[$event['event_category_id']];
            }

            if($event['event_category_id'] < 0) $event['event_category_id'] = null;

            if(array_key_exists('id', $event)) {
                $eventids[] = $event['id'];
                $event['data'] = json_encode($event['data']);
                $event['settings'] = json_encode($event['settings']);
                CalendarEvent::where('id', $event['id'])->update($event);
            } else {
                $event['calendar_id'] = $this->calendarId;
                $event = CalendarEvent::Create($event);
                $eventids[] = $event->id;
            }
        }
        CalendarEvent::where('calendar_id', $this->calendarId)->whereNotIn('id', $eventids)->delete();

        return $eventids;
    }
}
