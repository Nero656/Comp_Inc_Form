<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class theoretical_lessons_type extends Model
{
    use HasFactory;


    protected $fillable = [
        'name',
    ];

    protected $table = 'list_of_theoretical_lessons_type';


}
