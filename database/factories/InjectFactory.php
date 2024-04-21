<?php

namespace Database\Factories;

use App\Models\Inject;
use App\Models\Expander;
use Illuminate\Database\Eloquent\Factories\Factory;

class InjectFactory extends Factory

{
    protected $model = Inject::class;
    public function definition()
    {
        $expanderKodeBahans = Expander::pluck('kode_bahan')->toArray();
        return [
            'shif' => $this->faker->randomNumber(),
            'spasi' => $this->faker->randomNumber(),
            'nama_barang' => $this->faker->word(),
            'counter' => $this->faker->randomNumber(),
            'hasil' => $this->faker->randomNumber(),
            'ruas' => $this->faker->randomNumber(),
            'cycle_time' => $this->faker->randomNumber(),
            'aging_time' => $this->faker->randomNumber(),
            'berat_kering' => $this->faker->randomFloat(2, 10, 100),
            'keterangan' => $this->faker->sentence(),
            'kode_bahan' => $this->faker->randomElement($expanderKodeBahans), 
        ];
    }
}
