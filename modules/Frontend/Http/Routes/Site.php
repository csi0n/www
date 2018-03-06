<?php
/**
 * Created by PhpStorm.
 * User: csi0n
 * Date: 3/1/18
 * Time: 1:31 PM
 */
Route::group(['prefix' => 'sites'], function ($router) {
    Route::get('/', [
        'uses' => 'SiteController@index',
        'as' => 'frontend.sites.index'
    ]);
    Route::post('/load-today-collection-data', [
        'uses' => 'SiteController@loadTodayCollectionData',
        'as' => 'frontend.sites.load-today-collection-data'
    ]);
    Route::post('/load-collection-by-date-area', [
        'uses' => 'SiteController@loadCollectionByDateArea',
        'as' => 'frontend.sites.load-collection-by-date-area'
    ]);
});