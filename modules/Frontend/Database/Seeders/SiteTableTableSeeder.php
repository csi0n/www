<?php

namespace Modules\Frontend\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Modules\Frontend\Entities\Site;

class SiteTableTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        factory(Site::class)->create([
            'name' => '堡镇站',
            'longitude' => 31.505226918891,
            'latitude' => 121.703280234375,
            'device_id' => 5
        ]);

        factory(Site::class)->create([
            'name' => '崇西站',
            'longitude' => 31.7531185150146,
            'latitude' => 121.180740356445,
            'device_id' => 2
        ]);

        factory(Site::class)->create([
            'name' => '南门站',
            'longitude' => 31.6017727352906,
            'latitude' => 121.44235494140629,
            'device_id' => 4
        ]);

        factory(Site::class)->create([
            'name' => '横沙东滩站',
            'longitude' => 31.3634452819824,
            'latitude' => 121.9058380126953,
            'device_id' => 3
        ]);
        factory(Site::class)->create([
            'name' => '长兴岛站',
            'longitude' => 31.1451797485352,
            'latitude' => 122.04543304443359,
            'device_id' => 6
        ]);
        factory(Site::class)->create([
            'name' => '大通站',
            'longitude' => 31.9257829880814,
            'latitude' => 120.84909322265629,
            'device_id' => 7
        ]);
        factory(Site::class)->create([
            'name' => '青龙港',
            'longitude' => 31.7104863071852,
            'latitude' => 121.95871236328129,
            'device_id' => 10
        ]);
    }
}
