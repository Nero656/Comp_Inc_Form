<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\AdditionalServices;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function index()
    {
        return Service::all();
    }

    public function subscribe($user_id, $service_id){
        return Service::Subscribe($user_id, $service_id);
    }

    public function subscriptions($user_id){
        return AdditionalServices::Subscriptions($user_id);
    }

    public function destroy(Service $service)
    {
        $service->delete();
    }
}
