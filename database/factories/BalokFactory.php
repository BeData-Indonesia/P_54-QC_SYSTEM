<?php

namespace Database\Factories;

use App\Models\Balok;
use App\Models\Expander;
use Illuminate\Database\Eloquent\Factories\Factory;

class BalokFactory extends Factory
{
    protected $model = Balok::class;

    public function definition()
    {
        $expanderKodeBahans = Expander::pluck('kode_bahan')->toArray();
        return [
            'density' => $this->faker->randomFloat(2, 0.5, 2),
            'jumlah_balok' => $this->faker->randomNumber(),
            'berat_kg' => $this->faker->randomFloat(2, 100, 1000),
            'keterangan' => $this->faker->sentence(),
            'type' => $this->faker->randomElement($expanderKodeBahans), 
        ];
    }
}
