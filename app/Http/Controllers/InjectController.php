<?php

namespace App\Http\Controllers;

use App\Http\Resources\DataCollection;
use App\Models\Expander;
use App\Models\Inject;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Throwable;

class InjectController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $injectQuery = Inject::query();
        
        if ($request->has('bulan') && is_numeric($request->input('bulan')) && $request->input('bulan') >= 1 && $request->input('bulan') <= 12) {
            $bulan = $request->input('bulan');
            $injectQuery->whereMonth('date', $bulan);
        }
    
  
        if ($request->has('tahun') && is_numeric($request->input('tahun'))) {
            $tahun = $request->input('tahun');
            $injectQuery->whereYear('date', $tahun);
        }
        if ($search) {
            $injectQuery = $injectQuery->whereHas('expander', function ($query) use ($search) {
                $query->where('untuk_produk', 'like', '%' . $search . '%')
                ->orWhere('kode_bahan', 'like', '%' . $search . '%');
            });
        }

        $injects = new DataCollection($injectQuery->with('expander')->paginate(10));
    
        return Inertia::render('Input/Inject', ['injects' => $injects]);
    }
    

    public function create()
    {
        $expanders = Expander::where('jenis_bahan','inject')->get();
        return Inertia::render('Input/Inject/Create',['expanders'=>$expanders]);
    }

    public function store(Request $request)
    {
        $validateReq = $request->validate([
            'type' => 'required|integer|exists:expander,no_expander',
            'spasi' => 'required|integer',
           
            'bagus' => 'required|integer',
            'rusak' => 'required|integer',
            'cycle_time' => 'required|integer',
            'aging_time' => 'required|integer',
            'berat_kering' => 'required|numeric',
            'keterangan' => 'nullable|string',
            'date' => 'required|date',
        ], [
            'type.required' => 'Type wajib diisi.',
            'type.integer' => 'Type harus berupa angka.',
            'type.exists' => 'Type tidak valid.',
            'spasi.required' => 'Spasi wajib diisi.',
            'spasi.integer' => 'Spasi harus berupa angka.',
          
            'bagus.required' => 'Bagus wajib diisi.',
            'bagus.integer' => 'Bagus harus berupa angka.',
            'rusak.required' => 'Rusak wajib diisi.',
            'rusak.integer' => 'Rusak harus berupa angka.',
            'cycle_time.required' => 'Cycle time wajib diisi.',
            'cycle_time.integer' => 'Cycle time harus berupa angka.',
            'aging_time.required' => 'Aging time wajib diisi.',
            'aging_time.integer' => 'Aging time harus berupa angka.',
            'berat_kering.required' => 'Berat kering wajib diisi.',
            'berat_kering.numeric' => 'Berat kering harus berupa angka.',
            'keterangan.string' => 'Keterangan harus berupa teks.',
            'date.required' => 'Tanggal wajib diisi.',
            'date.date' => 'Tanggal harus berupa tanggal yang valid.',
        ]);
        
        Inject::create($validateReq);
        return redirect('/input/injects')->with(['message'=> 'Berhasil create inject', 'success'=>true]);
    }

    public function show(Inject $expander)
    {
        return view('expander.show', compact('expander'));
    }

    public function edit(Inject $inject, Request $request)
    {
        try {
            $fullPath = $request->path();
            $segments = explode('/', $fullPath);
            $lastSegment = end($segments);
            $id = $lastSegment;
    
            $inject = Inject::find($id);
            $expanders = Expander::where('jenis_bahan','inject')->get();
            return Inertia::render('Input/Inject/Edit/',['inject'=>$inject,'expanders'=>$expanders]);
            } catch (\Throwable $th) {
                return redirect()->with(['message'=> 'Gagal menuju halam edit expander', 'success'=>false]);
            }   
    }

    public function update(Request $request, Inject $inject)
    {
        try{
            $validateReq = $request->validate([
                'type' => 'required|integer|exists:expander,no_expander',
                'spasi' => 'required|integer',
               
                'bagus' => 'required|integer',
                'rusak' => 'required|integer',
                'cycle_time' => 'required|integer',
                'aging_time' => 'required|integer',
                'berat_kering' => 'required|numeric',
                'keterangan' => 'nullable|string',
                'date' => 'required|date',
            ], [
                'type.required' => 'Type wajib diisi.',
                'type.integer' => 'Type harus berupa angka.',
                'type.exists' => 'Type tidak valid.',
                'spasi.required' => 'Spasi wajib diisi.',
                'spasi.integer' => 'Spasi harus berupa angka.',
              
                'bagus.required' => 'Bagus wajib diisi.',
                'bagus.integer' => 'Bagus harus berupa angka.',
                'rusak.required' => 'Rusak wajib diisi.',
                'rusak.integer' => 'Rusak harus berupa angka.',
                'cycle_time.required' => 'Cycle time wajib diisi.',
                'cycle_time.integer' => 'Cycle time harus berupa angka.',
                'aging_time.required' => 'Aging time wajib diisi.',
                'aging_time.integer' => 'Aging time harus berupa angka.',
                'berat_kering.required' => 'Berat kering wajib diisi.',
                'berat_kering.numeric' => 'Berat kering harus berupa angka.',
                'keterangan.string' => 'Keterangan harus berupa teks.',
                'date.required' => 'Tanggal wajib diisi.',
                'date.date' => 'Tanggal harus berupa tanggal yang valid.',
            ]);
    
            $inject->update($validateReq);
    
            return redirect('/input/injects')->with(['message'=> 'Berhasil update inject', 'success'=>true]);
        }
        catch(Throwable $th){
            return   redirect('/input/injects')->with(['message'=> 'Gagal update inject', 'success'=>false]);
        }
        
    }

    public function destroy(Inject $inject,Request $request)
    {
        try{
            $fullPath = $request->path();
            $segments = explode('/', $fullPath);
            $lastSegment = end($segments);
            $id = $lastSegment;
            $inject->delete($id);
    
           return redirect('/input/injects/')
                            ->with(['message'=> 'Sukses hapus inject', 'success'=>true]);
        }catch(Throwable $th){
            return redirect('/input/injects/')
            ->with(['message'=> 'Gagal hapus inject', 'success'=>false]);
        }
       
    }
}
