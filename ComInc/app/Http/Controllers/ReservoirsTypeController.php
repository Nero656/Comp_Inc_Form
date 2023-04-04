<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Reservoirs_type;
use Illuminate\Http\Request;

class ReservoirsTypeController extends Controller
{
    public function index(){return Reservoirs_type::all();}
}
