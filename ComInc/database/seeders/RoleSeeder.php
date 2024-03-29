<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class roleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert(
            [
                'role' => 'admin',
            ]
        );
        DB::table('roles')->insert(
            [
                'role' => 'user',
            ]
        );
        DB::table('roles')->insert(
            [
                'role' => 'trainer',
            ]
        );
        DB::table('roles')->insert(
            [
                'role' => 'moderator',
            ]
        );
    }
}
