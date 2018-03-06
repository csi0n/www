<?php
/**
 * Created by PhpStorm.
 * User: csi0n
 * Date: 3/1/18
 * Time: 4:48 PM
 */

namespace Modules\Frontend\Services;


use Modules\Frontend\Repositories\CollectionDataRepository;

class CollectionDataService
{
    protected $collectionDataRepository;

    /**
     * CollectionDataService constructor.
     * @param $collectionDataRepository
     */
    public function __construct(CollectionDataRepository $collectionDataRepository)
    {
        $this->collectionDataRepository = $collectionDataRepository;
    }

    public function __call($name, $arguments)
    {
        return call_user_func_array([$this->collectionDataRepository, $name], $arguments);
    }

    public function loadNewestCollectionDataByDeviceId($deviceId)
    {
        return $this->collectionDataRepository
            ->where('DeviceID', $deviceId)
            ->orderBy('CollectionDateTime')
            ->first();
    }

}