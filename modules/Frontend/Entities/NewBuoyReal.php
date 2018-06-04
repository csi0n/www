<?php

namespace Modules\Frontend\Entities;

use Illuminate\Database\Eloquent\Model;

class NewBuoyReal extends Model
{
    protected $table = 'NewBuoyReal';
    public $timestamps = false;
    protected $connection = 'datacollectionsystem';
    protected $fillable = [];
}
