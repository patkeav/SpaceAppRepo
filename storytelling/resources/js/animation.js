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
		
		// jQuery data
		var $earth = $('.earth');
		var $asteroid = $('.asteroid');
		var $asteroidBig = $('.asteroid-big');
		var shouldAsteroidBigRotate = false;
		var isCashCountStarted = false;
		
		// Frame based animation, if you know what I mean.
		window.requestAnimationFrame =  window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;;
		
		var start = null;
		
		// Earth params
		var eMaj = 240.0;
		var eMin = 130.0;
		
		// Asteroid params
		var aMaj = 260.0;
		var aMin = 140.0;
		
		var aBigRotStart = null;
		
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
			
			// Asteroid
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
			
			// Big asteroid
			if(shouldAsteroidBigRotate)
			{
				if(aBigRotStart === null) aBigRotStart = t;
				var aBigRot = ((t-aBigRotStart)/2.0 * (180/Math.PI)) % 360;
				
				$asteroidBig.css({
					'-webkit-transform' : 'rotate(' + aBigRot + 'deg)',
					'-webkit-animation-name' : 'none'
				})
			}
			
			requestAnimationFrame(animateFx);
		}
		
		// Let's start, baby.
		requestAnimationFrame(animateFx);
		
		// Asteroid description
		$('#asteroid-description').waypoint(function(d)
		{
			//$('.asteroid-big').addClass('animated bounceInLeft');
			//$('.asteroid-data-box').addClass('animated bounceInRight');
			
			setTimeout(function(){ shouldAsteroidBigRotate = true; }, 700);
		},
		{
			offset: 'bottom-in-view'
		});
		
		// Cash!
		$('#cash').waypoint(function(d)
		{
			if(!isCashCountStarted)
			{
				isCashCountStarted = true;
				
				$('.cash-count').countTo({
					from: 0, 
					to: 101536965731505, 
					speed: 2000,
					formatter: function (value, options) {
						return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
					}
				});
			}
		},
		{
			offset: 600
		});
	});
})(jQuery);