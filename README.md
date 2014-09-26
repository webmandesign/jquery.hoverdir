## jquery.hoverdir.js

**This is a modified version of jquery.hoverdir.js (v1.1.1) by http://www.codrops.com (copyright 2012, Codrops, licensed under the MIT license, http://www.opensource.org/licenses/mit-license.php).**

## Modifications

Removed CSS3 transitions and Modernizr requirements. Applied CSS classes instead for better flexibility and controlability via CSS.

## Description

This script watches the direction from where the mouse cursor came hovering the item. In these cases the class of `in-top`, `in-right`, `in-bottom` or `in-left` is added onto the hoverd item.

In case of mouse cursor leaving the item, the class of the leaving direction is applied on the item (`out-top`, `out-right`, `out-bottom` or `out-left`).

## Usage

```
if ( jQuery().hoverdir ) {
	jQuery( '.hoverdir-container .hoverdir-item' ).each( function() {
			jQuery( this ).hoverdir();
		} );
} // /hoverdir
```