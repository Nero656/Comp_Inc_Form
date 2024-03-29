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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('login')->unique();
            $table->integer('role_id')->default(2);
            $table->string('email')->unique();
            $table->string('telephone')->unique();
            $table->string('password');
            $table->string('api_token')->nullable();
            $table->string('avatar')->default('/default_img/user-default.png')->nullable();
            $table->integer('instructor_id')->nullable();
            $table->timestamps();

            $table->foreign('role_id')->references('id')
                ->on('roles')->onDelete('cascade');
            $table->foreign('instructor_id')->references('id')
                ->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
