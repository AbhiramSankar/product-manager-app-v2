<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    protected $fillable = [
        'revision',
        'name',
        'description',
        "quantity",
        "material_items",
        "material_cost",
        "waste_percentage",
        "waste_amount",
        "labour_percentage",
        "labour_amount",
        "equipment_cost",
        "other_percentage",
        "other_amount",
        "margin_percentage",
        "margin_amount",
        "sub_total",
        "amount",
        "delete",
        "created_by",
        "updated_by",
    ];

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
