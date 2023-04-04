<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryEquipment extends Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];


    protected $table = 'category_equipment';

    public static function showAll(){
        return self::all();
    }

    public static function creating($callback)
    {
      return self::create([
            'name' => $callback->name
        ]);
    }
}
