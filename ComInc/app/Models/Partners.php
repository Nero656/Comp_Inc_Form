<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Partners extends Model
{
    use HasFactory;

    protected $fillable = [
        'image_url'
    ];

    public static function inst($request)
    {
        return self::create([
            "image_url" => ($request->file('image_url') !== null) ?
                Avatar::image_url($request->file('image_url'), 300, 100) : '',
        ]);
    }

    public static function edit($request, $service)
    {
        $update = [
            "image_url" => ($request->file('image_url') !== null) ?
                Avatar::image_url($request->file('image_url'), 300, 100) : '',
        ];

        $service->update(array_merge($request->all(), $update));

        return response([
            'You update service' => $service
        ])->setStatusCode(201);
    }
}
