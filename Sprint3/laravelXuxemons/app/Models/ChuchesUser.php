<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChuchesUser extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';
    protected $fillable = [
        'chuche_id',
        'user_id',
        'stack'
    ];

    /**
     * Obtener el Xuxemon asociado a este registro pivot.
     */
    public function chuches()
    {
        return $this->belongsTo(Xuxemons::class, 'chuches_id');
    }

    /**
     * Obtener el usuario asociado a este registro pivot.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
