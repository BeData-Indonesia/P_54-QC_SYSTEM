<?php

namespace App\Http\Controllers;

use App\Http\Resources\DataCollection;
use Illuminate\Http\Request;
use App\Models\Expander;
use Inertia\Inertia;

class ExpanderController extends Controller
{
    public function index(Request $request)
    {

        $search = $request->input('search');
        $expandersQuery = Expander::query();

        if ($search) {
            $expandersQuery->where(function($query) use ($search) {
            $query->where('untuk_produk', 'like', '%' . $search . '%')
                ->orWhere('kode_bahan', 'like', '%' . $search . '%')
                ->orWhere('keterangan', 'like', '%' . $search . '%'); 
            });
        }

        $expanders = new DataCollection($expandersQuery->paginate(10));
        return Inertia::render('Input/Expander',['expanders'=>$expanders]);
    }

    public function create()
    {
        return Inertia::render('Input/Expander/Create/');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'kode_bahan' => 'required|string|unique:expander,kode_bahan|max:23',
            'shift' => 'required|integer',
            'banyak_kg' => 'required|numeric',
            'no_silo' => 'required|integer',
            'untuk_produk' => 'required|string|max:50',
            'berat_jenis' => 'required|numeric',
            'jenis_bahan' => 'required|string',
            'density' => 'required|numeric',
            'keterangan' => 'nullable|string',
            'date' => 'required|date',
        ], [
            'kode_bahan.required' => 'Kode bahan wajib diisi.',
            'kode_bahan.unique' => 'Kode bahan sudah ada.',
            'shift.required' => 'Shift wajib diisi.',
            'shift.integer' => 'Shift harus berupa angka.',
            'banyak_kg.required' => 'Banyak kg wajib diisi.',
            'banyak_kg.numeric' => 'Banyak kg harus berupa angka.',
            'no_silo.required' => 'No silo wajib diisi.',
            'no_silo.integer' => 'No silo harus berupa angka.',
            'untuk_produk.required' => 'Untuk produk wajib diisi.',
            'untuk_produk.string' => 'Untuk produk harus berupa teks.',
            'berat_jenis.required' => 'Berat jenis wajib diisi.',
            'berat_jenis.numeric' => 'Berat jenis harus berupa angka.',
            'jenis_bahan.required' => 'Jenis bahan wajib diisi.',
            'density.required' => 'Density wajib diisi.',
            'density.numeric' => 'Density harus berupa angka.',
            'date.required' => 'Tanggal wajib diisi.',
            'date.date' => 'Tanggal harus berupa tanggal yang valid.',
        ]);
        $kodeBahan = $request->input('kode_bahan');
        if (Expander::where('kode_bahan', $kodeBahan)->exists()) {
            return redirect('/input/expanders/create')->with([
                'message' => 'Expander tidak berhasil ditambahkan!',
                'success' => false,
            ]);
        } 
        
        Expander::create($validatedData);
        return redirect('/input/expanders/')->with(['message'=> 'Expander berhasil ditambahkan!', 'success'=>true]);
        
       
      
    }

    public function show(Expander $expander)
    {
        return view('expander.show', compact('expander'));
    }

    public function edit(Request $request,Expander $expander)
    {
      
        try {
        $fullPath = $request->path();
        $segments = explode('/', $fullPath);
        $lastSegment = end($segments);
        $id = $lastSegment;

        $expander = Expander::where('no_expander',$id)->first();
    

        return Inertia::render('Input/Expander/Edit',['data'=>$expander]);
        } catch (\Throwable $th) {
            return redirect()->with(['message'=> 'Gagal menuju halam edit expander', 'success'=>false]);
        }   
        
    }

    public function update(Request $request, Expander $expander)
    {     
        $validatedData = $request->validate([
            'shift' => 'required|integer',
            'banyak_kg' => 'required|numeric',
            'no_silo' => 'required|integer',
            'untuk_produk' => 'required|string|max:50',
            'berat_jenis' => 'required|numeric',
            'density' => 'required|numeric',
            'keterangan' => 'nullable|string',
            'jenis_bahan' => 'required|string',
            'date' => 'required|date',
        ], [
            'shift.required' => 'Shift wajib diisi.',
            'shift.integer' => 'Shift harus berupa angka.',
            'banyak_kg.required' => 'Banyak kg wajib diisi.',
            'banyak_kg.numeric' => 'Banyak kg harus berupa angka.',
            'no_silo.required' => 'No silo wajib diisi.',
            'no_silo.integer' => 'No silo harus berupa angka.',
            'untuk_produk.required' => 'Untuk produk wajib diisi.',
            'untuk_produk.string' => 'Untuk produk harus berupa teks.',
            'berat_jenis.required' => 'Berat jenis wajib diisi.',
            'berat_jenis.numeric' => 'Berat jenis harus berupa angka.',
            'density.required' => 'Density wajib diisi.',
            'jenis_bahan.required' => 'Jenis bahan wajib diisi.',
            'density.numeric' => 'Density harus berupa angka.',
            'date.required' => 'Tanggal wajib diisi.',
            'date.date' => 'Tanggal harus berupa tanggal yang valid.',
        ]);

        try {
        $fullPath = $request->path();
        $segments = explode('/', $fullPath);
        $lastSegment = end($segments);
        $id = $lastSegment;

        $expander = Expander::where('no_expander',$id)->first();
            

        $expander->update($validatedData);
        
        return redirect('/input/expanders/')->with(['message'=> 'Berhasil update expander', 'success'=>true]);
        } catch (\Throwable $th) {
            return redirect('/input/expanders')->with(['message'=> 'Gagal edit expander', 'success'=>false]);
        }   
    }

    public function destroy(Request $request)
    {
        $fullPath = $request->path();
        $segments = explode('/', $fullPath);
        $lastSegment = end($segments);
        $id = $lastSegment;
        $expander = Expander::where('no_expander',$id)->first();
        $expander->delete($id);

        return redirect('/input/expanders/')->with('success', 'Expander berhasil dihapus!');
    }
}
