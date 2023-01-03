<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
    ];


    public static function inst($request)
    {
        return self::create(
            [
                'name' => $request->name,
            ]);
    }


    public static function edit($request, $status)
    {
        $update = [
            'name' => ($request->user_id !== null) ? $request->name : $status->name,
        ];

        $status->update(array_merge($request->all(), $update));

        return response([
            'You update order' => $status
        ])->setStatusCode(201);
    }

}
