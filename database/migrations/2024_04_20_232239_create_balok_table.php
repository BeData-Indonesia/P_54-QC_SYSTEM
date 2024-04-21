<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBalokTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('balok', function (Blueprint $table) {
            $table->increments('no_balok');
            $table->timestamps();
            $table->integer('shif');
            $table->float('density');
            $table->integer('jumlah_balok');
            $table->float('berat_kg');
            $table->text('keterangan');
            $table->string('kode_bahan');
            $table->foreign('kode_bahan')->references('kode_bahan')->on('expander')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('balok');
    }
}
