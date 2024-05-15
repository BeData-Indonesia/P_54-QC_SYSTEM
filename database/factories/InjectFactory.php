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
           
            'spasi' => $this->faker->randomNumber(),
            'nama_barang' => $this->faker->word(),
            'counter' => $this->faker->randomNumber(),
            'hasil' => $this->faker->randomNumber(),
            'rusak' => $this->faker->randomNumber(),
            'cycle_time' => $this->faker->randomNumber(),
            'aging_time' => $this->faker->randomNumber(),
            'berat_kering' => $this->faker->randomFloat(2, 10, 100),
            'keterangan' => $this->faker->sentence(),
            'type' => $this->faker->randomElement($expanderKodeBahans), 
        ];
    }
}
