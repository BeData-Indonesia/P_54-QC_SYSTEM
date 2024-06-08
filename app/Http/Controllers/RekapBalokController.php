<?php

namespace App\Http\Controllers;

use App\Models\Balok;
use App\Models\Expander;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RekapBalokController extends Controller
{
    
        public function index(Request $request)
        {
            $query = Expander::where('jenis_bahan', 'balok')->orderBy('date', 'desc')->with('baloks');


            if ($request->has('bulan') && is_numeric($request->input('bulan')) && $request->input('bulan') >= 1 && $request->input('bulan') <= 12) {
                $bulan = $request->input('bulan');
                $query->whereMonth('date', $bulan);
            }
        
      
            if ($request->has('tahun') && is_numeric($request->input('tahun'))) {
                $tahun = $request->input('tahun');
                $query->whereYear('date', $tahun);
            }
        
    
            $rekapExpander = $query->get();

            function totalBeratExpanderBalok(Collection $expanderCollection) {
                $totalBerat = 0;
                foreach ($expanderCollection as $expander) {                   
                        $totalBerat += $expander->banyak_kg;
                }
                return $totalBerat;
            }

            function totalBeratHasilBalok (Collection $expanderCollection){
                $totalBerat = 0;
                foreach ($expanderCollection as $expander){
                    foreach($expander->baloks as $baloks){
                            $totalBerat += $baloks->jumlah_balok*$baloks->berat_kg;
                    };
                };
                return $totalBerat;
                }

            function getWasteProduksi ($bahan,$hasil){
                $waste = $bahan-$hasil;
                return $waste;
            }

            $beratExpanderBalok = totalBeratExpanderBalok($rekapExpander);
            $beratBalokTotal = totalBeratHasilBalok($rekapExpander);
            $wasteProduksi = getWasteProduksi($beratExpanderBalok,$beratBalokTotal);
            $wasteProductionPercent = 100;
            if($beratBalokTotal!=0){
                $wasteProductionPercent=100-( $beratBalokTotal/$beratExpanderBalok*100);
            }

            return Inertia::render('Rekap/Baloks',['waste_production_percent'=>$wasteProductionPercent,'rekap'=>$rekapExpander,'total_berat_expander'=>$beratExpanderBalok,'total_berat_masak_balok'=>$beratBalokTotal,'waste_produksi'=>$wasteProduksi]);
            
        }
    
        public function detail(Request $request)
        {   $fullPath = $request->path();
            $segments = explode('/', $fullPath);
            $lastSegment = end($segments);
            $id = $lastSegment;


            $baloks =  Balok::where('type', $id)->orderBy('date', 'desc')->get();
            $expander = Expander::where('no_expander',$id)->first();
            return Inertia::render('Rekap/Baloks/Detail',['baloks'=>$baloks,
            'expander'=>$expander]);
        }
    
}
