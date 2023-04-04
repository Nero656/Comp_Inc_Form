<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
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
        'instructor_id'
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

    public static function UserList(){
        return self::where('role_id', '=', 2)->orWhere('role_id', '=', 3)->get();
    }

    public static function TrainerList(){
        return self::where('role_id', '=', 3)->get();
    }

    public static function TrainerAppend($id, $trainer_id){
        return self::where('id', '=', $id)->update(['instructor_id' => $trainer_id])->get();

    }

    public static function UserInfo(User $user){
        return $user;
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

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'instructor_id');
    }
}
