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
    public function index()
    {
        $baloks = new DataCollection(Balok::paginate(10));
        return Inertia::render('Input/Balok',['baloks'=>$baloks]);
    }

    public function create()
    {
        $expanders = Expander::all();
        return Inertia::render('Input/Balok/Create',['expanders'=>$expanders]);
    }

    public function store(Request $request)
    {
        $request->validate([
        ]);
        Balok::create($request->all());
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
            $expanders = Expander::all();
    
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
