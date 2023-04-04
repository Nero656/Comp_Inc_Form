<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('diver_book_create', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->integer('confined_training_id');
            $table->integer('open_training_id');
            $table->timestamps();

            $table->foreign('confined_training_id')->references('id')
                ->on('confined_water_training_dives_create')->onDelete('cascade');
            $table->foreign('open_training_id')->references('id')
                ->on('training_dives_in_open_water_create')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('diver_book_create');
    }
};
