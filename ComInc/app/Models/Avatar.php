<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManagerStatic;

class Avatar extends Model
{
    use HasFactory;

    public static function image_url($file, $wight, $height)
    {
        $fileName = uniqid();

        $image = ImageManagerStatic::make($file)
            ->resize($wight, $height)
            ->save(storage_path('app/public/images' . $fileName . '.webp'), 100, 'webp');

        $fileDir = 'public/';

        return Storage::url($fileDir . $image->basename);
    }
    public static function image_url_no_resize($file)
    {
        $fileName = uniqid();

        $image = ImageManagerStatic::make($file)
            ->save(storage_path('app/public/images' . $fileName . '.webp'), 100, 'webp');

        $fileDir = 'public/';

        return Storage::url($fileDir . $image->basename);
    }
}
