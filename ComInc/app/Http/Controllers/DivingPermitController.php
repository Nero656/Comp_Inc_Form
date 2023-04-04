<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\DivingPermit;
use Illuminate\Http\Request;

class DivingPermitController extends Controller
{
    public function getList($user_id){
        return DivingPermit::getUserPermitList($user_id);
    }

    public function getStatus($user_id){
        return DivingPermit::getUserStatus($user_id);
    }

    public function getPermit($permit_id){
        return DivingPermit::getPermit($permit_id);
    }

    public function getPermitTrue($permit_id){
        return DivingPermit::getStatusUpdateTrue($permit_id);
    }

    public function getPermitFalse($permit_id){
        return DivingPermit::getStatusUpdateFalse($permit_id);
    }

    public function store(Request $request)
    {
        return DivingPermit::make($request);
    }
}
