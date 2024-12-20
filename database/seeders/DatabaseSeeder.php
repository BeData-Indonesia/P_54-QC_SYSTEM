<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'admin',
            'email' => 'admin@example.com',
            'password' => Hash::make(env('ADMIN_PASSWORD', 'admin')),
            'admin' => true,
            'verified_user' => true,
        ]);
        $this->call([
            // ExpanderSeeder::class,
            // InjectSeeder::class,
            // BalokSeeder::class,
        ]);
    }
}
