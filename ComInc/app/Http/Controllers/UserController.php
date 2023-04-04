<?php

namespace App\Http\Controllers;
use App\Http\Requests\AuthRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Authenticatable
     */
    public function index()
    {
        return Auth::user();
    }

    public function indexList()
    {
        return User::all();
    }

    public function userList()
    {
        return User::UserList();
    }

    public function TrainerList()
    {
        return User::TrainerList();
    }

    public function TrainerUpdate($id, $trainer_id)
    {
        return User::TrainerAppend($id, $trainer_id);
    }


    /**
     * @param UserRequest $request
     * @return mixed
     */
    public function store(UserRequest $request)
    {
       return User::registration($request);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function show(User $user)
    {
        return User::UserInfo($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param AuthRequest $request
     * @param User $user
     * @return Response
     */
    public function update(UpdateUserRequest $request)
    {
        return User::edit($request, Auth::user());
    }

    public function auth()
    {
        if (!auth()->attempt(request(['email', 'password']))) {
            return response()->json(['message' => 'authorization error'])->setStatusCode(403);
        }

        Auth::user()->api_token = Hash::make(Str::random(40));
        Auth::user()->save();

        return response(['api_token' => Auth::user()->api_token])->setStatusCode(201);
    }
}
