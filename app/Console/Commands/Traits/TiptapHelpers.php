<?php

namespace App\Console\Commands\Traits;

use Tiptap\Editor;
use Tiptap\Extensions;
use Tiptap\Marks;
use Tiptap\Nodes;
use Statamic\Support\Str;
use App\Extensions\Set as Set;

trait TiptapHelpers
{

    /**
     * Replaces double line breaks with paragraph elements.
     *
     * @return string
     */
    public function htmlToBard($html) {

        if (!$html) {
            return null;
        }

        $bard = (new Editor([
            'extensions' => [
                new Extensions\StarterKit,
                new Set,
                new Nodes\BulletList,
                new Nodes\OrderedList,
                new Nodes\Image,
                new Nodes\Table,
                new Nodes\TableCell,
                new Nodes\TableHeader,
                new Nodes\TableRow,
                new Marks\Link,
            ],
            ]))->setContent($html)->getDocument()['content'];
        
            $bard = collect($bard)
            ->map(function ($node) {
                return $node['type'] === 'text' ? [
                    'type' => 'paragraph',
                    'content' => [$node],
                ] : $node;
            })
            ->filter(function ($node) {
                return $node['type'] !== 'hard_break';
            })
            ->values()
            ->all();
        return $bard;
    }
}