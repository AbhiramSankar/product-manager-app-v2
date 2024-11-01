<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    /** @use HasFactory<\Database\Factories\MaterialFactory> */
    use HasFactory;

    protected $fillable = [
        'revision',
        'product_id',
        'description',
        "quantity",
        "rate",
        "amount",
        "delete",
        "created_by",
        "updated_by",
    ];
}
