<?php

namespace App\Http\Controllers;

use App\Models\Partners;
use Illuminate\Http\Request;

class PartnerController extends Controller
{
    /**
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function index(){
        return Partners::all();
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function store(Request $request)
    {
        return Partners::inst($request);
    }

    /**
     * @param Request $request
     * @param Partners $partners
     * @return mixed
     */
    public function update(Request $request, Partners $partners)
    {
        return Partners::edit($request, $partners);
    }

    public function show(Partners $partners)
    {
        return $partners;
    }


    /**
     * @param Partners $partners
     * @return bool|null
     */
    public function destroy(Partners $partners)
    {
        return $partners->delete();
    }
}
