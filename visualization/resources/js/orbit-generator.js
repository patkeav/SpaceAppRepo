(function($)
{
	// Asteroids interpolation points generation
	var e1 = $V([1, 0, 0]);
	var e2 = $V([0, 1, 0]);
	var e3 = $V([0, 0 ,1]);
	
	var DEG2RAD = function(deg) { return deg * Math.PI/180.0; }
	
	$.each(app.data.asteroids, function(j, asteroid)
	{	
		var points = []; // 360 points
		
		var e = parseFloat(asteroid.e);
		var a = parseFloat(asteroid.a);
		var inc = DEG2RAD(parseFloat(asteroid.i));
		
		var raan = DEG2RAD(parseFloat(asteroid.om));
		
		var argp = DEG2RAD(parseFloat(asteroid.w));
		
		var p = a*(1-Math.pow(e, 2));
		
		// Versors
		var versh =   e1.multiply(Math.sin(inc) * Math.sin(raan))
						.subtract( e2.multiply(Math.sin(inc) * Math.cos(raan)) )
						.add( e3.multiply(Math.cos(inc)) 
					  );
		
		var tempv = e3.cross(versh);  
		var versn =  tempv.multiply(1/tempv.modulus());
		
		var vers3 = versh.cross(versn);
		
		var vers_e = versn.multiply(Math.cos(argp)).add(vers3.multiply(Math.sin(argp)));
		var vers_p = versh.cross(vers_e);
		
		for(var i=0; i<360; i++)
		{
			var radI = DEG2RAD(i);
			var modR = p / (1 + e*Math.cos(radI));
			var vers_r = vers_e.multiply(Math.cos(radI)).add( vers_p.multiply(Math.sin(radI)) );
			var vect_r = vers_r.multiply(modR);
			
			points.push({ 
				x: vect_r.e(1), 
				y: vect_r.e(2), 
				z: vect_r.e(3) 
			});
		}
		//console.log(app.data.asteroids[j]);
		app.data.asteroids[j].points = points;
	});
})($);

function logAsteroidPoints(i){
	console.log('Size: ' + app.data.asteroids[i].points.length);
	console.log(app.data.asteroids[i].points);
}