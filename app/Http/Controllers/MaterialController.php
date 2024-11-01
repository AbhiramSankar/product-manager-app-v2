<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Material;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreMaterialRequest;
use App\Http\Requests\UpdateMaterialRequest;

class MaterialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $id = $request->input('product_id');
        return  inertia("Materials/Create", [
            "product_id" => $id
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMaterialRequest $request)
    {
        $data = $request->validated();
        $data["revision"] = 0;
        $data["amount"] = $data["rate"] * $data["quantity"];
        $data["delete"] = 0;
        $data["created_by"] = Auth::id();
        $data["updated_by"] = Auth::id();

        Material::create($data);
        $this->updateProduct($data["product_id"]);
        return to_route('product.show', $data["product_id"])->with('success', 'Material was created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Material $material)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Material $material)
    {
        return  inertia("Materials/Edit", [
            'material' => $material
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMaterialRequest $request, Material $material)
    {
        $data = $request->validated();
        $data["revision"] = $material->revision + 1;
        $data["amount"] = $data["rate"] * $data["quantity"];
        $data["delete"] = 0;
        $data["created_by"] = Auth::id();
        $data["updated_by"] = Auth::id();
        
        $material->update($data);
        $this->updateProduct($data["product_id"]);
        return to_route('product.show', $data["product_id"])->with('success', 'Material was updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Material $material)
    {
        $material->delete = 1;
        $material->updated_by = Auth::id();
        $material->update();
        $this->updateProduct($material->product_id);
        return to_route('product.show', $material->product_id)->with('success', 'Material was deleted');
    }

    private function updateProduct($id) {
        $product = Product::query()->where('id', '=', $id)->first();
        $materials = Material::query()->where('product_id', '=', $product->id)->where('delete', '=', 0)->get();
        $m_cost = 0;
        foreach ($materials as $material) {
            $m_cost += $material->amount;
        }
        $w_amt = $m_cost * $product->waste_percentage/100;
        $l_amt = ($m_cost + $w_amt) * $product->labour_percentage/100;
        $e_cst = $product->equipment_cost;
        $o_amt = ($m_cost + $w_amt + $l_amt + $e_cst) * $product->other_percentage/100;
        $m_amt = ($m_cost + $w_amt + $l_amt + $e_cst + $o_amt) * $product->margin_percentage/100;
        $sub_total = $m_cost + $w_amt + $l_amt + $e_cst + $o_amt + $m_amt;
        $total = $sub_total * $product->quantity;

        $product->revision = $product->revision + 1;
        $product->material_items = $materials->count();
        $product->material_cost = $m_cost;
        $product->waste_amount = $w_amt;
        $product->labour_amount = $l_amt;
        $product->equipment_cost = $e_cst;
        $product->other_amount = $o_amt;
        $product->margin_amount = $m_amt;
        $product->sub_total = $sub_total;
        $product->amount = $total;
        $product->updated_by = Auth::id();

        $product->update();
    }
}
