<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserController;
use \App\Http\Controllers\ServiceController;
use \App\Http\Controllers\StatusController;
use \App\Http\Controllers\StackController;
use \App\Http\Controllers\PartnerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::prefix('/user')->group(function (){
    Route::post('/registration', [UserController::class, 'store']);
    Route::post('/auth', [UserController::class, 'auth']);
    Route::middleware('auth:api')->get('/show', [UserController::class, 'index']);
    Route::middleware('auth:api')->get('/all', [UserController::class, 'indexList']);
    Route::middleware('auth:api')->patch('/update', [UserController::class, 'update']);
});

Route::prefix('/service')->group(function (){
    Route::get('/all', [ServiceController::class, 'index']);
    Route::middleware('auth:api')->post('/', [ServiceController::class, 'store']);
    Route::middleware('auth:api')->patch('/{service}', [ServiceController::class, 'update']);
    Route::middleware('auth:api')->get('/{service}', [ServiceController::class, 'show']);
    Route::middleware('auth:api')->delete('/{service}', [ServiceController::class, 'destroy']);
});

Route::prefix('/stack')->group(function (){
    Route::get('/all', [StackController::class, 'index']);
    Route::middleware('auth:api')->post('/', [StackController::class, 'store']);
    Route::middleware('auth:api')->get('/{stack}', [StackController::class, 'show']);
    Route::middleware('auth:api')->patch('/{stack}', [StackController::class, 'update']);
    Route::middleware('auth:api')->delete('/{stack}', [StackController::class, 'destroy']);
});

Route::prefix('/status')->group(function (){
    Route::middleware('auth:api')->get('/all', [StatusController::class, 'index']);
    Route::middleware('auth:api')->post('/', [StatusController::class, 'store']);
    Route::middleware('auth:api')->patch('/{request}', [StatusController::class, 'update']);
    Route::middleware('auth:api')->delete('/{request}', [StatusController::class, 'destroy']);
});

Route::prefix('/orders')->group(function (){
    Route::middleware('auth:api')->get('/all', [orderController::class, 'index']);
    Route::middleware('auth:api')->get('/{order}', [orderController::class, 'show']);
    Route::middleware('auth:api')->get('/reqList/{id}', [orderController::class, 'showUserReq']);
    Route::middleware('auth:api')->post('/', [orderController::class, 'store']);
    Route::middleware('auth:api')->patch('/{order}', [orderController::class, 'update']);
    Route::middleware('auth:api')->delete('/{order}', [orderController::class, 'destroy']);
});


Route::prefix('/partners')->group(function (){
    Route::get('/all', [PartnerController::class, 'index']);
    Route::middleware('auth:api')->post('/', [PartnerController::class, 'store']);
    Route::middleware('auth:api')->get('/{partners}', [PartnerController::class, 'show']);
    Route::middleware('auth:api')->patch('/{partners}', [PartnerController::class, 'update']);
    Route::middleware('auth:api')->delete('/{partners}', [PartnerController::class, 'destroy']);
});
