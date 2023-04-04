<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DiverCertificatesTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('diver_certificates_types')->insert(
            [
                'name'=>'Фри-дайвинг',
            ]
        );
        DB::table('diver_certificates_types')->insert(
            [
                'name'=>'Дайвинг в воздушной камере',
            ]
        );
        DB::table('diver_certificates_types')->insert(
            [
                'name'=>'Дайвинг со сжатым воздухом, который подается с поверхности',
            ]
        );
        DB::table('diver_certificates_types')->insert(
            [
                'name'=>'Скуба дайвинг',
            ]
        );
    }
}
