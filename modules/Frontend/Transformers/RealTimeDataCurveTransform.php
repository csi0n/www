<?php
/**
 * Created by PhpStorm.
 * User: csi0n
 * Date: 3/2/18
 * Time: 11:44 AM
 */

namespace Modules\Frontend\Transformers;


use Illuminate\Http\Resources\Json\Resource;
use Modules\Frontend\Services\CollectionDataService;

class RealTimeDataCurveTransform extends Resource
{
    public function toArray($request)
    {
        return array_merge([
            'today' => app(CollectionDataService::class)->todayByDeviceID($this->device_id)
        ], parent::toArray($request)
        );
    }
}