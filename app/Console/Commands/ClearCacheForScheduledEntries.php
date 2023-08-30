<?php

namespace App\Console\Commands;

use App\Events\ScheduledEntryPublished;
use Illuminate\Console\Command;
use Statamic\Facades\Entry;

class ClearCacheForScheduledEntries extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'steadfast:clear-cache-for-scheduled-entries';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clears the static cache when scheduled entries are published.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('Clearing the cache for scheduled entries...');

        Entry::query()
            ->whereIn('collection', ['blog','awards','press','thought_leadership'])
            ->where('date', now()->startOfDay())
            ->get()
            ->each(function ($entry) {
                event(new ScheduledEntryPublished($entry));
            });
    }
}