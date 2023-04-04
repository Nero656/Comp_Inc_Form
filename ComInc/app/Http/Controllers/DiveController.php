<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Dive;
use Illuminate\Http\Request;

class DiveController extends Controller
{
    public function index()
    {
        return Dive::all();
    }

    public function store(Request $req){
        return Dive::inst($req);
    }

    public function list($id){
        return Dive::DiveList($id);
    }

    public function show($id){
        return Dive::DiveShow($id);
    }
}
