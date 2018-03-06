<?php
/**
 * Created by PhpStorm.
 * User: csi0n
 * Date: 3/1/18
 * Time: 1:24 PM
 */

namespace Modules\Frontend\Repositories;


use Modules\Frontend\Entities\Site;

class SiteRepository extends Repository
{
    protected $model = Site::class;

    public function loadById(array $id)
    {
        return $this->getModel()
            ->whereIn('id', $id)
            ->get();
    }
}