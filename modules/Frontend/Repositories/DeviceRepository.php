<?php
/**
 * Created by PhpStorm.
 * User: csi0n
 * Date: 3/1/18
 * Time: 7:45 PM
 */

namespace Modules\Frontend\Repositories;


use Modules\Frontend\Entities\Device;

class DeviceRepository extends Repository
{
    protected $model = Device::class;
}