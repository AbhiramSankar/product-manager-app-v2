<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->integer("revision");
            $table->string("name");
            $table->longText("description");
            $table->integer("quantity");
            $table->integer("material_items");
            $table->float('material_cost');
            $table->float('waste_percentage');
            $table->float('waste_amount');
            $table->float('labour_percentage');
            $table->float('labour_amount');
            $table->float('equipment_cost');
            $table->float('other_percentage');
            $table->float('other_amount');
            $table->float('margin_percentage');
            $table->float('margin_amount');
            $table->float('sub_total');
            $table->float('amount');
            $table->tinyInteger('delete');
            $table->foreignId('created_by')->constrained('users');
            $table->foreignId('updated_by')->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
