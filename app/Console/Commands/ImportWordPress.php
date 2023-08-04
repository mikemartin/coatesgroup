<?php

namespace App\Console\Commands;

use Corcel\Model\Post;
use Illuminate\Console\Command;
use Illuminate\Support\Str;
use Statamic\Facades\Entry;

class ImportWordPress extends Command
{
    use Traits\TiptapHelpers;
    use Traits\WordpressImportHelpers;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:wp';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import posts from WordPress';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $lang = 'default';

        $posts = Post::type('post')
              ->orderBy('post_date', 'desc')
              ->published()
              ->get();

        $bar = $this->output->createProgressBar(count($posts));

        $bar->start();

        foreach ($posts as $post) {

            // get the content of this post
            $content = $post->post_content;

            // match all instances where the image_url is found and get the id
            preg_match_all('/image_url="\d{4,5}/', $content, $matches);
            
            foreach ($matches[0] as $match) {
                $id = explode('"', $match);
            
                // find the image with this id and get the url
                $attachment = Post::where('id', $id[1])->first();
                $url = Str::replace('http://coates-wp.test/wp-content/', 'images/wp/', $attachment);
            
                // replace the plugin text with img tag and url
                $content = preg_replace('(\[image_with_animation image_url="' . preg_quote($id[1], '/') . '[^\]]+])', '<img class="w-full h-auto" alt="image" src="' . $url . '">', $content);
            }

            // match all instances where the url has the post id and get the id
            preg_match_all('/"\/\?p=\d{4,5}/', $content, $matches);

            foreach ($matches[0] as $match) {
                $id = explode('=', $match);
            
                // find the post with this id and get the url
                $oldPost = Post::where('id', $id[1])->first();
                $url = Str::slug($oldPost->post_title);
            
                // replace the plugin url with slug url
                $content = preg_replace('(\?p=' . preg_quote($id[1], '/') . ')', $url, $content);
            }

            // remove all plugin data
            $content = preg_replace("~(?:\[/?)[^/\]]+/?\]~s", '', $content);
            $content = preg_replace('~(?:\[/?).*?"]~s', '', $content);
            $content = preg_replace('(\\[([^[]|)*])', '', $content);
            $content = preg_replace('/\[(.*?)\]/', '', $content);

            if ($content === "") {
                continue;
            }

            $content = $this->htmlToBard($content);

            if ($post->thumbnail) {
                $featured_image = Str::replace('https://domain.com/wp-content/', 'wp/', $post->thumbnail->size('invalid_size'));
            } else {
                $featured_image = 'wp/no_image.jpg';
            }
            
            $categories = $this->getCategories($post->terms['category']);

            $entry = Entry::make()
                ->collection('blog')
                ->locale($lang)
                ->slug($post->post_title)
                ->date($post->post_date)
                ->data([
                    'title' => $post->title,
                    'image' => $featured_image,
                    'topics' => $categories,
                    'article' => $content,
                ]);

            $entry->save();

            $bar->advance();
        }

        $bar->finish();

        return 'WordPress posts successfully migrated to Statamic';
    }

    public function getCategories($data)
    {
        $categories = [
            'Equality &amp; Empowerment' => 'equality-empowerment',
            'Events' => 'events',
            'Innovation' => 'product-innovation',
            'Opinion' => 'news',
            'Partners' => 'news',
            'People' => 'company-culture',
            'People &amp; Culture' => 'company-culture',
            'Press' => 'press',
            'Product' => 'product-innovation',
            'Project' => 'product-innovation',
            'Uncategorized' => 'uncategorized',
        ];

        $result = collect($data)->map(function ($category, $slug) use ($categories) {
            return $categories[$category];
        })->values()->unique()->toArray();

        return $result;
        
    }
}