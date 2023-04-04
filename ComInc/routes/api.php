<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ScheduleController;
use \App\Http\Controllers\ServiceController;
use \App\Http\Controllers\StatusController;
use \App\Http\Controllers\StackController;
use \App\Http\Controllers\PartnerController;
use \App\Http\Controllers\GymController;
use \App\Http\Controllers\EquipmentController;
use \App\Http\Controllers\CategoryEquipmentController;
use \App\Http\Controllers\CertificateController;
use \App\Http\Controllers\DivingPermitController;
use \App\Http\Controllers\DiveTypeController;
use \App\Http\Controllers\theoreticalLessonsController;
use \App\Http\Controllers\theoreticalLessonsTypeController;
use \App\Http\Controllers\DiveController;
use \App\Http\Controllers\ReservoirsController;
use \App\Http\Controllers\ReservoirsTypeController;

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
    Route::middleware('auth:api')->get('/show/{user}', [UserController::class, 'show']);
    Route::middleware('auth:api')->get('/show', [UserController::class, 'index']);
    Route::middleware('auth:api')->get('/all', [UserController::class, 'indexList']);
    Route::middleware('auth:api')->get('/users', [UserController::class, 'userList']);
    Route::middleware('auth:api')->get('/trainerList', [UserController::class, 'TrainerList']);
    Route::middleware('auth:api')->put('/TrainerAppend/{user_id}/{trainer_id}',
        [UserController::class, 'TrainerUpdate']);
    Route::middleware('auth:api')->patch('/update', [UserController::class, 'update']);
});

Route::prefix('/gym')->group(function (){
    Route::get('/all', [GymController::class, 'index']);
    Route::get('/gym_types', [GymController::class, 'gymTypes']);
    Route::middleware('auth:api')->post('/', [GymController::class, 'create']);
    Route::middleware('auth:api')->patch('/{gym}', [GymController::class, 'update']);
    Route::get('/{gym}', [GymController::class, 'show']);
    Route::middleware('auth:api')->delete('/{gym}', [GymController::class, 'destroy']);
});

Route::prefix('/Certificate')->group(function (){
    Route::get('/types', [CertificateController::class, 'getCertificateTypes']);
    Route::post('/make', [CertificateController::class, 'store']);
    Route::get('/list/{user_id}', [CertificateController::class, 'userAll']);
});

Route::prefix('/diving/permitList')->group(function (){
    Route::post('/', [DivingPermitController::class, 'store']);
    Route::get('/{user_id}',[DivingPermitController::class, 'getList']);
    Route::get('/permit/{permit_id}',[DivingPermitController::class, 'getPermit']);
    Route::put('/permitTrue/{permit_id}',[DivingPermitController::class, 'getPermitTrue']);
    Route::put('/permitFalse/{permit_id}',[DivingPermitController::class, 'getPermitFalse']);
    Route::get('/getStatus/{user_id}',[DivingPermitController::class, 'getStatus']);
});


Route::prefix('/Schedule')->group(function (){
    Route::get('/{id}/{data}', [ScheduleController::class, 'count']);
});

Route::prefix('/equip')->group(function (){
    Route::get('/{equip}', [EquipmentController::class, 'show']);
    Route::post('/', [EquipmentController::class, 'store']);
});


Route::prefix('/Category')->group(function (){
    Route::get('/', [CategoryEquipmentController::class, 'index']);
    Route::post('/', [CategoryEquipmentController::class, 'store']);
});

Route::prefix('/theoretical/lessons/type')->group(function (){
    Route::get('/', [theoreticalLessonsTypeController::class, 'index']);
//    Route::post('/', [CategoryEquipmentController::class, 'store']);
});
Route::prefix('/dive/types')->group(function (){
    Route::get('/', [DiveTypeController::class, 'index']);
});

Route::prefix('/dive')->group(function (){
    Route::get('/', [DiveController::class, 'index']);
    Route::post('/', [DiveController::class, 'store']);
    Route::get('/{user_id}', [DiveController::class, 'list']);
    Route::get('/preview/{dive}', [DiveController::class, 'show']);
});

Route::prefix('/reservoirs')->group(function (){
    Route::get('/', [ReservoirsController::class, 'index']);
    Route::post('/', [ReservoirsController::class, 'store']);
    Route::get('/{id}', [ReservoirsController::class, 'show']);
    Route::get('/types', [ReservoirsController::class, 'types']);
    Route::delete('/{reservoirs}', [ReservoirsController::class, 'destroy']);
});

Route::prefix('/reservoirs_types')->group(function (){
    Route::get('/', [ReservoirsTypeController::class, 'index']);
});


Route::prefix('/theoretical/lessons')->group(function (){
    Route::get('/{user_id}', [theoreticalLessonsController::class, 'getList']);
    Route::post('/', [theoreticalLessonsController::class, 'store']);
});

Route::prefix('/service')->group(function (){
    Route::get('/all', [ServiceController::class, 'index']);
    Route::post('/sub/{user_id}/{ser_id}', [ServiceController::class, 'subscribe']);
    Route::post('/sub/{user_id}', [ServiceController::class, 'subscriptions']);
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
