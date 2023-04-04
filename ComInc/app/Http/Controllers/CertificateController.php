<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use App\Models\Service;
use Illuminate\Http\Request;

class CertificateController extends Controller
{
    public function getCertificateTypes(){
        return Certificate::getCertificateTypes();
    }

    public function store(Request $certificate){
        return Certificate::make($certificate);
    }

    public function userAll($user_id){
        return Certificate::CertificateList($user_id);
    }
}
