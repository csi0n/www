<?php

namespace Modules\Frontend\Entities;

use Illuminate\Database\Eloquent\Model;

class CollectionData extends Model
{
    protected $fillable = ['*'];
    public $timestamps = false;
    protected $connection = 'datacollectionsystem';
    protected $table = 'TB_B_CollectionData';
}
