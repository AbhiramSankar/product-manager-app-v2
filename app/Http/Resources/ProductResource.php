<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'quantity' => $this->quantity,
            'material_items' => $this->material_items,
            'material_cost' => $this->material_cost,
            'waste_percentage' => $this->waste_percentage,
            'waste_amount' => $this->waste_amount,
            'labour_percentage' => $this->labour_percentage,
            'labour_amount' => $this->labour_amount,
            'equipment_cost' => $this->equipment_cost,
            'other_percentage' => $this->other_percentage,
            'other_amount' => $this->other_amount,
            'margin_percentage' => $this->margin_percentage,
            'margin_amount' => $this->margin_amount,
            'sub_total' => $this->sub_total,
            'amount' => $this->amount,
            'createdBy' => new UserResource($this->createdBy),
            'updatedBy' => new UserResource($this->updatedBy),
        ];
    }
}
