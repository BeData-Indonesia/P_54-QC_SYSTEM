<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inject extends Model
{
    use HasFactory;
    protected $table = 'inject';

    protected $primaryKey = 'no_inject';

    public $timestamps = true;

    protected $fillable = [
        'shif',
        'spasi',
        'nama_barang',
        'counter',
        'hasil',
        'ruas',
        'cycle_time',
        'aging_time',
        'berat_kering',
        'keterangan',
        'kode_bahan',
    ];

    public function expander()
    {
        return $this->belongsTo(Expander::class, 'kode_bahan', 'kode_bahan');
    }
}
