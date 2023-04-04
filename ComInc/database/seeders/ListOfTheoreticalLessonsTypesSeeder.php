<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ListOfTheoreticalLessonsTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('list_of_theoretical_lessons_type')->insert(
            [
                'name'=>'Фри-дайвинг',
            ]
        );
        DB::table('list_of_theoretical_lessons_type')->insert(
            [
                'name'=>'Дайвинг в воздушной камере',
            ]
        );
        DB::table('list_of_theoretical_lessons_type')->insert(
            [
                'name'=>'Дайвинг со сжатым воздухом, который подается с поверхности',
            ]
        );
        DB::table('list_of_theoretical_lessons_type')->insert(
            [
                'name'=>'Скуба дайвинг',
            ]
        );
    }
}
