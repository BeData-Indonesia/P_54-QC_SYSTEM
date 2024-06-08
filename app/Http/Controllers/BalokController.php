<?php

namespace App\Http\Controllers;

use App\Http\Resources\DataCollection;
use App\Models\Balok;
use App\Models\Expander;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Throwable;

class BalokController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $balokQuery = Balok::query();

        if ($request->has('bulan') && is_numeric($request->input('bulan')) && $request->input('bulan') >= 1 && $request->input('bulan') <= 12) {
            $bulan = $request->input('bulan');
            $balokQuery->whereMonth('date', $bulan);
        }
    
  
        if ($request->has('tahun') && is_numeric($request->input('tahun'))) {
            $tahun = $request->input('tahun');
            $balokQuery->whereYear('date', $tahun);
        }
    
        if ($search) {
            $balokQuery = $balokQuery->whereHas('expander', function ($query) use ($search) {
                $query->where('untuk_produk', 'like', '%' . $search . '%')
                ->orWhere('kode_bahan', 'like', '%' . $search . '%');
            });
        }

        $baloks = new DataCollection($balokQuery->with('expander')->paginate(10));
        return Inertia::render('Input/Balok',['baloks'=>$baloks]);
    }

    public function create()
    {
        
        
        $expanders = Expander::where('jenis_bahan','balok')->get();
        return Inertia::render('Input/Balok/Create',['expanders'=>$expanders]);
    }

    public function store(Request $request)
    {
       
        $validatedRequest = $request->validate([
            'density' => 'required|numeric',
            'jumlah_balok' => 'required|integer',
            'berat_kg' => 'required|numeric',
            'keterangan' => 'nullable|string',
            'type' => 'required|exists:expander,no_expander',
            'date' => 'required|date',
        ], [
            'density.required' => 'Density wajib diisi.',
            'density.numeric' => 'Density harus berupa angka.',
            'jumlah_balok.required' => 'Jumlah balok wajib diisi.',
            'jumlah_balok.integer' => 'Jumlah balok harus berupa angka.',
            'berat_kg.required' => 'Berat kg wajib diisi.',
            'berat_kg.numeric' => 'Berat kg harus berupa angka.',
            'keterangan.string' => 'Keterangan harus berupa teks.',
            'type.required' => 'Type wajib diisi.',
            'type.integer' => 'Type harus berupa angka.',
            'type.exists' => 'Type tidak valid.',
            'date.required' => 'Tanggal wajib diisi.',
            'date.date' => 'Tanggal harus berupa tanggal yang valid.',
        ]);
        Balok::create($validatedRequest);
        return redirect('/input/baloks')->with(['message'=> 'Berhasil create balok', 'success'=>true]);
    }

    public function show(Balok $expander)
    {
  
        return view('expander.show', compact('expander'));
    }

    public function edit(Request $request)
    {
        try {
            $fullPath = $request->path();
            $segments = explode('/', $fullPath);
            $lastSegment = end($segments);
            $id = $lastSegment;
    
            $balok = Balok::find($id);
            $expanders = Expander::where('jenis_bahan','balok')->get();
    
            return Inertia::render('Input/Balok/Edit',['balok'=>$balok,'expanders'=>$expanders]);
            } catch (\Throwable $th) {
                return redirect()->with(['message'=> 'Gagal menuju halaman edit balok', 'success'=>false]);
            }   
    }

    public function update(Request $request)
    {
        try{
        $fullPath = $request->path();
        $segments = explode('/', $fullPath);
        $lastSegment = end($segments);
        $id = $lastSegment;
        $balok = Balok::find($id);
        $balok->update($request->all());
        return redirect('/input/baloks')->with(['message'=> 'Berhasil update expander', 'success'=>true]);
        } catch (\Throwable $th) {
            return redirect()->with(['message'=> 'Gagal edit expander', 'success'=>false]);
        }   
    }

    public function destroy(Request $request)
    {
        try{
            $fullPath = $request->path();
            $segments = explode('/', $fullPath);
            $lastSegment = end($segments);
            $id = $lastSegment;
            DB::table('balok')->where('no_balok', $id)->delete();
            return redirect('/input/baloks/')->with(['message'=> 'Sukses hapus baloks', 'success'=>true]);
        }catch(Throwable $th){
            dd($th);
            return redirect('/input/baloks/')->with(['message'=> 'Gagal hapus baloks', 'success'=>false]);
        }
    }
}
