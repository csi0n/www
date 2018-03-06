<?php
/**
 * Created by PhpStorm.
 * User: csi0n
 * Date: 3/1/18
 * Time: 1:25 PM
 */

namespace Modules\Frontend\Repositories;


class Repository
{
    protected $model = null;

    protected function getModel()
    {
        return app($this->model);
    }

    public function __call($name, $arguments)
    {
        return call_user_func_array([$this->getModel(), $name], $arguments);
    }
}