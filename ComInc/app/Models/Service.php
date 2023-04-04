<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManagerStatic;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'description',
        'price'
    ];

    public static function Subscribe($user_id, $service_id)
    {

        $exist = DB::table('additional_services')
            ->where('user_id', '=', $user_id)
            ->where('service_id', '=', $service_id)->exists();


        if ($exist == 1) {
            $status = DB::table('additional_services')
                ->select('status')
                ->where('user_id', '=', $user_id)
                ->where('service_id', '=', $service_id)->first();

            if ($status->status) {
                DB::table('additional_services')
                    ->where('user_id', '=', $user_id)
                    ->where('service_id', '=', $service_id)
                    ->where('status', '=', true)
                    ->update(['status' => false]);
            } else {
                DB::table('additional_services')
                    ->where('user_id', '=', $user_id)
                    ->where('service_id', '=', $service_id)
                    ->where('status', '=', false)
                    ->update(['status' => true]);
            }
        } else {
            DB::table('additional_services')->
            insert(['user_id' => $user_id, 'service_id' => $service_id, 'status' => true]);
        }

        return DB::table('additional_services')->where('user_id', '=', $user_id)
            ->where('service_id', '=', $service_id)->get();
    }
}
