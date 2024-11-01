<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => ['required'],
            "description" => ['required', 'string'],
            "quantity"=> ['required', "integer"],
            "waste_percentage"=> ['required'],
            "labour_percentage" => ['required'],
            "equipment_cost" => ['required'],
            "other_percentage"=> ['required'],
            "margin_percentage"=> ['required'],
        ];
    }
}
