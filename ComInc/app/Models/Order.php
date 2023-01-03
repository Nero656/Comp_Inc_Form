<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'status_id',
        'service_id',
        'stack_id',
        'telephone',
        'description'
    ];

    public static function orderList(){
        return Order::where('user_id', '=', Auth::user()->id)->
        with('service', 'status')->get();
    }

    public static function showing($order)
    {
        return $order->with('user')
                    ->with('status', 'service', 'stack')
                    ->where('id','=' ,$order->id)->get();
    }

    public static function userReqList($id){
        return Order::where('user_id','=', $id)->with('user')
            ->with('status', 'service', 'stack')->get();
    }


    public static function inst($request)
    {

        return self::create(
            [
                'user_id' => Auth::user()->id,
                'status_id' => $request->status_id,
                'service_id' => $request->service_id,
                'stack_id' => $request->stack_id,
                'telephone' => $request->telephone,
                'description' => $request->description,
            ]);
    }



    public static function edit($request, $order)
    {
        $update = [
            'user_id' => ($request->user_id !== null) ? $request->user_id : $order->user_id,
            'status_id' => ($request->status_id !== null) ? $request->status_id : $order->status_id,
            'service_id' =>($request->service_id !== null) ? $request->service_id : $order->service_id,
            'stack_id' =>($request->stack_id !== null) ? $request->stack_id : $order->stack_id,
            'telephone' =>($request->telephone !== null) ? $request->telephone : $order->telephone,
            'description' =>($request->description !== null) ? $request->description : $order->description,
        ];

        $order->update(array_merge($request->all(), $update));

        return response([
            'You update order' => $order
        ])->setStatusCode(201);
    }


    public function status()
    {
        return $this->hasOne(Status::class, 'id', 'status_id');
    }

    public function service()
    {
        return $this->hasOne(Service::class, 'id', 'service_id');
    }
    public function stack()
    {
        return $this->hasOne(Stack::class, 'id', 'stack_id');
    }


    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

}
