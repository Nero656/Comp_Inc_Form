<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GymTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('gym_type')->insert(
            [
                'name'=>'Dry Dock ',
                'description'=>'Большой бассейн открытого типа'
            ]
        );
        DB::table('gym_type')->insert(
            [
                'name'=>'Синяя волна',
                'description'=>'Большой бассейн закрытого типа'
            ]
        );
        DB::table('gym_type')->insert(
            [
                'name'=>'Penguin Swim',
                'description'=>'бассейн открытого типа'
            ]
        );
        DB::table('gym_type')->insert(
            [
                'name'=>'Big Wave',
                'description'=>'бассейн закрытого типа'
            ]
        );
    }
}
