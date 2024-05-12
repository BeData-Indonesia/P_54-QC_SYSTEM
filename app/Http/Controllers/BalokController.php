<?php

namespace App\Http\Controllers;

use App\Models\Balok;
use App\Models\Expander;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BalokController extends Controller
{
    public function index()
    {
        // Mengambil semua data expander
        $expanders = Balok::all();
        
        // Mengirim data expander ke view index
        // return 
        return Inertia::render('/resources/js/Pages/Inject/Expander/index.js');
    }

    public function create()
    {
        // Mengirimkan view untuk membuat expander baru
        return view('expander.create');
    }

    public function store(Request $request)
    {
        // Validasi data yang dikirim dari form
        $request->validate([
            // Sesuaikan aturan validasi sesuai kebutuhan
        ]);

        // Membuat expander baru berdasarkan data yang dikirim dari form
        Balok::create($request->all());

        // Redirect ke halaman index dengan pesan sukses
        return redirect()->route('expander.index')
                         ->with('success', 'Expander berhasil ditambahkan!');
    }

    public function show(Balok $expander)
    {
        // Mengirim data expander yang dipilih ke view show
        return view('expander.show', compact('expander'));
    }

    public function edit(Balok $expander)
    {
        // Mengirim data expander yang dipilih ke view edit
        return view('expander.edit', compact('expander'));
    }

    public function update(Request $request, Balok $expander)
    {
        // Validasi data yang dikirim dari form
        $request->validate([
            // Sesuaikan aturan validasi sesuai kebutuhan
        ]);

        // Update data expander berdasarkan data yang dikirim dari form
        $expander->update($request->all());

        // Redirect ke halaman index dengan pesan sukses
        return redirect()->route('expander.index')
                         ->with('success', 'Expander berhasil diperbarui!');
    }

    public function destroy(Balok $expander)
    {
        // Hapus data expander
        $expander->delete();

        // Redirect ke halaman index dengan pesan sukses
        return redirect()->route('expander.index')
                         ->with('success', 'Expander berhasil dihapus!');
    }
}
