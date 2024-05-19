<?php

namespace Database\Factories;

use App\Models\Expander;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class ExpanderFactory extends Factory
{
    protected $model = Expander::class;
    private function generateDate(int $year, int $month)
    {
        $start = Carbon::create($year, $month, 1);
        $end = $start->copy()->endOfMonth();

        return $this->faker->dateTimeBetween($start, $end);
    }

    public function definition()
    {
        return [
            'kode_bahan' => $this->faker->unique()->word(),
            'shift' => $this->faker->numberBetween(1, 3),
            'banyak_kg' => 4174.6,
            'no_silo' => $this->faker->numberBetween(1, 10),
            'untuk_produk' => "Produk ".$this->faker->numberBetween(1, 10),
            'berat_jenis' => $this->faker->randomFloat(2, 0.1, 1),
            'density' => $this->faker->randomFloat(2, 0.5, 2),
            'keterangan' => $this->faker->sentence(),
            'jenis_bahan' => $this->faker->sentence(),
            'date'=>$this->generateDate(2024, 5),
        ];
    }
}
