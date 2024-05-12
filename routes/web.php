<?php

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




// Route::prefix('expanders')->middleware(['auth', 'verified'])->group(function () {
//     Route::get('/', [ExpanderController::class, 'index'])->name('expanders.index');
//     Route::get('/create', [ExpanderController::class, 'create'])->name('expanders.create');
//     Route::post('/', [ExpanderController::class, 'store'])->name('expanders.store');
    // Route::get('/{expander}', [ExpanderController::class, 'show'])->name('expanders.show');
    // Route::get('/{expander}/edit', [ExpanderController::class, 'edit'])->name('expanders.edit');
    // Route::put('/{expander}', [ExpanderController::class, 'update'])->name('expanders.update');
//     Route::delete('/{expander}', [ExpanderController::class, 'destroy'])->name('expanders.destroy');
// });


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
    });
});



require __DIR__.'/auth.php';
