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
		<div class="row">
			<div id="main-map" class="col-lg-12 ">
				<h2> Asteroid Map </h2>	
				<div id="map-content">
					<button class="asteroid-click" key="asteroid1" data-html="true"
						onMouseOver="createPreviewTooltip(this);"
						onClick="createDetailTooltip(this);" >Asteroid #1</button>
						<br />
					<button class="asteroid-click" key="asteroid2" data-html="true"
						onMouseOver="createPreviewTooltip(this);"
						onClick="createDetailTooltip(this);" >Asteroid #2</button>
						<br />
					<button class="asteroid-click" key="asteroid3" data-html="true"
						onMouseOver="createPreviewTooltip(this);"
						onClick="createDetailTooltip(this);" >Asteroid #3</button>
				</div>
			</div><!--/col-lg-12-->
		</div><!--/row-->
		
		<script type="text/javascript" src="resources/js/asterank.js"></script>
		<script type="text/javascript" src="resources/js/data-loader.js"></script>
	</body>
	<script type="text/javascript">
	
	$(document).ready(function() {
		var dummy_obj = {
						"employees": [
							{ "firstName":"John" , "lastName":"Doe" }, 
							{ "firstName":"Anna" , "lastName":"Smith" }, 
							{ "firstName":"Peter" , "lastName":"Jones" }
						]
					}
	});
	
	function createPreviewTooltip(element) {
		$(element).popover({trigger: 'manual'});
		var key = $(element).attr('key');
		var content;
		$.ajax({
				url: "resources/templates/preview-template.inc.php",
				type: "POST",
				data: {key: key},
				success:function(result){
					content = result;
					},
				error:function(response){alert("Error creating Tumblr Button" + response);}
			}).done(function() {
			
			$(element).attr('data-content',content).popover('show'); 
		});
		$(element).mouseout(function() {
			$(this).popover('hide');
		});
	}
	function createDetailTooltip(element) {
		$(element).popover({trigger: 'manual'});
		var key = $(element).attr('key');
		var content;
		$.ajax({
				url: "resources/templates/detail-template.inc.php",
				type: "POST",
				data: {key: key},
				success:function(result){
					content = result;
					},
				error:function(response){alert("Error creating Tumblr Button" + response);}
			}).done(function() {
			
			$(element).attr('data-content',content).popover('show'); 
		});
		
	}
	</script>
</html>
<?php //include('includes/state-nav.inc.php'); 
?>
