<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\ValidationException;

class UpdateUserRequest extends ApiRequest
{
    public function rules()
    {
        return [
            'name' => 'min:3|max:10',
            'login' => 'min:3|max:10|unique:users',
            'email' => 'unique:users|email',
            'photo_url' => 'image|mimes:jpeg,bmp,png,jpg',
        ];
    }


    protected function failedValidation(Validator $validator)
    {
        throw (new ValidationException($validator))
            ->status(500)
            ->errorBag($this->errorBag)
            ->redirectTo($this->getRedirectUrl());
    }
}
