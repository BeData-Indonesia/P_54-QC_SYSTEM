<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Balok;

class BalokSeeder extends Seeder
{
    public function run()
    {
        // Buat 10 record balok dengan data palsu
        Balok::factory()->count(10)->create();
    }
}
