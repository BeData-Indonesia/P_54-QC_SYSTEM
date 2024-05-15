<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expander extends Model
{
    use HasFactory;
    protected $table = 'expander';

    protected $primaryKey = 'kode_bahan';

    public $incrementing = false;

    protected $fillable = [
        'kode_bahan',
        'shift',
        'banyak_kg',
        'no_silo',
        'untuk_produk',
        'berat_jenis',
        'density',
        'keterangan',
    ];


    public function injects()
    {
        return $this->hasMany(Inject::class, 'kode_bahan', 'kode_bahan');
    }

    public function baloks()
    {
        return $this->hasMany(Balok::class, 'kode_bahan', 'kode_bahan');
    }
}
