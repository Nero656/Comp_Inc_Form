<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class theoretical_lessons extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'type_id',
        'date',
    ];

    protected $table = 'list_of_theoretical_lessons';

    public static function getUserLessonsList($id){
        return self::where('user_id', '=', $id)->with('theoretical_lessons_type')->get();
    }

    public static function make($request){
        return self::create([
            'user_id' => $request->user_id,
            'type_id' => $request->type_id,
            'date' => $request->date,
        ]);
    }


    public function theoretical_lessons_type()
    {
        return $this->hasOne(theoretical_lessons_type::class, 'id', 'type_id');
    }
}
