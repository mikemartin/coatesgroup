<?php

namespace App\Listeners\StaticCaching;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

class ForceEntryInvalidation implements ShouldQueue
{
    use InteractsWithQueue;

    protected $rules = [
        'blog' => [
            'urls' => [
                '/insights',
                '/insights/blog',
                '/insights/blog/topics/*'
            ],
        ],
        'press' => [
            'urls' => [
                '/insights',
                '/insights/press',
            ],
        ],
        'awards' => [
            'urls' => [
                '/insights',
                '/insights/awards',
            ],
        ],
        'thought_leadership' => [
            'urls' => [
                '/insights',
                '/insights/thought-leadership',
                '/insights/thought-leadership/resources/*'
            ],
        ],
        'people' => [
            'urls' => [
                '/careers/our-people',
                '/about-us/leadership-team'
            ],
        ],
        'offices' => [
            'urls' => [
                '/about-us/offices'
            ],
        ],
        'case-studies' => [
            'urls' => [
                '/case-studies'
            ],
        ],
        'clients' => [
            'urls' => [
                '/',
                '/case-studies'
            ],
        ],
        'values' => [
            'urls' => [
                '/about-us',
            ],
        ],
        'experiences' => [
            'urls' => [
                '/what-we-do',
            ],
        ],
        'products' => [
            'urls' => [
                '/what-we-do',
            ],
        ],
    ];

    protected $deleted = [];

    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()

    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle($event)
    {
        /** @var \Statamic\Entries\Entry */
        $entry = $event->entry;

        // Delete itself
        if ($uri = $entry->uri()) {
            $this->invalidatePath($uri);
        }

		  // If it's a page & it has a parent entry, let's invalidate it & warm it back up again.
        if ($entry->collectionHandle() === 'pages' && $entry->parent()) {
            $this->invalidatePath($entry->parent()->uri());

            $this->visit($entry->parent()->uri());
        }

        // Loop through any rules
        foreach (Arr::get($this->rules, "{$entry->collectionHandle()}.urls", []) as $rule) {
            // Is this a wildcard rule?
            if (str_contains($rule, '*')) {
                $staticCachingPaths = File::glob(public_path('static').$rule.'_.html');

                foreach ($staticCachingPaths as $staticCachingPath) {
                    $this->deleted[] = $staticCachingPath;

                    File::delete($staticCachingPath);
                }

                continue;
            }

            $this->invalidatePath($rule);
        }

        Log::info("Entry {$entry->slug()} saved, paths invalidated", $this->deleted);

    }

    protected function invalidatePath(string $path = '/')
    {
        // We could have multiple paths (since we need to clear query parameters too..)
        $filePaths = array_merge(
            [public_path('static').$path],
            File::glob(public_path('static').$path.'_*.html'),
        );

        foreach ($filePaths as $filePath) {
            $this->deleted[] = $filePath;
            File::delete($filePath);
        }
    }
}