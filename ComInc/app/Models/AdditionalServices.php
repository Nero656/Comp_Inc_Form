<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class AdditionalServices extends Model
{
    use HasFactory;

    public static function Subscriptions($user_id)
    {
        return self::with('service')->where('user_id', '=', $user_id)->get();
    }
    public function service()
    {
        return $this->hasOne(Service::class, 'id', 'service_id');
    }
}
