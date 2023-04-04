<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert(
            [
                'name' => 'admin',
                'login' => 'admin',
                'email' => 'admin@gmail.com',
                'telephone' => '+7 001 000 00 00',
                'password' => Hash::make('admin'),
                'role_id' => 1,
            ]
        );
        DB::table('users')->insert(
            [
                'name' => 'trainer',
                'login' => 'trainer',
                'email' => 'trainer@gmail.com',
                'telephone' => '+7 002 000 00 00',
                'password' => Hash::make('user'),
                'role_id' => 3
            ]
        );
        DB::table('users')->insert(
            [
                'name' => 'user',
                'login' => 'user',
                'email' => 'user@gmail.com',
                'telephone' => '+7 003 000 00 00',
                'password' => Hash::make('user'),
                'role_id' => 2,
                'instructor_id' => 2,
            ]
        );
        DB::table('users')->insert(
            [
                'name' => 'moderator',
                'login' => 'moderator',
                'email' => 'moderator@gmail.com',
                'telephone' => '+7 004 000 00 00',
                'password' => Hash::make('user'),
                'role_id' => 4
            ]
        );
    }
}
