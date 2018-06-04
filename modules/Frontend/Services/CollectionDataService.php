<?php
/**
 * Created by PhpStorm.
 * User: csi0n
 * Date: 3/1/18
 * Time: 4:48 PM
 */

namespace Modules\Frontend\Services;


use Modules\Frontend\Repositories\CollectionDataRepository;
use Modules\Frontend\Repositories\NewBuoyHisRepository;
use Modules\Frontend\Repositories\NewBuoyRealRepository;

class CollectionDataService
{
    protected $collectionDataRepository;
    protected $newBuoyHisRepository;
    protected $newBuoRealRepository;

    /**
     * CollectionDataService constructor.
     * @param CollectionDataRepository $collectionDataRepository
     * @param NewBuoyHisRepository $newBuoyHisRepository
     * @param NewBuoyRealRepository $newBuoyRealRepository
     */
    public function __construct(CollectionDataRepository $collectionDataRepository, NewBuoyHisRepository $newBuoyHisRepository, NewBuoyRealRepository $newBuoyRealRepository)
    {
        $this->collectionDataRepository = $collectionDataRepository;
        $this->newBuoyHisRepository = $newBuoyHisRepository;
        $this->newBuoRealRepository = $newBuoyRealRepository;
    }

    public function __call($name, $arguments)
    {
        return call_user_func_array([$this->collectionDataRepository, $name], $arguments);
    }

    public function loadNewestCollectionDataByDeviceId($deviceId)
    {
        return $this->collectionDataRepository
            ->where('DeviceID', $deviceId)
            ->orderBy('CollectionDateTime', 'desc')
            ->first();
    }

    public function loadType2NewestCollectionDataByStationID($stationID)
    {
        return $this->newBuoRealRepository
            ->where('StationID', $stationID)
            ->first();
    }


}