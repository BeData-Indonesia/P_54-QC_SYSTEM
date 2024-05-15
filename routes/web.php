<?php

use App\Http\Controllers\BalokController;
use App\Http\Controllers\ExpanderController;
use App\Http\Controllers\InjectController;
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
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return redirect('/input/expanders/');
})->middleware(['auth', 'verified'])->name('dashboard');





Route::prefix('input')->middleware(['auth', 'verified'])->name('dashboard')->group(function(){
    Route::prefix('expanders')->group(function () {
        Route::get('/',[ExpanderController::class,'index'])->name('expanders.index');
        Route::get('/create', [ExpanderController::class, 'create'])->name('expanders.create');
        Route::get('/edit/{expander}', [ExpanderController::class, 'edit'])->name('expanders.edit');
        Route::put('/edit/{expander}', [ExpanderController::class, 'update'])->name('expanders.update');
        Route::post('/create', [ExpanderController::class, 'store'])->name('expanders.store');
        Route::delete('/{expander}', [ExpanderController::class, 'destroy'])->name('expanders.destroy');
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



require __DIR__.'/auth.php';
