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
        Schema::create('dive', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('date');
            $table->string('time');
            $table->string('deep');
            $table->string('duration');
            $table->integer('reservoirs_id');
            $table->integer('user_id');
            $table->integer('type_id');
            $table->timestamps();

            $table->foreign('reservoirs_id')->references('id')
                ->on('reservoirs')->onDelete('cascade');
            $table->foreign('user_id')->references('id')
                ->on('users')->onDelete('cascade');
            $table->foreign('type_id')->references('id')
                ->on('dive__type')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dive');
    }
};
