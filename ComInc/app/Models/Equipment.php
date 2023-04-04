<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{
    use HasFactory;

    protected $table = 'equipment';

    protected $fillable = [
        'name',
        'brand',
        'model',
        'manufacturer',
        'category_id'
    ];


    public static function showing($equipment){
        return self::where('category_id', '=', $equipment)->get();
    }

    public static function creating($callback)
    {
        return self::create([
            'name' => $callback->name,
            'brand' => $callback->brand,
            'model' => $callback->model,
            'manufacturer' => $callback->manufacturer,
            'category_id' => $callback->category_id
        ]);
    }
}
