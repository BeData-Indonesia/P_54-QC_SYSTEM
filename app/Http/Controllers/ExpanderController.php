<?php

namespace App\Http\Controllers;

use App\Http\Resources\DataCollection;
use Illuminate\Http\Request;
use App\Models\Expander;
use Inertia\Inertia;

class ExpanderController extends Controller
{
    public function index()
    {
        $expanders = new DataCollection(Expander::paginate(10));
        return Inertia::render('Input/Expander',['expanders'=>$expanders]);
    }

    public function create()
    {
        return Inertia::render('Input/Expander/Create');
    }

    public function store(Request $request)
    {
        $kodeBahan = $request->input('kode_bahan');
        if (Expander::where('kode_bahan', $kodeBahan)->exists()) {
            return redirect('/input/expanders/create')->with([
                'message' => 'Expander tidak berhasil ditambahkan!',
                'success' => false,
            ]);
        } 
        
        Expander::create($request->all());
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

        $expander = Expander::find($id);

        return Inertia::render('Input/Expander/Edit',['data'=>$expander]);
        } catch (\Throwable $th) {
            return redirect()->with(['message'=> 'Gagal menuju halam edit expander', 'success'=>false]);
        }   
        
    }

    public function update(Request $request, Expander $expander)
    {
        $request->validate([
            // Sesuaikan aturan validasi sesuai kebutuhan
        ]);

        try {
        $fullPath = $request->path();
        $segments = explode('/', $fullPath);
        $lastSegment = end($segments);
        $id = $lastSegment;

        $expander = Expander::find($id);
        
        $expander->update($request->all());
        
        return redirect('/input/expanders')->with(['message'=> 'Berhasil update expander', 'success'=>true]);
        } catch (\Throwable $th) {
            return redirect()->with(['message'=> 'Gagal edit expander', 'success'=>false]);
        }   
    }

    public function destroy(Request $request,Expander $expander)
    {
         $fullPath = $request->path();
         $segments = explode('/', $fullPath);
         $lastSegment = end($segments);
         $id = $lastSegment;
         $expander->delete($id);

        return redirect('/input/expanders/')
                         ->with('success', 'Expander berhasil dihapus!');
    }
}
