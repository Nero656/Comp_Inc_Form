<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DivingPermit extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        "file",
        'access',
    ];

    protected $table = 'diving_permit';

    public static function make($request){

        return self::create([
            'user_id' => $request->user_id,
            "file" => ($request->file("file") !== null) ?
                Avatar::image_url_no_resize($request->file("file")) : '',
            'access' => $request->access
        ]);
    }

    public static function getUserPermitList($id){
        return self::where('user_id', '=', $id)->get();
    }

    public static function getPermit($id){
        return self::where('id', '=', $id)->get();
    }

    public static function getUserStatus($id){
        return  self::where('user_id', '=', $id)
            ->select('access')->get();
    }

    public static function getStatusUpdateTrue($id){
        return self::where('id', '=', $id)->update(['access' => 'true'])->get();
    }

    public static function getStatusUpdateFalse($id){
        return self::where('id', '=', $id)->update(['access' => 'false'])->get();
    }
}
