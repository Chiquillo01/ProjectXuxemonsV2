<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('intercambio', function (Blueprint $table) {
            $table->id();
            $table->string('user1');
            $table->string('xuxemon1');
            $table->string('user2');
            $table->string('xuxemon2');
            $table->boolean('intercambiar');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('intercambio');
    }
};