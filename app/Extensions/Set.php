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
            ],
            [
                'tag' => 'img',
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
                } elseif ($DOMNode->nodeName == 'img') {

                    while ($DOMNode->hasChildNodes()) {
                        $DOMNode->removeChild($DOMNode->firstChild);
                    }
                    
                    return [
                        'type' => 'image',
                        'image' => $DOMNode->getAttribute('src'),
                        'size' => 'LG'
                    ];
                } else {
                    $img = $DOMNode->getElementsByTagName('img')->item(0);
                    $src = Str::replace($img->getAttribute('src'), '/images/wp/', '/wp/' );  

                    $captionElements = $DOMNode->getElementsByTagName('figcaption');

                    if ($captionElements->length > 0) {
                        $caption = $captionElements->item(0)->textContent;
                    }
    
                    while ($DOMNode->hasChildNodes()) {
                        $DOMNode->removeChild($DOMNode->firstChild);
                    }
    
                    return [
                        'type' => 'image',
                        'image' => $src,
                        'caption' => $caption ?? null,
                        'size' => 'LG'
                    ];
                }
                
            },
        ]];
    }
}