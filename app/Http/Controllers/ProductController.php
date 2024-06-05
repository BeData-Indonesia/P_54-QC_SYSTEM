<?php

namespace App\Http\Controllers;

use App\Models\Balok;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class ProductController extends Controller{

    public function get(){
        // return Excel::download(['tes','tes2'], 'users.xlsx');
        return Inertia::render('Product',[]);
    }

    // public function downloadTemplate(){

    // }
}