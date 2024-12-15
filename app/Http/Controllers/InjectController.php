<?php

namespace App\Http\Controllers;

use App\Http\Resources\DataCollection;
use App\Models\Expander;
use App\Models\Inject;
use Error;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use PhpParser\Node\Stmt\TryCatch;
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
        $expanders = Expander::where('material_type','inject')->get();
        return Inertia::render('Input/Inject/Create',['expanders'=>$expanders]);
    }

    public function store(Request $request)
    {
        // Validasi input dari request
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

        // Memulai transaksi database
        DB::beginTransaction();
        
        // Mengambil data dari request
        $totalSuccessProduct = $request->input('bagus');
        $totalFailProduct = $request->input('rusak');
        $beratKering = $request->input('berat_kering');
        $noExpander = $request->input('type');
        
        // Menghitung total berat
        $totalWeight = ($totalSuccessProduct + $totalFailProduct) * $beratKering;
        
        // Mendapatkan sisa berat expander dari database
        $remainWeightExpander = Expander::where("no_expander", $noExpander)->value('remaining_weight');
        
        try {
            // Mengecek apakah total berat melebihi sisa berat expander
            if ($totalWeight >= $remainWeightExpander) {
                throw new \Exception('Inject melebihi expander');
            }
            
            // Menyimpan data inject jika total berat tidak melebihi sisa berat expander
            Inject::create($validateReq);
            Expander::where('no_expander', $noExpander)->update(['remaining_weight' => $remainWeightExpander - $totalWeight]);
            
            // Menyelesaikan transaksi
            DB::commit();
            
            return redirect('/input/injects')->with([
                'message' => 'Berhasil create inject',
                'success' => true
            ]);
        } catch (\Exception $e) {
            // Membatalkan transaksi jika terjadi kesalahan
            DB::rollBack();
            
            return redirect('/input/injects')->with([
                'message' => $e->getMessage(),
                'success' => false
            ]);
        }
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
            $expanders = Expander::where('material_type','inject')->get();
            
            return Inertia::render('Input/Inject/Edit',['inject'=>$inject,'expanders'=>$expanders]);
            } catch (\Throwable $th) {
                return redirect('/input/injects')->with(['message'=> 'Gagal menuju halam edit expander', 'success'=>false]);
            }   
    }

    public function update(Request $request, Inject $inject)
    {
        $validatedData = $request->validate([
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
    
        try {
            DB::beginTransaction();
    
            // Current state (before the update)
            $currentBagus = $inject->bagus;
            $currentRusak = $inject->rusak;
            $currentBeratKering = $inject->berat_kering;
            $currentTotalBerat = ($currentBagus + $currentRusak) * $currentBeratKering;
    
            // New state (after the update)
            $newBagus = $validatedData['bagus'];
            $newRusak = $validatedData['rusak'];
            $newBeratKering = $validatedData['berat_kering'];
            $newTotalBerat = ($newBagus + $newRusak) * $newBeratKering;
    
            // Update remaining weight in the Expander model
            $expander = Expander::where('no_expander', $inject->type)->firstOrFail();
            // dd(['c'=>$currentTotalBerat,'n'=>$newTotalBerat,''=>$expander->remaining_weight]);

            $newRemainWeight = $expander->remaining_weight + $currentTotalBerat - $newTotalBerat;
            if($newRemainWeight < 0){
               throw new \Exception("Inject melebihi expander");
            }
            $expander->update([
                'remaining_weight' => $newRemainWeight
            ]);
    
            // Update Inject data
            $inject->update($validatedData);
    
            DB::commit();
    
            return redirect('/input/injects')->with([
                'message' => 'Berhasil update inject',
                'success' => true
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();
    
            return redirect('/input/injects')->with([
                'message' => $th->getMessage() ?? 'Gagal update inject',
                'success' => false
            ]);
        }
    }
    

    public function destroy(Request $request)
    {
        // Get the full path from the request and extract the last segment
        $id = basename($request->path());
    
        $inject = Inject::select('bagus', 'rusak', 'berat_kering', 'type')
                        ->where('no_inject', $id)
                        ->firstOrFail();
    
        DB::beginTransaction();
    
        try {
            // Fetch data from the Inject model
            $totalSuccessProduct = $inject->bagus;
            $totalFailProduct = $inject->rusak;
            $beratKering = $inject->berat_kering;
            $noExpander = $inject->type;
    
            // Calculate total weight and get remaining weight for the expander
            $totalWeight = ($totalSuccessProduct + $totalFailProduct) * $beratKering;
            $remainWeightExpander = Expander::where('no_expander', $noExpander)
                                            ->value('remaining_weight');
    
            // Update the expander's remaining weight and delete the inject record
            Inject::destroy($id);
            Expander::where('no_expander', $noExpander)
                    ->update(['remaining_weight' => $remainWeightExpander + $totalWeight]);
    
            DB::commit();
    
            return redirect()->with([
                'message' => 'Berhasil delete inject',
                'success' => true
            ]);
        } catch (\Exception $e) {
            // Rollback the transaction if an error occurs
            DB::rollBack();
    
            return redirect('/input/injects')->with([
                'message' => $e->getMessage(),
                'success' => false
            ]);
        }
    }
}
