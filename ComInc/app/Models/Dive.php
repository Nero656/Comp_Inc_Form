<?php

namespace App\Models;

use http\Env\Request;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Dive extends Model
{
    use HasFactory;

    protected $table = 'dive';

    protected $fillable = [
        'name',
        'date',
        'time',
        'duration',
        'deep',
        'reservoirs_id',
        'user_id',
        'type_id'
    ];
    public static function inst($request)
    {
        return self::create([
           "name"=>$request->name,
           "date"=>$request->date,
           "time"=>$request->time,
           "deep"=>$request->deep,
           "duration"=>$request->duration,
           "reservoirs_id"=>$request->reservoirs_id,
           "user_id"=>$request->user_id,
           "type_id"=>$request->type_id
        ]);
    }

    public static function DiveList($id){
        return self::where('user_id', '=', $id)->
        with('users', 'reservoirs', 'types')->get();
    }

    public static function DiveShow($id){
        return self::where('id', '=', $id)->
        with('users', 'reservoirs', 'types')->get();
    }


    public function users()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function reservoirs()
    {
        return $this->hasOne(Reservoirs::class, 'id', 'reservoirs_id');
    }

    public function types()
    {
        return $this->hasOne(dive_type::class, 'id', 'type_id');
    }
}
