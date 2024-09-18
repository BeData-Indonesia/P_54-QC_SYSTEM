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
        
        
        $expanders = Expander::where('material_type','balok')->get();
        return Inertia::render('Input/Balok/Create',['expanders'=>$expanders]);
    }

    public function store(Request $request)
    {
        // Validasi input request
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
            'type.exists' => 'Type tidak valid.',
            'date.required' => 'Tanggal wajib diisi.',
            'date.date' => 'Tanggal harus berupa tanggal yang valid.',
        ]);
    
        try {
            // Mulai transaksi database
            DB::beginTransaction();
    
            // Hitung total berat balok
            $totalBalokWeight = $request->jumlah_balok * $request->berat_kg;
    
            // Ambil sisa berat expander saat ini
            $currentWeightExpander = Expander::where('no_expander', $request->type)
                ->value('remaining_weight');
    
            // Hitung berat expander baru setelah dikurangi berat balok
            $newWeightExpander = $currentWeightExpander - $totalBalokWeight;
    
            // Buat data balok baru
            Balok::create($validatedRequest);
    
            // Update sisa berat expander
            Expander::where('no_expander', $request->type)
                ->update(['remaining_weight' => $newWeightExpander]);
    
            // Commit transaksi database
            DB::commit();
    
            // Redirect dengan pesan sukses
            return redirect('/input/baloks')->with([
                'message' => 'Berhasil create balok',
                'success' => true
            ]);
    
        } catch (\Exception $e) {
            // Rollback jika terjadi error
            DB::rollBack();
    
            // Bisa tambahkan error handling disini jika diperlukan
            return redirect()->back()->withErrors(['error' => 'Terjadi kesalahan saat menyimpan data.']);
        }
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
        $expanders = Expander::where('material_type','balok')->get();
    
            return Inertia::render('Input/Balok/Edit',['balok'=>$balok,'expanders'=>$expanders]);
            } catch (\Throwable $th) {
                return redirect()->with(['message'=> 'Gagal menuju halaman edit balok', 'success'=>false]);
            }   
    }

    public function update(Request $request)
    {

        $fullPath = $request->path();
        $segments = explode('/', $fullPath);
        $lastSegment = end($segments);
        $id = $lastSegment;
        $balok = Balok::find($id);
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
            'type.exists' => 'Type tidak valid.',
            'date.required' => 'Tanggal wajib diisi.',
            'date.date' => 'Tanggal harus berupa tanggal yang valid.',
        ]);
  


        try {
            DB::beginTransaction();
    
            // Current state (before the update)
            $currentQuantity = $balok->jumlah_balok;
            $currentBalokWeight = $balok->berat_kg;
            $currentTotalBerat = ( $currentQuantity) * $currentBalokWeight;
    
            // New state (after the update)
           
            $newBalokWeight = $validatedRequest['berat_kg'];
            $newQuantity = $validatedRequest['jumlah_balok'];
            $newTotalBerat = ($newQuantity) * $newBalokWeight;
    
            // Update remaining weight in the Expander model
            $expander = Expander::where('no_expander', $balok->type)->firstOrFail();
           

            $newRemainWeight = $expander->remaining_weight + $currentTotalBerat - $newTotalBerat;
            if($newRemainWeight < 0){
               throw new \Exception("Balok melebihi expander");
            }
            $expander->update([
                'remaining_weight' => $newRemainWeight
            ]);
    
            // Update Inject data
            $balok->update($validatedRequest);
    
            DB::commit();
    
            return redirect('/input/baloks')->with([
                'message' => 'Berhasil update Balok',
                'success' => true
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();
    
            return redirect('/input/baloks')->with([
                'message' => $th->getMessage() ?? 'Gagal update balok',
                'success' => false
            ]);
        }
        
    }

    public function destroy(Request $request)
    {
        // Get the full path from the request and extract the last segment
        $id = basename($request->path());
    
        $balok = Balok::select('jumlah_balok', 'berat_kg', 'type')
                        ->where('no_balok', $id)
                        ->firstOrFail();
    
        DB::beginTransaction();
    
        try {
            // Fetch data from the Inject model
            $balokQuantity = $balok->jumlah_balok;
            $weightBalok = $balok->berat_kg;
            $noExpander = $balok->type;
    
            // Calculate total weight and get remaining weight for the expander
            $totalWeight = ($balokQuantity ) * $weightBalok;
            $remainWeightExpander = Expander::where('no_expander', $noExpander)
                                            ->value('remaining_weight');
    
            // Update the expander's remaining weight and delete the inject record
            Balok::destroy($id);
            Expander::where('no_expander', $noExpander)
                    ->update(['remaining_weight' => $remainWeightExpander + $totalWeight]);
    
            DB::commit();
    
            return redirect()->with([
                'message' => 'Berhasil delete balok',
                'success' => true
            ]);
        } catch (\Exception $e) {
            // Rollback the transaction if an error occurs
            DB::rollBack();
    
            return redirect('/input/baloks')->with([
                'message' => $e->getMessage(),
                'success' => false
            ]);
        }
    }
}
