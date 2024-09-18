<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expander extends Model
{
    use HasFactory;
    protected $table = 'expander';

    protected $primaryKey = 'material_code';

    public $incrementing = false;

    protected $fillable = [
        'material_code',
        'shift',
        'weight',
        'silo_code',
        'product',
        'density',
        'description',
        'material_type',
        'date',
        'remaining_weight'
    ];


    public function injects()
    {
        return $this->hasMany(Inject::class, 'type', 'no_expander');
    }

    public function baloks()
    {
        return $this->hasMany(Balok::class, 'type', 'no_expander');
    }
}
