<?php

namespace App\Imports;

use App\Models\Product;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\ToCollection;
use Exception;

class ProductsImport implements ToCollection
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function collection(Collection $rows)
    {
        DB::beginTransaction();
        try {
            foreach ($rows as $row) {
                Product::create([
                    'name' => $row[0],
                ]);
            }
    
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            error_log($e->getMessage());
        }
    }
    
    }

