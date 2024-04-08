<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Sites
    |--------------------------------------------------------------------------
    |
    | Each site should have root URL that is either relative or absolute. Sites
    | are typically used for localization (eg. English/French) but may also
    | be used for related content (eg. different franchise locations).
    |
    */

    'sites' => [

        'en' => [
            'name' => 'English',
            'locale' => 'en_US',
            'url' => '/',
        ],

        'fr' => [
          'name' => 'Français',
          'locale' => 'fr_FR',
          'lang' => 'fr',
          'url' => '/fr/',
        ],

        'ja' => [
            'name' => '日本語',
            'locale' => 'ja_JP',
            'lang' => 'ja',
            'url' => '/ja/',
        ],

        'zh_cn' => [
            'name' => '中文',
            'locale' => 'zh_CN',
            'lang' => 'zh_CN',
            'url' => '/zh_cn/',
        ],

        'zh_tw' => [
          'name' => '中文',
          'locale' => 'zh_TW',
          'lang' => 'zh_TW',
          'url' => '/zh_tw/',
        ],

        'ar' => [
          'name' => 'العربية',
          'locale' => 'ar_SA',
          'lang' => 'ar',
          'url' => '/ar/',
        ],

        'hi' => [
          'name' => 'हिन्दी',
          'locale' => 'hi_IN',
          'lang' => 'hi',
          'url' => '/hi/',
        ],

        'nl' => [
            'name' => 'Nederlands',
            'locale' => 'nl_NL',
            'lang' => 'nl',
            'url' => '/nl/',
        ],

    ],
];
