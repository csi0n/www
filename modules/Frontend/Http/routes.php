<?php

Route::group(['middleware' => 'web', 'prefix' => 'frontend', 'namespace' => 'Modules\Frontend\Http\Controllers'], function () {
    require __DIR__ . '/Routes/Site.php';
});
