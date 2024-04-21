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
            'shif' => $this->faker->randomNumber(1,2,3),
            'density' => $this->faker->randomFloat(2, 0.5, 2),
            'jumlah_balok' => $this->faker->randomNumber(),
            'berat_kg' => $this->faker->randomFloat(2, 100, 1000),
            'keterangan' => $this->faker->sentence(),
            'kode_bahan' => $this->faker->randomElement($expanderKodeBahans), 
        ];
    }
}
