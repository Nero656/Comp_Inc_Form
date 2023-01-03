<?php
namespace App\Http\Requests;

use App\Http\Requests\ApiRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\ValidationException;

class UserRequest extends ApiRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|min:3|max:20',
            'photo_url' => 'image|mimes:jpeg,bmp,png,jpg',
            'telephone' => 'required|unique:users',
            'login' => 'required|unique:users',
            'email' => 'required|email',
            'password' => 'required',
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
