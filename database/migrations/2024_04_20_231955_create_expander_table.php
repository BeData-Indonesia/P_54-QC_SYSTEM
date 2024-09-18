<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExpanderTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('expander', function (Blueprint $table) {
            $table->increments('no_expander');
            $table->string('material_code')->unique();
            $table->integer('shift');
            $table->string('material_type');
            $table->float('weight');
            $table->float('remaining_weight');
            $table->integer('silo_code');
            $table->string('product');
            $table->float('density');
            $table->text('description')->nullable();
            $table->date('date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('expander');
    }
}
