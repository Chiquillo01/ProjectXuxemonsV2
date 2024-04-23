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
    public function show(Request $request, $userToken)
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
            $xuxemonsEnfermos = EnfermedadesUsers::where('user_id', $user->id)
                ->where('enfermedad_id', 1)
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
                Log::info('No se encontraron Xuxemons enfermos para el usuario con ID: ' . $user->id);
            }

            // Retorna todos los xuxemons en forma json
            return response()->json($xuxemonsEnfermos, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ha ocurrido un error al retornar los xuxemons: ' . $e->getMessage()], 500);
        }
    }
}
