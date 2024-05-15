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
    public function index()
    {
        $injects = new DataCollection(Inject::paginate(10));

        return Inertia::render('Input/Inject',['injects'=>$injects]);
    }

    public function create()
    {
        $expanders = Expander::all();
        return Inertia::render('Input/Inject/Create',['expanders'=>$expanders]);
    }

    public function store(Request $request)
    {
        $request->validate([
        ]);
        Inject::create($request->all());
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
            $expanders = Expander::all();
    
            return Inertia::render('Input/Inject/Edit/',['inject'=>$inject,'expanders'=>$expanders]);
            } catch (\Throwable $th) {
                return redirect()->with(['message'=> 'Gagal menuju halam edit expander', 'success'=>false]);
            }   
    }

    public function update(Request $request, Inject $inject)
    {
        try{
            $request->validate([
               
            ]);
    
            $inject->update($request->all());
    
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
