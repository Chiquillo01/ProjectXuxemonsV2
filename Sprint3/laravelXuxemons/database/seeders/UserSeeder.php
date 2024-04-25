<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'id' => 'A1B2C3',
            'nick' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('123456Ab.'),
            'rol' => 1,
        ]);

        DB::table('users')->insert([
            'id' => 'A2B3C4',
            'nick' => 'usuario',
            'email' => 'usuario@gmail.com',
            'password' => Hash::make('123456Ab.'),
            'rol' => 0,
        ]);
    }
}
