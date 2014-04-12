app			= {};
app.data	= {};

/**
 * @requires jQuery
 * @requires APIAsteroids
 * @requires app.data.planets
 */
(function(APIAsteroids, $)
{
	// Load all JSON data
	app.data.asteroids	= APIAsteroids; // Loaded from `asterank.js`
	
	$.each(app.data.asteroids, function(i, asteroid)
	{
		// Create random positions
		this.averageRadius	=	((Math.random() * (app.data.planets.earth.averageRadius/2.0)) - (app.data.planets.earth.averageRadius/4.0)) + app.data.planets.earth.averageRadius;
		this.anglePos		= 	(Math.random() * Math.PI * 2.0);
	});
	
	console.log(app.data.asteroids[0]);
	
})(APIAsteroids, $);