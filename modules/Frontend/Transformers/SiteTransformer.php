<?php
/**
 * Created by PhpStorm.
 * User: csi0n
 * Date: 3/1/18
 * Time: 1:27 PM
 */

namespace Modules\Frontend\Transformers;


use Illuminate\Http\Resources\Json\Resource;
use Modules\Frontend\Services\CollectionDataService;
use Modules\Frontend\Services\DeviceService;

class SiteTransformer extends Resource
{
    public function toArray($request)
    {
        $newestCollectionData = app(CollectionDataService::class)->loadNewestCollectionDataByDeviceId($this->device_id);
        return array_merge([
                'newest_collection_data' => is_null($newestCollectionData) ? null : $newestCollectionData->toArray(),
                'origin_device' => app(DeviceService::class)->loadDeviceByDeviceId($this->device_id)
            ],
            parent::toArray($request)
        );
    }
}