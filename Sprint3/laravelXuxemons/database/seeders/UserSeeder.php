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
            'id' => '1',
            'idUser' => 'A1B2C3',
            'nick' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('123456Ab.'),
            'rol' => 1,
        ]);

        DB::table('users')->insert([
            'id' => '2',
            'idUser' => 'A2B3C4',
            'nick' => 'usuario',
            'email' => 'usuario@gmail.com',
            'password' => Hash::make('123456Ab.'),
            'rol' => 0,
        ]);

        DB::table('users')->insert([
            'id' => '3',
            'idUser' => 'AAAAA1',
            'nick' => 'oriol',
            'email' => 'oriol@gmail.com',
            'password' => Hash::make('123456Ab.'),
            'rol' => 0,
        ]);

        DB::table('users')->insert([
            'id' => '4',
            'idUser' => 'A4B5C6',
            'nick' => 'edgar',
            'email' => 'edgar@gmail.com',
            'password' => Hash::make('123456Ab.'),
            'rol' => 0,
        ]);

        DB::table('users')->insert([
            'id' => '5',
            'idUser' => 'A5B6C7',
            'nick' => 'rafa',
            'email' => 'rafa@gmail.com',
            'password' => Hash::make('123456Ab.'),
            'rol' => 0,
        ]);
    }
}
