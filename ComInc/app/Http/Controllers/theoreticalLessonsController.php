<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\theoretical_lessons;
use Illuminate\Http\Request;

class theoreticalLessonsController extends Controller
{
    public function getList($id){
        return theoretical_lessons::getUserLessonsList($id);
    }


    public function store(Request $request){
        return theoretical_lessons::make($request);
    }
}
