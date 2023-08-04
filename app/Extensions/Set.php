<?php 

namespace App\Extensions;
use Statamic\Support\Str;

use Tiptap\Core\Node;
 
class Set extends Node
{
    public static $name = 'set';
 
    public static $priority = 200;
 
    public function parseHTML()
    {
        return [
            [
                'tag' => 'figure',
            ],
            [
                'tag' => 'iframe',
            ]
        ];
    }
 
    public function addAttributes()
    {
        return ['values' => [
            'parseHTML' => function ($DOMNode) {

                if($DOMNode->nodeName == 'iframe') {
                    $src = $DOMNode->getAttribute('src');
    
                    while ($DOMNode->hasChildNodes()) {
                        $DOMNode->removeChild($DOMNode->firstChild);
                    }
    
                    return [
                        'type' => 'video',
                        'youtube_url' => $src,
                    ];
                } else {
                    $img = $DOMNode->getElementsByTagName('img')->item(0);
                    $src = Str::replace($img->getAttribute('src'), '/images/wp/', '/wp/' );  

                    $alt = $img->getAttribute('alt');
                    $caption = $DOMNode->getElementsByTagName('figcaption')->item(0)->textContent;
    
                    while ($DOMNode->hasChildNodes()) {
                        $DOMNode->removeChild($DOMNode->firstChild);
                    }
    
                    return [
                        'type' => 'image',
                        'image' => $src,
                        'alt' => $alt,
                        'caption' => $caption,
                    ];
                }
                
            },
        ]];
    }
}