<?php
/**
 * Created by PhpStorm.
 * User: csi0n
 * Date: 3/6/18
 * Time: 1:35 PM
 */

namespace Modules\Frontend\Transformers;


use Illuminate\Http\Resources\Json\Resource;
use Modules\Frontend\Services\CollectionDataService;

class SiteCollectionDateTransformer extends Resource
{
    public function toArray($request)
    {
        return array_merge([
            'collectionData' => app(CollectionDataService::class)->byDateArea(
                $request->start,
                $request->end,
                $this->device_id)
        ], parent::toArray($request)
        );
    }
}