<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $table = 'schedule';

    public static function count($schedule, $date){


        return self::where([['gym_id', '=', $schedule], ['date', '=', $date]])->count();
    }
}
