<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInjectTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('inject', function (Blueprint $table) {
            $table->increments('no_inject');
            $table->timestamps();
            $table->string('type');
            $table->integer('spasi');
            $table->string('nama_barang');
            $table->integer('counter');
            $table->integer('hasil');
            $table->integer('rusak');
            $table->integer('cycle_time');
            $table->integer('aging_time');
            $table->float('berat_kering');
            $table->text('keterangan');
            $table->foreign('type')->references('kode_bahan')->on('expander')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('inject');
    }
}
