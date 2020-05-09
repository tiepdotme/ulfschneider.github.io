---
title: Fluid videos with my adaption of FitVids
categories: journal
---
Embedded videos are not automatically responsive or fluid. They come with a fixed setting for width and height. To make them responsive while keeping aspect ratio, typically they are embedded into a wrapper element. The wrapper receives some clever padding and positioning, and as a last step the fixed dimensions are removed from the video. The technique has been described by Thierry Koblentz in his *A List Apart* article "[Creating Intrinsic Ratios for Video](https://alistapart.com/article/creating-intrinsic-ratios-for-video/)" in 2009.

To achieve this kind of manipulation automatically for all videos on your website, you have to run a script. Therefore I came up with my own tiny version of the [FitVids](http://fitvidsjs.com) script. FitVids is Dave Rupert´s implementation of the described algorithm. It has jQuery as a dependency, which I wanted to avoid. Therefore I picked up Dave´s code and simplified it to my needs. No dependencies anymore. 

Place the code on your site by putting it into a file, e.g. `fit-vids.js`, and reference it via `<script src="/.../fit-vids.js"></script>`. Here it is:

```
/*
A tailored version of FitVids, 
which is originally created by Dave Rupert (davatron5000).
FitVids again, is based on https://css-tricks.com/fluid-width-video/ by Chris Coyier, 
which borrows its basic idea from Thierry Koblentz
https://alistapart.com/article/creating-intrinsic-ratios-for-video/
*/

addEventListener('load', event => {
    // List of Video Vendors embeds you want to support
    const players = [
        'iframe[src*="player.vimeo.com"]',
        'iframe[src*="youtube.com"]',
        'iframe[src*="youtube-nocookie.com"]',
        'iframe[src*="kickstarter.com"][src*="video.html"]',
    ];

    // Select videos
    const fitVids = document.querySelectorAll(players.join(','));

    // If there are videos on the page...
    if (fitVids.length) {

        // Loop through videos
        for (let vid of fitVids) {

            // Get Video Information            
            var width = vid.getAttribute('width');
            var height = vid.getAttribute('height');
            var aspectRatio = height / width;
            var parentDiv = vid.parentNode;

            // Wrap it in a DIV
            var div = document.createElement('div');
            div.style.position = 'relative';
            div.style.paddingBottom = aspectRatio * 100 + '%';
            div.style.width = '100%';
            div.style.height = '0';

            vid.style.position = 'absolute';
            vid.style.top = '0';
            vid.style.left = '0';
            vid.style.width = '100%';
            vid.style.height = '100%';

            parentDiv.insertBefore(div, vid);
            vid.remove();
            div.appendChild(vid);

            // Clear height/width from fitVid
            vid.removeAttribute('height')
            vid.removeAttribute('width');
        }
    }
});
```
{:.breakout-wide-r}