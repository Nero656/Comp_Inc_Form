<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Certificate extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'type_id',
        'date_of_issue',
    ];

    protected $table = 'diver_certificates';

     public static function getCertificateTypes(){
         return DB::table('diver_certificates_types')->get();
     }

     public static function make(Request $certificate){
         return self::create([
             'user_id'=>$certificate->user_id,
             'type_id'=>$certificate->type_id,
             'date_of_issue'=>$certificate->date_of_issue,
         ]);
     }

    public static function CertificateList($user_id){
        return self::with('user')->with('types')->where('user_id', '=', $user_id)->get();
    }

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function types()
    {
        return $this->hasOne(diver_certificates_types::class, 'id', 'type_id');
    }
}
