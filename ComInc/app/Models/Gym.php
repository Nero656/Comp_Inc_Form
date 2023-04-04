<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class Gym extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'address',
        'gym_type_id',
        'image_url',
        'background_color'
    ];

    public static function creating($request)
    {
        return self::create([
            'name' => $request->name,
            'address' => $request->address,
            'gym_type_id' => $request->gym_type_id,
            "image_url" => ($request->file('image_url') !== null) ?
                Avatar::image_url($request->file('image_url'), 250, 250) : '',
            'background_color' => $request->background_color
        ]);
    }

    public static function edit($request, $gym)
    {
        $update = [
            "name" => ($request->name !== null) ? $request->name : $gym->name,
            "gym_type_id" => ($request->gym_type_id !== null) ? $request->gym_type_id : $gym->gym_type_id,
            "gym_equipment_id" => ($request->gym_equipment_id !== null)
                ? $request->gym_equipment_id : $gym->gym_equipment_id,
            "background_color" => ($request->background_color !== null)
                ? $request->background_color : $gym->background_color,
            "image_url" => ($request->file('image_url') !== null) ?
                Avatar::image_url($request->file('image_url'), 250, 250) : ''
        ];

        return response([
            'You update user' => $gym->update(array_merge($request->all(), $update))
        ])->setStatusCode(201);
    }

    public static function showing($gym)
    {
        return $gym->with('gym_type')
            ->where('id','=' ,$gym->id)->get();
    }

    public static function types(){
        return DB::table('gym_type')->get();
    }

    public function gym_type()
    {
        return $this->hasOne(GymType::class, 'id', 'gym_type_id');
    }
}
