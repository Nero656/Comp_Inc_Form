<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\dive_type;
use Illuminate\Http\Request;

class DiveTypeController extends Controller
{
    public function index(){
        return dive_type::all();
    }
}
