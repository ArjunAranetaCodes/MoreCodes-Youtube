<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Task extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection = 'tasks';

    protected $fillable = ['title'];
}