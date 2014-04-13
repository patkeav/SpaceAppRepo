<!DOCTYPE html>
<html>
	<head>
		<link href="resources/css/reset.css" rel="stylesheet" />
		<link href="resources/fonts/bebas/bebas.css" rel="stylesheet" />
		<link href="resources/css/animate.css" rel="stylesheet" />
		<link href="resources/css/style.css" rel="stylesheet" />
	</head>
	<body class="container">
		<!-- Header -->
		<header>
			<h1>Asteroids</h1>
			<h2>in the sky with diamonds</h2>
		</header>
		
		<!-- Solar system -->
		<section class="solar-system">
			<div class="sun centered wow rubberBand"></div>
			<div class="earth centered"></div>
			<div class="asteroid centered"></div>
			<div class="asteroid centered"></div>
		</section>
		
		<!-- Asteroid description -->
		<section id="asteroid-description" class="wow slideInRight">
			<div class="asteroid-box" class="wow bounceInLeft">
				<div class="asteroid-big"></div>
			</div>
			<div class="asteroid-data-box">
				<h2 class="wow fadeInUp" data-wow-delay="0.3s">Did you know that asteroids are <strong>profitable</strong>?</h2>
				<ul>
					<li class="wow slideInRight" data-wow-delay="0.4s">They contain <strong>iron</strong>, <strong>nickel</strong> and <strong>cobalt</strong>, sometimes in incredible quantities</li>
					<li class="wow slideInRight" data-wow-delay="0.5s">Rare metals like <strong>platinum</strong>, <strong>iridium</strong> and <strong>palladium</strong>.</li>
					<li class="wow slideInRight" data-wow-delay="0.6s">A single platinum-rich <strong>500-meters</strong> wide asteroid contains about <strong>174 times</strong> the <strong>yearly</strong> world output of platinum.</li>
				</ul>
			</div>
			<div style="clear:both;"></div>
		</section>
		
		<!-- Cash -->
		<section id="cash" class="wow fadeInUp">
			<div class="cash-count wow flipInX" data-wow-offset="200" data-wow-delay="0.1s"></div>
			
			<div class="cash-description">
				<div class="wow fadeInUp" data-wow-delay="0.3s">
					(Those are 100 <strong class="wow fadeInUp" data-wow-delay="0.4s">trillion</strong> dollars)
				</div>
				<br />
				<p class="wow fadeInUp" data-wow-delay="1.3s">
					This is the available <strong>profit</strong> deriving from only the <strong>115</strong> Near-Earth Orbit most-valuable asteroids.
				</p>
			</div>
		</section>
		
		<section id="public-debt">
			<div class="usa-shape-box wow bounceInUp" data-wow-delay="1.6s">
				<div class="usa-shape"></div>
			</div>
			<div class="usa-shape-description wow fadeInUp" data-wow-delay="1.8s">More than <strong>6 times</strong> the U.S.A. gross domestic product.</div>
			<div style="clear:both;"></div>
		</section>
		
		<!-- Danger -->
		<section id="danger">
			<p id="danger-title" class="wow pulse" data-wow-delay="0.4s">
				But it's not all peaches and cream.
			</p>
			
			<p class="wow fadeInRight" data-wow-offset="200">There are 10825 Near-Earth Orbit asteroids.</p>
			<br />
			<p class="wow fadeInRight" data-wow-offset="200" data-wow-delay="0.6s"><strong>1466</strong> of these are potentially hazardous.</p>
		</section>
		
		<!-- Scripts -->
		<!-- <script type='text/javascript' src='resources/js/google-ajax.min.js'></script> -->
		<script type='text/javascript' src='resources/js/jquery.min.js'></script>
		<script type="text/javascript" src="resources/js/waypoints.min.js"></script>
		<script type="text/javascript" src="resources/js/jquery.countTo.js"></script>
		<script type="text/javascript" src="resources/js/wow.js"></script>
		<script>
			new WOW().init();
		</script>
		
		<script type="text/javascript" src="resources/js/animation.js"></script>
	</body>
</html>

