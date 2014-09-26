/**
 * jquery.hoverdir.js v1.1.1
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2012, Codrops
 * http://www.codrops.com
 *
 * Modified 2014, WebMan
 * http://www.webmandesign.eu
 * Modifications:
 * Removed CSS3 transitions and Modernizr requirements. Applied CSS
 * classes instead for better flexibility and controlability via CSS.
 *
 * @link     https://github.com/webmandesign/jquery.hoverdir
 * @version  1.0 (modified)
 */

( function( $, window, undefined ) {

	'use strict';

	$.HoverDir = function( options, element ) {

		this.$el = $( element );
		this._init( options );

	};

	// the options
	$.HoverDir.defaults = {
		fromPrefix : 'out-',
		toPrefix   : 'in-'
	};

	$.HoverDir.prototype = {

		_init : function( options ) {

			// options
			this.options = $.extend( true, {}, $.HoverDir.defaults, options );
			// all classes that plugin generates
			this.allClasses = {
					from : this.options.fromPrefix + 'top ' + this.options.fromPrefix + 'right ' + this.options.fromPrefix + 'bottom ' + this.options.fromPrefix + 'left',
					to   : this.options.toPrefix + 'top ' + this.options.toPrefix + 'right ' + this.options.toPrefix + 'bottom ' + this.options.toPrefix + 'left'
				};
			// load the events
			this._loadEvents();

		},
		_loadEvents : function() {

			var self = this;

			this.$el.on( 'mouseenter.hoverdir mouseleave.hoverdir', function( event ) {

				var $el        = $( this ),
				    fromPrefix = self.options.fromPrefix,
				    toPrefix   = self.options.toPrefix,
				    direction  = self._getDir( $el, { x : event.pageX, y : event.pageY } ),
				    CSSclass   = self._getClass( direction );

				if ( event.type === 'mouseenter' ) {

					$el.removeClass( self.allClasses.from )
						.addClass( toPrefix + CSSclass )
						.siblings()
							.removeClass( self.allClasses.to );

				} else {

					$el.removeClass( self.allClasses.to )
						.addClass( fromPrefix + CSSclass )
						.siblings()
							.removeClass( self.allClasses.from );

				}

			} );

		},
		// credits : http://stackoverflow.com/a/3647634
		_getDir : function( $el, coordinates ) {

			// the width and height of the current div
			var w = $el.width(),
			    h = $el.height(),

			    // calculate the x and y to get an angle to the center of the div from that x and y.
			    // gets the x value relative to the center of the DIV and "normalize" it
			    x = ( coordinates.x - $el.offset().left - ( w/2 ) ) * ( w > h ? ( h/w ) : 1 ),
			    y = ( coordinates.y - $el.offset().top  - ( h/2 ) ) * ( h > w ? ( w/h ) : 1 ),

			    // the angle and the direction from where the mouse came in/went out clockwise (TRBL=0123);
			    // first calculate the angle of the point,
			    // add 180 deg to get rid of the negative values
			    // divide by 90 to get the quadrant
			    // add 3 and do a modulo by 4 to shift the quadrants to a proper clockwise TRBL (top/right/bottom/left) **/
			    direction = Math.round( ( ( ( Math.atan2( y, x ) * ( 180 / Math.PI ) ) + 180 ) / 90 ) + 3 ) % 4;

			return direction;

		},
		_getClass : function( direction ) {

			var CSSclass;

			switch( direction ) {
				case 0:
					CSSclass = 'top';
					break;
				case 1:
					CSSclass = 'right';
					break;
				case 2:
					CSSclass = 'bottom';
					break;
				case 3:
					CSSclass = 'left';
					break;
			}

			return CSSclass;

		}

	};

	var logError = function( message ) {

		if ( window.console ) {

			window.console.error( message );

		}

	};

	$.fn.hoverdir = function( options ) {

		var instance = $.data( this, 'hoverdir' );

		if ( typeof options === 'string' ) {

			var args = Array.prototype.slice.call( arguments, 1 );

			this.each( function() {

				if ( ! instance ) {

					logError( "cannot call methods on hoverdir prior to initialization; " +
					"attempted to call method '" + options + "'" );
					return;

				}

				if ( ! $.isFunction( instance[options] ) || options.charAt(0) === "_" ) {

					logError( "no such method '" + options + "' for hoverdir instance" );
					return;

				}

				instance[ options ].apply( instance, args );

			} );

		}
		else {

			this.each( function() {

				if ( instance ) {

					instance._init();

				}
				else {

					instance = $.data( this, 'hoverdir', new $.HoverDir( options, this ) );

				}

			} );

		}

		return instance;

	};

} )( jQuery, window );