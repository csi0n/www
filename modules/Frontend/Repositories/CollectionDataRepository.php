<?php
/**
 * Created by PhpStorm.
 * User: csi0n
 * Date: 3/1/18
 * Time: 4:48 PM
 */

namespace Modules\Frontend\Repositories;


use Modules\Frontend\Entities\CollectionData;

class CollectionDataRepository extends Repository
{
    protected $model = CollectionData::class;

    public function todayByDeviceID($deviceId)
    {
        return $this->getModel()
            ->whereDate('CollectionDateTime', date('Y-m-d'))
            ->where('DeviceID', $deviceId)
            ->get();
    }

    public function byDateArea($start, $end, $deviceId)
    {
        return $this->getModel()
            ->whereBetween('CollectionDateTime', [$start, $end])
            ->where('DeviceID', $deviceId)
            ->get();
    }
}