<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservoirs extends Model
{
    use HasFactory;

    protected $table = 'reservoirs';

    protected $fillable = [
        "name",
        "address",
        "type_id",
        "image_url",
        "background_color"
    ];

    public static function inst($request){
        return self::create([
            'name' => $request->name,
            'address' => $request->address,
            'type_id' => $request->type_id,
            "image_url" => ($request->file('image_url') !== null) ?
                Avatar::image_url_no_resize($request->file('image_url')) : '',
            'background_color' => $request->background_color
        ]);
    }

    public static function preview($id){
        return self::where('id', '=', $id)->with('type_id')->get();
    }

    public function type_id()
    {
        return $this->hasOne(Reservoirs_type::class, 'id', 'type_id');
    }
}
