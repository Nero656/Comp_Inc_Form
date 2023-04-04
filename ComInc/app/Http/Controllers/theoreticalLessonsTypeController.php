<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\theoretical_lessons_type;
use Illuminate\Http\Request;

class theoreticalLessonsTypeController extends Controller
{
    public function index(){
        return theoretical_lessons_type::all();
    }
}
