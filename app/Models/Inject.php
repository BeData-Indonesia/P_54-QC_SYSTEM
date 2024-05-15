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
    
        'spasi',
        'nama_barang',
        'counter',
        'hasil',
        'rusak',
        'cycle_time',
        'aging_time',
        'berat_kering',
        'keterangan',
        'type',
    ];

    public function expander()
    {
        return $this->belongsTo(Expander::class, 'type', 'kode_bahan');
    }
}
