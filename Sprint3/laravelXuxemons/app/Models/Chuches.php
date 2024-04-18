<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chuches extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'dinero',
        'modificador',
        'archivo',
    ];

    /**
     * Los usuarios que poseen este Xuxemon.
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'chuches_users');
    }
}
