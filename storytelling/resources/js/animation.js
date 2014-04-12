(function($)
{
	/**
	 * Ready, prepare animations
	 */
	$(function()
	{
		// Constants
		var EARTH_HEIGHT = $('.earth').first().height();
		var ASTEROID_HEIGHT = $('.asteroid').first().height();
		var EARTH_TOP_PADDING = $('.sun').first().height() / 2.0 + EARTH_HEIGHT / 2.0;
		var ASTEROID_TOP_PADDING = $('.asteroid').first().height() / 2.0 + EARTH_TOP_PADDING;
		
		// Sun show up
		$('.sun').addClass('animated bounceInUp');
		$('header>h1').addClass('animated bounceInLeft');
		$('header>h2').addClass('animated bounceInRight');
		
		// Earth animation
		var $earth = $('.earth');
		var earthAnimate	= function(t)
		{
			t += 0.1;
			
			var eMaj = 240.0;
			var eMin = 130.0;
			
			
			
			var zIndex = (yPos > -EARTH_TOP_PADDING) ? 9 : 11;
			
			$earth.animate({ 
				cantTouchThis : 100
			},
			{
				duration: 10,
				step: function(now,fx) {
					$earth.css({
						'-webkit-transform' : 'translate(' + xPos + 'px,' + yPos + 'px)',
						'z-index' : zIndex
					});
				},
				complete: function() {
					earthAnimate(t);
				}
			});
		};
		
		//earthAnimate(0.0);
		
		// Frame based animation, if you know what I mean.
		window.requestAnimationFrame =  window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;;
		
		var start = null;
		
		// Earth params
		var eMaj = 240.0;
		var eMin = 130.0;
		
		// Asteroid params
		var aMaj = 260.0;
		var aMin = 140.0;
		
		var $asteroid = $('.asteroid');
		
		// Prepare asteroid deltas
		var asteroidDelta = [];
		for(var j=0;j<$asteroid.length;j++)
		{
			var randomDelta = Math.random() * Math.PI + 0.1;
			asteroidDelta[j] = {
				delta 	: randomDelta,
				maj 	: 240.0 + Math.random() * 10,
				min		: 140.0 + Math.random() * 10
			};
		}
		
		var animateFx = function(ts)
		{
			if(start === null) start = ts;
			var t = (ts - start)/500.0;
			
			// Earth
			var eXPos = Math.floor(eMaj * Math.cos(t));
			var eYPos = Math.floor(eMin * Math.sin(t)) - EARTH_TOP_PADDING;
			
			$earth.css({
				'-webkit-transform' : 'translate(' + eXPos + 'px,' + eYPos + 'px)'
			});
			
			var i = 0;
			$asteroid.each(function(asteroid)
			{
				var asteroidData = asteroidDelta[i];
				// Asteroid
				var aXPos = Math.floor(asteroidData.maj * Math.cos(t + asteroidData.delta));
				var aYPos = Math.floor(asteroidData.min * Math.sin(t + asteroidData.delta)) - ASTEROID_TOP_PADDING - ASTEROID_HEIGHT * i;
			
				var scaleXY = (0.1 * -Math.abs(aYPos))/aMin + 0.9;
				
				$(this).css({
					'-webkit-transform' : 'translate(' + aXPos + 'px,' + aYPos + 'px) scale(' + scaleXY + ')'
				});
				
				i++;
			});
			
			requestAnimationFrame(animateFx);
		}
		
		// Let's start, baby.
		requestAnimationFrame(animateFx);
		
		// Asteroid animation
		var asteroidAnimate = function(t)
		{
			t += 0.12;
			
			var eMaj = 260.0;
			var eMin = 140.0;
			
			var xPos = Math.floor(eMaj * Math.cos(t));
			var yPos = Math.floor(eMin * Math.sin(t)) - ASTEROID_TOP_PADDING;
			
			var scaleXY = (0.1 * Math.abs(yPos))/eMin + 0.9;
			
			$asteroid.animate({
				cantTouchThis : 101
			},
			{
				duration: 10,
				step: function(now, fx) {
					$asteroid.css({
						'-webkit-transform' : 'translate(' + xPos + 'px,' + yPos + 'px) scale(' + scaleXY + ')'
					});
				},
				complete : function(){
					asteroidAnimate(t);
				}
			});
		}
		//asteroidAnimate(4.0);
	});
})(jQuery);