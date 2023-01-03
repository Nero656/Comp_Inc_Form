<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Http\Requests\UserRequest;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManagerStatic;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'login',
        'email',
        'telephone',
        'password',
        'avatar',
        'api_token',
        'role_id',
    ];


    public static function registration($request)
    {
        return self::create([
            "name" => $request->name,
            "login" => $request->login,
            "email" => $request->email,
            "telephone" => $request->telephone,
            "avatar" => ($request->file('avatar') !== null) ?
                Avatar::image_url($request->file('avatar'), 250, 250) : '',
            "password" => hash::make($request->password),
        ]);
    }

    public static function edit($request, $user)
    {
        $update = [
            "name" => ($request->name !== null) ? $request->name : $user->name,
            "login" => ($request->login !== null) ? $request->login : $user->login,
            "email" => ($request->email !== null) ? $request->email : $user->email,
            "telephone" => ($request->telephone !== null) ? $request->telephone : $user->telephone,
            "avatar" => ($request->file('avatar') !== null) ?
                Avatar::image_url($request->file('avatar'), 250, 250) : '',
            "password" => (hash::make($request->password) === null) ?
                hash::make($request->password)
                : hash::make($user->password)
        ];

        return response([
            'You update user' => $user->update(array_merge($request->all(), $update))
        ])->setStatusCode(201);
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'api_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
