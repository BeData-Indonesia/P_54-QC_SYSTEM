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
        'bagus',
        'rusak',
        'cycle_time',
        'aging_time',
        'berat_kering',
        'keterangan',
        'type',
        'date',
    ];

    public function expander()
    {
        return $this->belongsTo(Expander::class, 'type', 'no_expander');
    }
}
