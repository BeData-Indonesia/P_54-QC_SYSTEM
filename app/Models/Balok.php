<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Balok extends Model
{
    use HasFactory;
    protected $table = 'balok';

    protected $primaryKey = 'no_balok';

    public $timestamps = true;

    protected $fillable = [
        'shif',
        'density',
        'jumlah_balok',
        'berat_kg',
        'keterangan',
        'kode_bahan',
    ];

    public function expander()
    {
        return $this->belongsTo(Expander::class, 'kode_bahan', 'kode_bahan');
    }
}
