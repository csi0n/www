<?php
/**
 * Created by PhpStorm.
 * User: csi0n
 * Date: 3/1/18
 * Time: 7:46 PM
 */

namespace Modules\Frontend\Services;


use Modules\Frontend\Repositories\DeviceRepository;

class DeviceService
{
    protected $deviceRepository;

    /**
     * DeviceService constructor.
     * @param $deviceRepository
     */
    public function __construct(DeviceRepository $deviceRepository)
    {
        $this->deviceRepository = $deviceRepository;
    }

    public function loadDeviceByDeviceId($deviceId)
    {
        return $this->deviceRepository
            ->where('DeviceID', $deviceId)
            ->first();
    }
}