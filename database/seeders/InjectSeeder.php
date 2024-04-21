<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Inject;

class InjectSeeder extends Seeder
{
    public function run()
    {
        // Buat 10 record inject dengan data palsu
        Inject::factory()->count(10)->create();
    }
}
