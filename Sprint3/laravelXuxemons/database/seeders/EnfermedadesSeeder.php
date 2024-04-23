<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EnfermedadesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $efecto = [
            '1', '2', '3'
        ];

        //Incomible: El xuxemon no puede alimentarse, por tanto el usuario no puede darle de comer
        //Inactivo: Si el xuxemon está en activo no se puede usar para nada
        //Comilon: Requiere +2 xuxes por nivel para crecer

        $nombres = [
            'Atracón', 'Sobredosis de azúcar', 'Bajón de azúcar'
        ];

        for ($i = 0; $i < count($nombres); $i++) {

            DB::table('enfermedades')->insert([
                'nombre' => $nombres[$i],
                'efecto' => $efecto[$i]
            ]);
        }
    }
}
