<?php

use App\Http\Controllers\BalokController;
use App\Http\Controllers\ExpanderController;
use App\Http\Controllers\InjectController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RekapBalokController;
use App\Http\Controllers\RekapInjectController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect('/input/expanders/');
});

Route::get('/dashboard', function () {
    return redirect('/input/expanders/');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::prefix('users')->middleware(['auth','verified', 'admin'])->group(function(){
    Route::get('/',[UserController::class,'index'])->name('userss.get');
    Route::delete('/{id}',[UserController::class,'delete'])->name('userss.delete');
    Route::put('/{id}',[UserController::class,'activate'])->name('userss.put');
});

Route::prefix('products')->middleware(['auth','verified'])->group(function(){
    Route::get('/',[ProductController::class,'get'])->name('product.get');
    Route::post('/',[ProductController::class,'importFile'])->name('product.post');
    Route::delete('/{id}',[ProductController::class,'delete'])->name('product.delete');
    Route::get('edit/{id}',[ProductController::class,'edit'])->name('product.edit');
    Route::put('edit/{id}',[ProductController::class,'update'])->name('product.update');
});



Route::prefix('input')->middleware(['auth', 'verified'])->name('dashboard')->group(function(){
    Route::prefix('expanders')->group(function () {
        Route::get('/create', [ExpanderController::class, 'create'])->name('expanders.create');
        Route::post('/create', [ExpanderController::class, 'store'])->name('expanders.store');
        Route::get('/edit/{id}', [ExpanderController::class, 'edit'])->name('expanders.edit');
        Route::put('/edit/{id}', [ExpanderController::class, 'update'])->name('expanders.update');
        Route::delete('/{id}', [ExpanderController::class, 'destroy'])->name('expanders.destroy');
        Route::get('/',[ExpanderController::class,'index'])->name('expanders.index');
    });
    Route::prefix('injects')->group(function () {
        Route::get('/',[InjectController::class,'index'])->name('inject.index');
        Route::get('/create',[InjectController::class,'create'])->name('inject.create');
        Route::post('/create',[InjectController::class,'store'])->name('inject.store');
        Route::get('/edit/{inject}',[InjectController::class,'edit'])->name('inject.edit');
        Route::put('/edit/{inject}',[InjectController::class,'update'])->name('inject.update');
        Route::delete('/{inject}',[InjectController::class,'destroy'])->name('inject.destroy');
    });
    Route::prefix('baloks')->group(function () {
        Route::get('/',[BalokController::class,'index'])->name('balok.index');
        Route::get('/create',[BalokController::class,'create'])->name('balok.create');
        Route::post('/create',[BalokController::class,'store'])->name('balok.store');
        Route::delete('/{baloks}',[BalokController::class,'destroy'])->name('balok.destroy');
        Route::get('/edit/{baloks}',[BalokController::class,'edit'])->name('balok.edit');
        Route::put('/edit/{baloks}',[BalokController::class,'update'])->name('balok.update');
    });
});

Route::prefix('rekap')->middleware(['auth', 'verified'])->name('dashboard')->group(function(){
    Route::prefix('baloks')->group(function () {
        Route::get('/',[RekapBalokController::class,'index'])->name('rekap.balok.index');
        Route::get('/detail/{id}',[RekapBalokController::class,'detail'])->name('rekap.balok.detail');
    });
    Route::prefix('injects')->group(function () {
        Route::get('/',[RekapInjectController::class,'index'])->name('rekap.inject.index');
        Route::get('/detail/{id}',[RekapInjectController::class,'detail'])->name('rekap.inject.detail');
    });
   
});



require __DIR__.'/auth.php';
