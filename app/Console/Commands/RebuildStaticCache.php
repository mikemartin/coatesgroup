<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Statamic\Facades\Entry;

class RebuildStaticCache extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'steadfast:rebuild-static-cache';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Rebuilds the static cache by clearing & warming popular pages.';

    protected $staticCachingPath;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();

        $this->staticCachingPath = config('statamic.static_caching.strategies.full.path');
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('Rebuilding static cache...');

        // Invalidate & warm popular pages
        foreach ($this->popularPages() as $uri) {
            foreach (File::glob($this->staticCachingPath.'/'.$uri.'*') as $file) {
                File::delete($file);
            }

            $this->visit($uri);
        }

        return Command::SUCCESS;
    }

    protected function popularPages()
    {
        $popularPages = [
            '/',
            '/what-we-do',
            '/what-we-do/digital-menu-boards',
            '/what-we-do/self-service-kiosk',
            '/what-we-do/software',
            '/what-we-do/traditional-signage',
            '/what-we-do/drive-thru-solutions',
            '/what-we-do/in-restaurant-digital-solutions',
            '/about-us',
            '/about-us/leadership-team',
            '/offices',
            '/contact',
            '/careers',
            '/careers/our-people',
            '/case-studies',
            '/insights',
            '/insights/awards',
            '/insights/blog',
            '/insights/press',
            '/insights/thought-leadership',
        ];

        // Get featured blog posts
        $insights = Entry::query()
            ->where('uri', '/insights')
            ->first()
            ->augmentedValue('page_builder');

        collect($insights)
            ->flatMap(function ($set) {
                return match ($set->type) {
                    'blog' => $set->blog,
                    'press' => $set->press,
                    'awards' => $set->awards,
                    'thought_leadership' => $set->thought_leadership,
                    default => [],
                };
            })
            ->filter(fn ($post) => is_null($post->redirect))
            ->map(function ($post) {
            return [
                'uri' => $post->uri(),
                'date' => $post->date->timestamp,
            ];
        })->sortByDesc('date')->pluck('uri')->map(function ($uri) use (&$popularPages) {
            $popularPages[] = $uri;
        });

        return $popularPages;
    }

    protected function visit(string $url = '/'): void
    {
        $this->info("Generating: {$url}");

        $request = Http::get(config('app.url').$url);

        if ($request->failed()) {
            $this->error("Failed to generate: {$url}");
        }
    }
}