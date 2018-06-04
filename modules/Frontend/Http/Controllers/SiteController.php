<?php

namespace Modules\Frontend\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\Frontend\Http\Requests\CollectionByDateAreaRequest;
use Modules\Frontend\Http\Requests\LoadTodayCollectionDataRequest;
use Modules\Frontend\Services\SiteService;
use Modules\Frontend\Transformers\RealTimeDataCurveTransform;
use Modules\Frontend\Transformers\SiteCollectionDateTransformer;
use Modules\Frontend\Transformers\SiteTransformer;

class SiteController extends Controller
{
    protected $siteService;

    /**
     * SiteController constructor.
     * @param $siteService
     */
    public function __construct(SiteService $siteService)
    {
        $this->siteService = $siteService;
    }

    /**
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     * Display a listing of the resource.
     */
    public function index()
    {
        ini_set('memory_limit', '2048M');
        return SiteTransformer::collection(
            $this->siteService->get()
        );
    }

    public function loadTodayCollectionData(LoadTodayCollectionDataRequest $request)
    {
        return RealTimeDataCurveTransform::collection(
            $this->siteService->loadById($request->ids)
        );
    }

    public function loadCollectionByDateArea(CollectionByDateAreaRequest $request)
    {
        return SiteCollectionDateTransformer::collection(
            $this->siteService->loadById($request->ids)
        );
    }
}
