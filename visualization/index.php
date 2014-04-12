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
		<div class="page-header jumbotron">
			<h1>
				Hello World!
			</h1>
		</div><!--/ -->
		<div class="row">
			<div id="main-map" class="col-lg-12 ">
			<div class="page-header" id="map-header">
				<h2> Asteroid Map </h2>
				
			</div>
			<div id="map-content">
				<button class="asteroid-click" id="test-button" key="asteroid1" data-html="true"
					onClick="createDetails(this);" >Asteroid #1</button>
					<br />
				<button class="asteroid-click" id="test-button" key="asteroid2" data-html="true"
					onClick="createDetails(this);" >Asteroid #2</button>
					<br />
				<button class="asteroid-click" id="test-button" key="asteroid3" data-html="true"
					onClick="createDetails(this);" >Asteroid #3</button>
			</div>
			</div><!--/col-lg-12-->
		</div><!--/row-->
		<div class="modal fade" id="modal-asteroid-detail" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<?php include('includes/detail-template.inc.php'); ?>
			</div><!--/modal-dialog--> 
		</div><!--/#modal-media--> 
	</body>
	<script type="text/javascript">
	
	$(document).ready(function() {
		$('.asteroid-click').click(function(){
			$('.asteroid-click').not(this).popover('hide'); //all but this
		});
	});
	
	function createDetails(element) {
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
