<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// The route to the RSS feed.
Route::statamic('/feed/insights', 'feed/feed', [
    'layout' => null,
    'content_type' => 'application/xml',
]);