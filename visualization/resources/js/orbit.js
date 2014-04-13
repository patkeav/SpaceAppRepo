(function($)
{
	$(window).on('asteroids.load', function()
	{
		console.log('hi');
		// Frame based animation, orbiting for the win.
		window.requestAnimationFrame =  window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;;
	
		var start = null;
		
		var logged = 100;
	
		var $asteroids = $('asteroid');
		var animateFx = function(ts)
		{
			if(start === null) start = ts;
			var t = (ts - start)/20.0;
		
			// Interpolate!
			$.each(app.data.asteroids, function(i, asteroid)
			{
				var $asteroid = $('#asteroid-' + i).first();
			
				var index = parseInt(Math.floor(t)) % 360;
			
				var prev = asteroid.points[index];
				var next = asteroid.points[(index + 1)%360];
			
				var delta = t - index; // between 0 and 1
				
				var pos = {
					x: (delta * prev.x + (1-delta) * next.x) * 300,
					y: (delta * prev.y + (1-delta) * next.y) * 300,
					z: (delta * prev.z + (1-delta) * next.z) * 300
				}
			
				$asteroid.css({'-webkit-transform' : 'translate3d(' + pos.x + 'px,' + pos.y + 'px,' + pos.z + 'px)' });
			});
			
			requestAnimationFrame(animateFx);
			console.log('animations');
		}
		
		console.log('hi2');
		requestAnimationFrame(animateFx);
	});
})($);