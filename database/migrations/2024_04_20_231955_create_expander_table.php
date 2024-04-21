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
            $table->string('kode_bahan')->primary();
            $table->timestamps();
            $table->integer('shift');
            $table->float('banyak_kg');
            $table->integer('no_silo');
            $table->string('untuk_produk');
            $table->float('berat_jenis');
            $table->float('density');
            $table->text('keterangan');
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
