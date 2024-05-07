<?php

use Illuminate\Support\Facades\Route;
// Controladores //
use \App\Http\Controllers\Controller;
use \App\Http\Controllers\XuxemonsController;
use \App\Http\Controllers\XuxemonsUserController;
use App\Http\Controllers\ChuchesUserController;
use App\Http\Controllers\ContactosController;
use App\Http\Controllers\EnfermedadesUserController;

// Rutas para los Xuxemons // 
// Creación de Xuxemons //
Route::post('/xuxemons', [XuxemonsController::class, 'crearXuxemon']);
Route::post('/xuxemons/pc/random', [XuxemonsUserController::class, 'debug']);
// Actualización de Xuxemon //
Route::put('/xuxemons/actualizar', [XuxemonsController::class, 'update']);
Route::post('/xuxemons/activo', [XuxemonsUserController::class, 'updateActivo']);
Route::post('/xuxemons/favorito', [XuxemonsUserController::class, 'updateFav']);
// Actualizar tamaño para la evolución por defecto ( uso del administrador) //
Route::put('/xuxemons/evolucionar', [XuxemonsUserController::class, 'evolucionarXuxemon']);
Route::put('/xuxemons/evolucionar2', [XuxemonsUserController::class, 'evolucionarXuxemon2']);
// Actualizar configuraciones del administrador //
Route::put('/xuxemons/tamano', [XuxemonsController::class, 'updateTam']);
Route::put('/xuxemons/evos', [XuxemonsController::class, 'updateEvo1']);
Route::put('/xuxemons/evos2', [XuxemonsController::class, 'updateEvo2']);
// Actualizar alimentos xuxemon usuario //
Route::put('/xuxemons/{xuxemon_id}/alimentar/{chuche_id}/user/{user_Id}', [XuxemonsUserController::class, 'alimentar']);
// Route::put('/xuxemons/alimentar/user', [XuxemonsUserController::class, 'alimentar']);
// Eliminar un xuxemon //
Route::delete('/xuxemons/{xuxemons}', [XuxemonsController::class, 'destroy']);
// Mostrar todos los xuxemons //
Route::get('/xuxemons', [XuxemonsController::class, 'show']);
// Mostrar todos los xuxemons del usuario //
Route::get('/xuxemonsUser/{userToken}', [XuxemonsUserController::class, 'show']);
// Mostrar todos los xuxemons del usuario //
Route::get('/xuxemonsUserActivos/{userId}', [XuxemonsUserController::class, 'showActivos']);
// ---------------------- //
// ---------------------- //

Route::get('/curas', [ChuchesUserController::class, 'showCuras']);

// Rutas para las chuches //
Route::put('/activar/horario/{userId}', [ChuchesUserController::class, 'ReclamarHorario']);
Route::get('/horario/show/{userId}', [ChuchesUserController::class, 'showHorario']);
// Crear chuches aleatorias //
Route::post('/chuches/horario/{userId}', [ChuchesUserController::class, 'horario']);
// Crear chuches aleatorias //
Route::post('/chuches/actualizarHorario/{userId}', [ChuchesUserController::class, 'actualizarHorario']);
// Crear chuches aleatorias //
Route::post('/chuches/random/{userId}', [ChuchesUserController::class, 'debug']);
// Mostrar todas las xuxes del usuario //
Route::get('/chuchesUser/{userId}', [ChuchesUserController::class, 'show']);
// ---------------------- //
// ---------------------- //

// Rutas del usuario Usuario // 
Route::post('/register', [Controller::class, 'register']);
Route::post('/login', [Controller::class, 'login']);
// ---------------------- //
// ---------------------- //
// Mostrar todas las enfermedades //
Route::get('/enfermedades/{userId}', [EnfermedadesUserController::class, 'showEnfermedades']);
// Mostrar todos los xuxemons enfermos //
Route::get('/xuxemonsEnfermosUser/{userId}', [EnfermedadesUserController::class, 'showEnfermos']);
// Mostrar todos los xuxemons enfermos //
Route::get('/enfermos/{userId}/{enfermedadId}', [EnfermedadesUserController::class, 'show']);
// Actualizar alimentos xuxemon usuario //
Route::put('/enfermar', [EnfermedadesUserController::class, 'enfermar']);
// Actualizar alimentos xuxemon usuario //
Route::put('/xuxemons/{xuxemon_id}/alimentar/{chuche_id}/user/{user_Id}', [XuxemonsUserController::class, 'alimentar']);
Route::post('/curar', [EnfermedadesUserController::class, 'curar']);
// ---------------------- //
// ---------------------- //
// Crear peticion usuarios //
Route::post('/usuarios', [ContactosController::class, 'crear']);
// Muestra solicitudes de amisatad del usuarios //
Route::get('/showSolicitudes/{userId}', [ContactosController::class, 'showSolicitudes']);
