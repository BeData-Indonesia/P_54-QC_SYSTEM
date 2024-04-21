<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Expander;

class ExpanderSeeder extends Seeder
{
    public function run()
    {
        // Buat beberapa record expander dengan data palsu
        Expander::factory()->count(5)->create();
    }
}
