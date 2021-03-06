<?php

namespace Modules\Frontend\Entities;

use Illuminate\Database\Eloquent\Model;

class Site extends Model
{
    protected $fillable = [
        'name',
        'longitude',
        'latitude',
        'device_id'
    ];
}
