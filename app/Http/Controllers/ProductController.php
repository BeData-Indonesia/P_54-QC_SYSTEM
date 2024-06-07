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
}