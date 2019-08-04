<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\CalendarCollection;

use App\Calendar;

class CalendarController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api')->except('last_changed', 'children');
    }

    public function get(Request $request, Calendar $calendar) {
        return $calendar;
    }

    public function children(Request $request, Calendar $calendar) {
        return $calendar->children;
    }

    public function last_changed(Request $request, Calendar $calendar) {
        $last_changed = [
            'last_dynamic_change' => $calendar->last_dynamic_change,
            'last_static_change' => $calendar->last_static_change,
        ];

        return $last_changed;
    }

    public function owned(Request $request) {
        CalendarCollection::withoutWrapping();

        return new CalendarCollection(Calendar::where('user_id', '=', $request->user()->id)->get());
    }

    public function dynamic_data(Request $request, $id) {
        return Calendar::active()
            ->hash($id)
            ->user($request->user()->id)
            ->firstOrFail()->dynamic_data;
    }

    public function delete(Request $request, $id) {
        return (string)Calendar::active()
        ->hash($id)
        ->user($request->user()->id)
        ->firstOrFail()->delete();
    }
}
