<?php

namespace Modules\Frontend\Entities;

use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    protected $fillable = ['*'];
    public $timestamps = false;
    protected $connection = 'datacollectionsystem';
    protected $table = 'tb_b_device';
}
