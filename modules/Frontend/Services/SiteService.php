<?php
/**
 * Created by PhpStorm.
 * User: csi0n
 * Date: 3/1/18
 * Time: 1:26 PM
 */

namespace Modules\Frontend\Services;


use Modules\Frontend\Repositories\SiteRepository;

class SiteService
{
    protected $siteRepository;

    /**
     * SiteService constructor.
     * @param $siteRepository
     */
    public function __construct(SiteRepository $siteRepository)
    {
        $this->siteRepository = $siteRepository;
    }

    public function __call($name, $arguments)
    {
        return call_user_func_array([$this->siteRepository, $name], $arguments);
    }
}