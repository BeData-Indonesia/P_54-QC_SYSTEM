<?php

namespace App\Http\Controllers;

use App\Imports\ProductsImport;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class ProductController extends Controller{

    public function get(){

        $products  = Product::get();
        return Inertia::render('Product',["products"=>$products]);
    }

    public function importFile(Request $request){

        $request->validate([
            'file' => 'required|mimes:xls,xlsx'
        ]);

        Excel::import(new ProductsImport,  $request->file('file'));
        return redirect('/products')->with(['message'=> 'Berhasil import produk', 'success'=>true]);
    }
    public function edit($id)
    {
        $product = Product::findOrFail($id);
        return Inertia::render('Product/Edit', ['data' => $product]);
    }


    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $product = Product::findOrFail($id);
        $product->name = $request->name;
        $product->save();

        return redirect('/products')->with(['message' => 'Produk berhasil diperbarui', 'success' => true]);
    }

    public function delete($id)
    {
    $product = Product::findOrFail($id);  // Find the product by ID or fail if not found
    $product->delete();                  // Delete the product

    return redirect('/products')->with(['message' => 'Produk berhasil dihapus', 'success' => true]);
    }      
}