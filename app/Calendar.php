<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Auth;

class Calendar extends Model
{
    use SoftDeletes;

    protected $table = 'calendars_beta';

    protected $with = ['event_categories'];

    protected $casts = [
        'dynamic_data' => 'array',
        'static_data' => 'array',
    ];

    public $timestamps = false;

    public $fillable = [
        'user_id',
        'name',
        'dynamic_data',
        'static_data',
        'hash',
    ];

    public function user() {
        return $this->belongsTo('App\User');
    }

    public function event_categories() {
        return $this->hasMany('App\EventCategory');
    }

    public function getStaticDataAttribute($value) {
        $static_data = json_decode($value, true);

        $static_data['event_data']['categories'] = $this->event_categories;

        return $static_data;
    }

    public function scopeActive($query) {
        return $query->where('deleted', 0);
    }

    public function getOwnedAttribute() {
        if (Auth::check() && ($this->user->id == Auth::user()->id || Auth::user()->isAdmin())) {
            return "true";
        }

        return "false";
    }

    public function scopeHash($query, $hash) {
        return $query->where('hash', $hash);
    }

    public function scopeUser($query, $user_id) {
        return $query->where('user_id', $user_id);
    }
}
