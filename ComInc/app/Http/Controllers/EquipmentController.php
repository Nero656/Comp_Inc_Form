<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Equipment;
use Illuminate\Http\Request;

class EquipmentController extends Controller
{
    public function show($equipment){
        return Equipment::showing($equipment);
    }

    public function store(Request $request){
        return Equipment::creating($request);
    }
}
