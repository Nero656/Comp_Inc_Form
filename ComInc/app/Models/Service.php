<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManagerStatic;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'image_url',
        'background_color'
    ];


    public static function inst($request)
    {
        return self::create(
            [
                'name' => $request->name,
                'background_color' => $request->background_color,
                "image_url" => ($request->file('image_url') !== null) ?
                    Avatar::image_url($request->file('image_url'), 250, 250) : '',
            ]);
    }

    public static function edit($request, $service)
    {

        $update = [
            "name" => ($request->name !== null) ? $request->name : $service->name,
            "background_color" => ($request->background_color !== null) ? $request->background_color : $service->background_color,
            "image_url" => ($request->file('image_url') !== null) ?
                Avatar::image_url($request->file('image_url'), 250, 250) : '',
        ];

        $service->update(array_merge($request->all(), $update));

        return response([
            'You update service' => $service
        ])->setStatusCode(201);
    }
}
