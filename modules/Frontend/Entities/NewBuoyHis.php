<?php

namespace Modules\Frontend\Entities;

use Illuminate\Database\Eloquent\Model;

class NewBuoyHis extends Model
{
    protected $table='NewBuoyHis';
    public $timestamps = false;
    protected $connection = 'datacollectionsystem';
    protected $fillable = [];
}
