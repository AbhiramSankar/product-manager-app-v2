<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Material;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Product::query()->where('delete', '=', 0);
        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        $products = $query->get();
        return inertia("Products/Index", [
            "products" => $products,
            'queryParams' => request()->query() ?: null,
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return  inertia("Products/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();
        $data["revision"] = 0;
        $data["material_items"] = 0;
        $data["material_cost"] = 0;
        $data["waste_amount"] = 0;
        $data["labour_amount"] = 0;
        $data["other_amount"] = 0;
        $data["margin_amount"] = 0;
        $data["sub_total"] = $data["equipment_cost"];
        $data["amount"] = $data["sub_total"] * $data["quantity"];
        $data["delete"] = 0;
        $data["created_by"] = Auth::id();
        $data["updated_by"] = Auth::id();
        
        Product::create($data);
        return to_route('product.index')->with('success', 'Product was created. Please add the Materials');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $materials = Material::query()->where('product_id', '=', $product->id)->where('delete', '=', 0)->get();
        return  inertia("Products/Product", [
            'product' => $product,
            'materials' => $materials,
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return  inertia("Products/Edit", [
            'product' => $product
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $data = $request->validated();
        $data["revision"] = $product->revision + 1;
        $data["material_items"] = $product->material_items;
        $data["material_cost"] = $product->material_cost;

        $m_cost = $data["material_cost"];
        $w_amt = $m_cost * $product->waste_percentage/100;
        $l_amt = ($m_cost + $w_amt) * $product->labour_percentage/100;
        $e_cst = $product->equipment_cost;
        $o_amt = ($m_cost + $w_amt + $l_amt + $e_cst) * $product->other_percentage/100;
        $m_amt = ($m_cost + $w_amt + $l_amt + $e_cst + $o_amt) * $product->margin_percentage/100;
        $sub_total = $m_cost + $w_amt + $l_amt + $e_cst + $o_amt + $m_amt;
        $total = $sub_total * $product->quantity;

        $data["waste_amount"] = $w_amt;
        $data["labour_amount"] = $l_amt;
        $data["other_amount"] = $o_amt;
        $data["margin_amount"] = $m_amt;
        $data["sub_total"] = $data["margin_amount"] + $data["other_amount"] + $data["equipment_cost"] + + $data["labour_amount"] + + $data["material_cost"] + $data["waste_amount"];
        $data["amount"] = $data["sub_total"] * $data["quantity"];
        $data["delete"] = 0;
        $data["created_by"] = $product->created_by;
        $data["updated_by"] = Auth::id();

        $product->update($data);
        return to_route('product.index')->with('success', 'Product was updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        // $data["name"] = $product->name;
        // $data["description"] = $product->description;
        // $data["quantity"]= $product->quantity;
        // $data["waste_percentage"]= $product->waste_percentage;
        // $data["labour_percentage"] = $product->labour_percentage;
        // $data["equipment_cost"] = $product->equipment_cost;
        // $data["other_percentage"] = $product->other_percentage;
        // $data["margin_percentage"] = $product->margin_percentage;
        // $data["revision"] = $product->revision;
        // $data["material_items"] = $product->material_items;
        // $data["material_cost"] = $product->material_cost;
        // $data["waste_amount"] = $product->waste_amount;
        // $data["labour_amount"] = $product->labour_amount;
        // $data["other_amount"] = $product->other_amount;
        // $data["margin_amount"] = $product->margin_amount;
        // $data["sub_total"] = $product->sub_total;
        // $data["amount"] = $product->amount;
        // $data["delete"] = 1;
        // $data["created_by"] = $product->created_by;
        // $data["updated_by"] = Auth::id();
        $product->delete = 1;
        $product->updated_by = Auth::id();
        // dd($data);
        $product->update();
        return to_route('product.index')->with('success', 'Product was deleted');
    }
}
