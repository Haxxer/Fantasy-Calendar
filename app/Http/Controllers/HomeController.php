<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use GrahamCampbell\Markdown\Facades\Markdown;

use database;
use Auth;
use Storage;
use App\User;
use App\Calendar;

class HomeController extends Controller
{
    public function __construct() {
        $this->middleware('calendarauth');
    }

    public function home() {    
        $changelog = Markdown::convertToHtml(Storage::disk('base')->get('public/changelog.md'));

        $calendars = null;

        if (Auth::check()) {
            $calendars = (Auth::user()->permissions == 1) ? Calendar::active()->with('user')->get() : Auth::user()->calendars;
        }

        return view('home', [
            'title' => "Fantasy Calendar",
            'changelog' => $changelog,
            'calendars' => $calendars
        ]);
    }
}
