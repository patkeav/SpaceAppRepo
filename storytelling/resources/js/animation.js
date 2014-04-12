(function($)
{
	/**
	 * Ready, prepare animations
	 */
	$(function()
	{
		// Constants
		var EARTH_TOP_PADDING = $('.sun').first().height() / 2.0;
		
		// Sun show up
		$('.sun').addClass('animated bounceInUp');
		
		// Earth animation
		var $earth = $('.earth');
		var earthAnimate	= function(t)
		{
			t += 0.05;
			
			var eMaj = 200.0;
			var eMin = 100.0;
			
			var xPos = Math.floor(eMaj * Math.cos(t));
			var yPos = Math.floor(eMin * Math.sin(t)) - EARTH_TOP_PADDING;
			
			var zIndex = (yPos > -EARTH_TOP_PADDING) ? 11 : 9;
			
			$earth.animate({ 
				cantTouchThis : 100
			},
			{
				duration: 1,
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
		
		earthAnimate(0.0);
	});
})(jQuery);