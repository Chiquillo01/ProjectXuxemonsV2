<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\XuxemonsUser;
use App\Models\ChuchesUser;
use App\Models\Enfermedad;
use App\Models\EnfermedadesUsers;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use App\Models\Xuxemons;
use Illuminate\Support\Facades\DB;

class EnfermedadesUserController extends Controller
{
    /**
     * Nombre: show
     * Función: Enviar los datos para que se muestren en el frontend
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Request $request, $userToken, $enfermedad)
    {
        try {
            // Obtener el token de usuario de la solicitud
            // $userToken = $request->input('token');

            $user = User::where('remember_token', $userToken)
                ->first();

            if (!$user) {
                // Manejar el caso donde no se encontró ningún usuario con el token proporcionado
                return response()->json(['message' => 'Usuario no encontrado'], 404);
            }

            // Realizar la consulta con un join para obtener los Xuxemons asociados al usuario
            $xuxemonsEnfermos = EnfermedadesUsers::where('user_id', $user->idUser)
                ->where('enfermedad_id', $enfermedad)
                ->where('infectado', 1)
                ->join('xuxemons', 'enfermedades_users.xuxemon_id', '=', 'xuxemons.id')
                ->select(
                    'enfermedades_users.*',
                    'xuxemons.nombre',
                    'xuxemons.tipo',
                    'xuxemons.archivo',
                    'xuxemons.tamano',
                    'xuxemons.evo1',
                    'xuxemons.evo2'
                )
                ->get();

            if ($xuxemonsEnfermos->isEmpty()) {
                // Imprimir un mensaje de registro si la colección está vacía
                Log::info('No se encontraron Xuxemons enfermos para el usuario con ID: ' . $user->idUser);
            }

            // Retorna todos los xuxemons en forma json
            return response()->json($xuxemonsEnfermos, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ha ocurrido un error al retornar los xuxemons: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Nombre: show
     * Función: Enviar los datos para que se muestren en el frontend
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function showEnfermos(Request $request, $userToken)
    {
        try {

            $user = User::where('remember_token', $userToken)
                ->first();

            if (!$user) {
                // Manejar el caso donde no se encontró ningún usuario con el token proporcionado
                return response()->json(['message' => 'Usuario no encontrado', $user, $userToken], 404);
            }

            // Realizar la consulta con un join para obtener los Xuxemons asociados al usuario
            $xuxemonsEnfermos = XuxemonsUser::where('user_id', $user->idUser)
                ->join('xuxemons', 'xuxemons_users.xuxemon_id', '=', 'xuxemons.id')
                ->where('xuxemons_users.enfermo', 1)
                ->select(
                    'xuxemons_users.*',
                    'xuxemons.nombre',
                    'xuxemons.tipo',
                    'xuxemons.archivo',
                    'xuxemons.tamano',
                    'xuxemons.evo1',
                    'xuxemons.evo2',
                )
                ->orderBy('xuxemons_users.favorito', 'desc')
                ->get();

            if ($xuxemonsEnfermos->isEmpty()) {
                // Imprimir un mensaje de registro si la colección está vacía
                Log::info('No se encontraron Xuxemons enfermos para el usuario con ID: ' . $user->idUser);
            }

            // Retorna todos los xuxemons en forma json
            return response()->json($xuxemonsEnfermos, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ha ocurrido un error al retornar los xuxemons: ' . $e->getMessage()], 500);
        }
    }


    /**
     * Nombre: show
     * Función: Enviar los datos para que se muestren en el frontend
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function showEnfermedades(Request $request, $userToken)
    {
        try {

            $user = User::where('remember_token', $userToken)
                ->first();

            if (!$user) {
                // Manejar el caso donde no se encontró ningún usuario con el token proporcionado
                return response()->json(['message' => 'Usuario no encontrado', $user, $userToken], 404);
            }

            // Realizar la consulta con un join para obtener los Xuxemons asociados al usuario
            $enfermedades = EnfermedadesUsers::where('user_id', $user->idUser)
                ->get();

            if ($enfermedades->isEmpty()) {
                // Imprimir un mensaje de registro si la colección está vacía
                Log::info('No se encontraron enfermedades para el usuario con ID: ' . $user->idUser);
            }

            // Retorna todos los xuxemons en forma json
            return response()->json($enfermedades, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ha ocurrido un error al retornar los xuxemons: ' . $e->getMessage()], 500);
        }
    }


    /**
     * Nombre: updateFav
     * Función: Gracias al valor que se le pasa por paremetro hace un update
     * a la db con el nuevo valor, esto lo hace a todos los registros de la tabla
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function curar(Request $request)
    {
        $xuxemon_id = $request->input('xuxemon_id');
        $userToken = $request->input('userToken');
        $enfId = $request->input('enfId');

        try {
            $user = User::where('remember_token', $userToken)
                ->first();

            if (!$user) {
                return response()->json(['message' => 'Usuario no encontrado', $user], 404);
            }

            $CurarEnfermedad = EnfermedadesUsers::where('user_id', $user->idUser)
                ->where('xuxemon_id', $xuxemon_id)
                ->where('enfermedad_id', $enfId)
                ->first();

            $CurarEnfermedad->infectado = false;
            $CurarEnfermedad->save();

            DB::transaction(function () use ($userToken, $xuxemon_id) {

                $user = User::where('remember_token', $userToken)
                    ->first();

                if (!$user) {
                    return response()->json(['message' => 'Usuario no encontrado al enfermar', $user], 404);
                }

                $XuxemonsEnfermos = XuxemonsUser::where('user_id', $user->idUser)
                    ->where('xuxemon_id', $xuxemon_id)
                    ->first();

                $XuxemonsEnfermos->enfermo = false;
                $XuxemonsEnfermos->save();
            });

            return response()->json(['message' => 'Ahora es un xuxemon curado' . $CurarEnfermedad], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ha ocurrido un error al curar al xuxemon: ' . $e->getMessage() . '' . $CurarEnfermedad], 500);
        }
    }

    public function enfermar(Request $request)
    {
        $xuxemon_id = $request->input('xuxemon_id');
        $userToken = $request->input('userToken');

        try {

            // Generar un número aleatorio entre 1 y 10 (10% de posibilidades)
            $random = rand(1, 10);

            // Inicializar la variable que contendrá el resultado del segundo random
            $randomSecond = null;

            // Si el número aleatorio es 1, 2 o 3 (30% de posibilidades cada uno)
            if ($random == 1) {
                // Generar un número aleatorio entre 1 y 3 (cada uno con un 33.33% de posibilidades)
                $randomSecond = rand(1, 3);
            } elseif ($random == 3) {
                // Generar dos números aleatorios entre 1 y 3 (cada uno con un 33.33% de posibilidades)
                $randomSecond = [rand(1, 3), rand(1, 3)];
            } elseif ($random == 6) {
                $randomSecond = [rand(1, 3), rand(1, 3), rand(1, 3),];
            } else {
                $randomSecond = 0;
            }

            $user = User::where('remember_token', $userToken)
                ->first();

            if (!$user) {
                // Manejar el caso donde no se encontró ningún usuario con el token proporcionado
                return response()->json(['message' => 'Usuario no encontrado', $user, $userToken], 404);
            }

            $enfermedadExist = EnfermedadesUsers::where('xuxemon_id', $xuxemon_id)
                ->exists();

            if (!$enfermedadExist) {
                $ListaEnfermedades = Enfermedad::all();
                // Iterar sobre cada campo
                foreach ($ListaEnfermedades as $enfermedad) {
                    $activo = false;
                    if ($enfermedad->enfermedad_id == $randomSecond) {
                        $activo = true;
                    }
                    // Crear el xuxemon con las 3 enfermedades
                    $nuevaEnfermedadUsuario = new EnfermedadesUsers();
                    $nuevaEnfermedadUsuario->user_id = $user->idUser;
                    $nuevaEnfermedadUsuario->xuxemon_id = $xuxemon_id;
                    $nuevaEnfermedadUsuario->enfermedad_id = $enfermedad->id;
                    $nuevaEnfermedadUsuario->infectado = $activo;
                    $nuevaEnfermedadUsuario->save();
                }
            }

            DB::transaction(function () use ($userToken, $xuxemon_id) {

                $user = User::where('remember_token', $userToken)
                    ->first();

                if (!$user) {
                    return response()->json(['message' => 'Usuario no encontrado al enfermar', $user], 404);
                }

                $XuxemonsEnfermos = XuxemonsUser::where('user_id', $user->idUser)
                    ->where('xuxemon_id', $xuxemon_id)
                    ->first();

                $XuxemonsEnfermos->enfermo = true;
                $XuxemonsEnfermos->save();
            });
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ha ocurrido un error al curar al xuxemon: ' . $e->getMessage()], 500);
        }
    }
}
