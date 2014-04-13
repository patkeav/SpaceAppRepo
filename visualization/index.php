<html>
	<script type='text/javascript' src='resources/js/google-ajax.min.js'></script>
	<script type='text/javascript' src='resources/js/jquery.min.js'></script>
	<script src="resources/js/bootstrap.min.js"></script>
	<link href="resources/css/bootstrap.min.css" rel="stylesheet" />
	<link href="resources/css/bootstrap-theme.min.css" rel="stylesheet" />
	<link href="resources/css/style.css" rel="stylesheet" />
	<head>
	</head>
	<body class="container">
		<h1> Asteroid Map </h1>
		<div id="sun-div"></div>
		<div id="earth-div"></div>
	</body>
	<script type="text/javascript" src="resources/js/asterank.js"></script>
		<script type="text/javascript" src="resources/js/data-loader.js"></script>
	<script type="text/javascript">
	
	$(document).ready(function() {
	});
	
	/** Passes each element in the JSON to a template file, which creates the asteroid details **/ 
	var elements = [];
	$.each(app.data.asteroids, function(i, asteroid) {
		$.ajax({
			url: "resources/templates/asteroid-template.inc.php",
			type: "POST",
			data: {object: this},
			success:function(result){
				elements.push(result);
				},
			error:function(response){console.log("Error creating Asteroid" + response);}
		}).done(function() {
			$.each(elements, function(i) {	
				$(elements[i]).appendTo("body.container");
			});
		});
	});
	
	
	/** Function for creating the preview popover
		@param element: the element to create the popover for
	**/
	function createPreviewPopover(element) {
		//$(element).css("-webkit-transform","scale(1.5) translate(" + $(element).attr('data-xpos') + "px, " + $(element).attr('data-ypos') + "px)");
		$(element).popover({trigger: 'manual'})
		var dollar = $(element).attr('data-price');
		var danger = $(element).attr('data-closeness');
		var opacity = $(element).attr('data-danger-opacity');
		var content;
		$.ajax({
				url: "resources/templates/preview-template.inc.php",
				type: "POST",
				data: {dollar: dollar, danger:danger, opacity:opacity},
				success:function(result){
					content = result;
					},
				error:function(response){console.log("Error creating Popover Button" + response);}
			}).done(function() {	
			$(element).attr('data-content',content).popover('show');
		});
		$(element).mouseout(function() {
			$(this).not('.detail').popover('hide');
		//	$(this).css("-webkit-transform","scale(1) translate(" + $(this).attr('data-xpos') + "px, " + $(this).attr('data-ypos') + "px)");
		});
		
	}
	
	/** Function for creating the detail popover
		@param element: the element to create the popover for
	**/
	function createDetailPopover(element) {
		$(element).popover({trigger: 'manual'});
		$(element).addClass('detail');
		var dollar = $(element).attr('data-price');
		var danger = $(element).attr('data-closeness');
		var material = $(element).attr('data-material');
		var price = $(element).attr('data-price');
		var profit = $(element).attr('data-profit');
		var traj = $(element).attr('data-closeness');
		var opacity = $(element).attr('data-danger-opacity');
		var content;
		$.ajax({
				url: "resources/templates/detail-template.inc.php",
				type: "POST",
				data: {dollar:dollar, danger:danger, material:material, price:price, profit:profit, traj:traj, opacity:opacity},
				success:function(result){
					content = result;
					},
				error:function(response){alert("Error creating Tumblr Button" + response);}
			}).done(function() {
				$(element).attr('data-content',content).popover('show'); 
//				$('asteroid').not('.detail').popover('hide');
				$('.cancel-button').on('click', function() {
					console.log('yep');
					$('.asteroid-click.detail').popover('hide');
					$(this).parent().removeClass('detail');
				});
			});
				//$(this).parent().parent().parent().closest('asteroid').find('.asteroid-click').popover('hide');
		
	}
	</script>
</html>
