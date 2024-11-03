<?php

namespace App\Http\Controllers;

use App\Http\Resources\DataCollection;
use Illuminate\Http\Request;
use App\Models\Expander;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ExpanderController extends Controller
{
    public function index(Request $request)
    {

        $search = $request->input('search');
        $expandersQuery = Expander::query();
        if ($request->has('bulan') && is_numeric($request->input('bulan')) && $request->input('bulan') >= 1 && $request->input('bulan') <= 12) {
            $bulan = $request->input('bulan');
            $expandersQuery->whereMonth('date', $bulan);
        }
    
  
        if ($request->has('tahun') && is_numeric($request->input('tahun'))) {
            $tahun = $request->input('tahun');
            $expandersQuery->whereYear('date', $tahun);
        }
        if ($search) {
            $expandersQuery->where(function($query) use ($search) {
            $query->where('product', 'like', '%' . $search . '%')
                ->orWhere('material_code', 'like', '%' . $search . '%')
                ->orWhere('description', 'like', '%' . $search . '%'); 
            });
        }

        $expanders = new DataCollection($expandersQuery->paginate(10));
        return Inertia::render('Input/Expander',['expanders'=>$expanders]);
    }

    public function create()
    {
        $products= Product::get();
        return Inertia::render('Input/Expander/Create/',['products'=>$products]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'material_code' => 'required|string|unique:expander,material_code|max:23',
            'shift' => 'required|integer',
            'weight' => 'required|numeric',
            'silo_code' => 'required|integer',
            'product' => 'required|string|max:50',
            'material_type' => 'required|string',
            'density' => 'required|numeric',
            'description' => 'nullable|string',
            'date' => 'required|date',
        ], [
            'material_code.required' => 'Kode bahan wajib diisi.',
            'material_code.unique' => 'Kode bahan sudah ada.',
            'shift.required' => 'Shift wajib diisi.',
            'shift.integer' => 'Shift harus berupa angka.',
            'weight.required' => 'Banyak kg wajib diisi.',
            'weight.numeric' => 'Banyak kg harus berupa angka.',
            'silo_code.required' => 'No silo wajib diisi.',
            'silo_code.integer' => 'No silo harus berupa angka.',
            'product.required' => 'Untuk produk wajib diisi.',
            'product.string' => 'Untuk produk harus berupa teks.',
            'material_type.required' => 'Jenis bahan wajib diisi.',
            'density.required' => 'Density wajib diisi.',
            'density.numeric' => 'Density harus berupa angka.',
            'date.required' => 'Tanggal wajib diisi.',
            'date.date' => 'Tanggal harus berupa tanggal yang valid.',
        ]);

        $kodeBahan = $request->input('material_code');

        if (Expander::where('material_code', $kodeBahan)->exists()) {
            return redirect('/input/expanders/create')->with([
                'message' => 'Expander tidak berhasil ditambahkan!',
                'success' => false,
            ]);
        }
        
        $validatedData['remaining_weight'] = $request->input('weight', 0);
        // dd($validatedData);
        
        Expander::create($validatedData);
        return redirect('/input/expanders/')->with(['message'=> 'Expander berhasil ditambahkan!', 'success'=>true]);
        
    }

    public function show(Expander $expander)
    {
        return view('expander.show', compact('expander'));
    }

    public function edit(Request $request, Expander $expander)
    {
        try {
            // Get the full path and extract the last segment (ID)
            $id = $request->segment(count($request->segments()));

            // Retrieve expander and product data
            $expander = Expander::where('no_expander', $id)->firstOrFail();
            $products = Product::all();

            // Render the edit page with the retrieved data
            return Inertia::render('Input/Expander/Edit', [
                'data' => $expander,
                'products' => $products
            ]);
        } catch (\Throwable $th) {
            // Handle the exception and redirect with an error message
            return redirect()->back()->with([
                'message' => 'Gagal menuju halaman edit expander',
                'success' => false
            ]);
        }
    }

    public function update(Request $request)
    {
        // Validasi data yang diterima dari request
        $validatedData = $request->validate([
            'shift' => 'required|integer',
            'weight' => 'required|numeric',
            'silo_code' => 'required|integer',
            'product' => 'required|string|max:50',
            'density' => 'required|numeric',
            'description' => 'nullable|string',
            'material_type' => 'required|string',
            'date' => 'required|date',
        ], [
            'shift.required' => 'Shift wajib diisi.',
            'shift.integer' => 'Shift harus berupa angka.',
            'weight.required' => 'Banyak kg wajib diisi.',
            'weight.numeric' => 'Banyak kg harus berupa angka.',
            'silo_code.required' => 'No silo wajib diisi.',
            'silo_code.integer' => 'No silo harus berupa angka.',
            'product.required' => 'Untuk produk wajib diisi.',
            'product.string' => 'Untuk produk harus berupa teks.',
            'density.required' => 'Density wajib diisi.',
            'density.numeric' => 'Density harus berupa angka.',
            'material_type.required' => 'Jenis bahan wajib diisi.',
            'date.required' => 'Tanggal wajib diisi.',
            'date.date' => 'Tanggal harus berupa tanggal yang valid.',
        ]);
    
        // Mendapatkan ID dari URL
        $id = $request->segment(count($request->segments()));
    
        try {
            DB::beginTransaction();
    
            // Mengambil data expander berdasarkan no_expander
            $expander = Expander::where('no_expander', $id)->firstOrFail();
    
            $currentWeight = $expander['weight'];
            $newWeight = $validatedData['weight'];
            $currentRemainWeight = $expander['remaining_weight'];
            
            // Menghitung berat sisa baru
            $newRemainWeight = $newWeight - ($currentWeight - $currentRemainWeight);
    
            // Validasi apakah remaining_weight negatif
            if ($newRemainWeight < 0) {
                throw new \Exception('Expander kurang dari produk');
            }
    
            // Menambahkan remaining_weight ke data yang telah divalidasi
            $validatedData['remaining_weight'] = $newRemainWeight;
    
            // Update expander
            $expander->update($validatedData);
    
            DB::commit();
            return redirect('/input/expanders/')->with([
                'message' => 'Berhasil update expander', 
                'success' => true
            ]);
    
        } catch (\Throwable $th) {
            DB::rollback();
            return redirect('/input/expanders')->with([
                'message' => $th->getMessage() ?? 'Gagal edit expander', 
                'success' => false
            ]);
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
