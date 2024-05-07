<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Contactos;
use Illuminate\Support\Facades\Log;

class ContactosController extends Controller
{
    /*
        Tipos de estado contactos:
        0 = nada
        1 = solicitud enviada
        2 = Solicitud acceptada
        3 = Solicitud rechazada
    */
    public function crear(Request $request)
    {
        try {

            // Obtener el token de usuario de la solicitud
            $userToken = $request->input('token');
            // Obtener el token de usuario de la solicitud
            $searchUser = $request->input('searchUser');

            // Busca el id del usuario autorizado
            $user = User::where('remember_token', $userToken)
                ->first();

            // Si no exixte usuario retornara el error
            if (!$user) {
                return response()->json(['message' => 'Usuario no encontrado', $user], 404);
            }

            if($user->idUser == $searchUser){
                return response()->json(['message' => 'Es el mismo usuario', $user], 404);
            }

            // Busca el id del usuario autorizado
            $buscarUser = User::where('idUser', $searchUser)
                ->first();

            // Si no exixte usuario retornara el error
            if (!$buscarUser) {
                return response()->json(['message' => 'Usuario no encontrado', $user], 404);
            }

            // Cambia esto
            $contactosExist = Contactos::all();

            // A algo como esto
            $contactosExist = Contactos::where(function ($query) use ($user, $buscarUser) {
                $query->where('user1', $user->idUser)->where('user2', $buscarUser->idUser)
                    ->orWhere('user1', $buscarUser->idUser)->where('user2', $user->idUser);
            })->first();

            // Y luego comprueba si el contacto existe
            if ($contactosExist) {
                // El contacto ya existe
                return response()->json(['message' => 'Usuario ya existente encontrado', $contactosExist], 200);
            } else {
                // El contacto no existe, así que crea uno nuevo
                $nuevoContacto = new Contactos();
                $nuevoContacto->user1 = $user->idUser;
                $nuevoContacto->user2 = $buscarUser->idUser;
                $nuevoContacto->estado = 1;
                $nuevoContacto->save();
            }
            return response()->json($nuevoContacto, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ha ocurrido un error al crear las solicitudes: ' . $e->getMessage()], 500);
        }
    }

    public function showSolicitudes(Request $request, $userToken)
{
    try {
        // Obtener el usuario a partir del token proporcionado
        $user = User::where('remember_token', $userToken)->first();

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        // Realizar la consulta para obtener las solicitudes asociadas al usuario
        $solicitudes = Contactos::where(function ($query) use ($user) {
            $query->where('user1', $user->idUser)
                  ->orWhere('user2', $user->idUser);
        })
        ->join('users', function ($join) {
            $join->on('contactos.user1', '=', 'users.idUser')
                 ->orOn('contactos.user2', '=', 'users.idUser');
        })
        ->whereNotIn('users.idUser', [$user->idUser])
        ->select(
            'contactos.*',
            'users.idUser',
            'users.nick'
        )
        ->get();


        return response()->json($solicitudes, 200);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Ha ocurrido un error al retornar las solicitudes: ' . $e->getMessage()], 500);
    }
}

}
