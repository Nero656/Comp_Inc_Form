<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Reservoirs;
use Illuminate\Http\Request;

class ReservoirsController extends Controller
{
    public function index(){
        return Reservoirs::with('type_id')->get();
    }

    public function store(Request $request){
        return Reservoirs::inst($request);
    }

    public function show($id){
        return Reservoirs::preview($id);
    }

    public function destroy(Reservoirs $reservoirs){
        return $reservoirs->delete();
    }

}
