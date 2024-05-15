<?php

namespace Database\Factories;

use App\Models\Expander;
use Illuminate\Database\Eloquent\Factories\Factory;

class ExpanderFactory extends Factory
{
    protected $model = Expander::class;

    public function definition()
    {
        return [
            'kode_bahan' => $this->faker->unique()->word(),
            'shift' => $this->faker->numberBetween(1, 3),
            'banyak_kg' => $this->faker->randomFloat(2, 100, 1000),
            'no_silo' => $this->faker->randomNumber(),
            'untuk_produk' => $this->faker->word(),
            'berat_jenis' => $this->faker->randomFloat(2, 0.1, 1),
            'density' => $this->faker->randomFloat(2, 0.5, 2),
            'keterangan' => $this->faker->sentence(),
        ];
    }
}
