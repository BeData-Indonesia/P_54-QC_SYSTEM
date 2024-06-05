<?php

namespace App\Http\Controllers;

use App\Models\Expander;
use App\Models\Inject;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RekapInjectController extends Controller
{
    public function index(Request $request)
        {
            $query = Expander::where('jenis_bahan', 'inject')->orderBy('date', 'desc')->with('injects');
            if ($request->has('bulan') && is_numeric($request->input('bulan')) && $request->input('bulan') >= 1 && $request->input('bulan') <= 12) {
                $bulan = $request->input('bulan');
                $query->whereMonth('date', $bulan);
            }
        
      
            if ($request->has('tahun') && is_numeric($request->input('tahun'))) {
                $tahun = $request->input('tahun');
                $query->whereYear('date', $tahun);
            }
        
    
            $rekapExpander = $query->get();

            function totalBeratExpanderInject(Collection $expanderCollection) {
                $totalBerat = 0;
                foreach ($expanderCollection as $expander) {                   
                        $totalBerat += $expander->banyak_kg;
                }
                return $totalBerat;
            }

            function totalBeratHasilInject (Collection $expanderCollection){
                $totalBerat = 0;
                foreach ($expanderCollection as $expander){
                    foreach($expander->injects as $injects){
                            $totalBerat += $injects->bagus*$injects->berat_kering;
                    };
                };
                return $totalBerat;
                }

            function getWasteProduksi ($bahan,$hasil){
                $waste = $bahan-$hasil;
                return $waste;
            }

            $beratExpanderInject = totalBeratExpanderInject($rekapExpander);
            $beratInjectTotal = totalBeratHasilInject($rekapExpander);
            $wasteProduksi = getWasteProduksi($beratExpanderInject,$beratInjectTotal);
            $wasteProductionPercent = 100;
            if($beratInjectTotal!=0){
                $wasteProductionPercent= $beratExpanderInject/$beratInjectTotal;
            }

            return Inertia::render('Rekap/Injects',['waste_production_percent'=> $wasteProductionPercent ,'rekap'=>$rekapExpander,'total_berat_expander'=>$beratExpanderInject,'total_berat_masak_inject'=>$beratInjectTotal,'waste_produksi'=>$wasteProduksi]);
            
        }
    
        public function detail(Request $request)
        {   $fullPath = $request->path();
            $segments = explode('/', $fullPath);
            $lastSegment = end($segments);
            $id = $lastSegment;


            $injects =  Inject::where('type', $id)->with('expander')->orderBy('date', 'desc')->get();
            $expander = Expander::where('no_expander',$id)->first();
            return Inertia::render('Rekap/Injects/Detail',['injects'=>$injects,
            'expander'=>$expander]);
        }
}
