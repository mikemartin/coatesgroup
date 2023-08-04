<?php
 
 namespace App\Shortcodes;
 
 use Corcel\Shortcode;
 use Thunder\Shortcode\Shortcode\ShortcodeInterface;
 
 class CaptionShortcode implements Shortcode
 {
   
   public function render(ShortcodeInterface $shortcode)
   {
     $atts = [
       'align' => 'alignnone',
       'caption' => '',
       'class' => '',
       'style' => ''
     ];
     
     $params = $shortcode->getParameters();
     
     if (preg_match('#((?:<a [^>]+>\s*)?<img [^>]+>(?:\s*</a>)?)(.*)#is',  
       $shortcode->getTextContent(), $matches)) {
       $content = $matches[1];
       $atts['caption'] = trim($matches[2]);
     } else {
       $content = $shortcode->getTextContent();
     }
     
     $atts['width'] = (int) $params['width'];
     
     if ($atts['width'] < 1 || empty($atts['caption'])) {
       return $content;
     } elseif ($atts['width'] >= 1) {
       $atts['style'] = sprintf(' style="width:%dpx" ', $atts['width']);
     }
     
     $atts['class'] = sprintf('wp-caption %s', $params['align'] ? $params['align'] : $atts['align']);
     
     return sprintf(
       '<figure %sclass="%s">%s%s</figure>',
       $atts['style'],
       $atts['class'],
       $content,
       sprintf('<figcaption class="wp-caption-text">%s</figcaption>', $atts['caption'])
     );
     
   }
 }