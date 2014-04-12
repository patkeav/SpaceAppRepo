<?php

$key = $_POST['key'];

?>

<div class="wrapper">
	<ul class="list-group" id="change-state">
		<li class="dollar-value list-group-item list-group-item-success">Dollar Value for <?php echo $key; ?></li>
		<li class="danger-value list-group-item list-group-item-danger">Danger Value for <?php echo $key; ?></li>
		<li class="material-value list-group-item list-group-item-success">material Value for <?php echo $key; ?></li>
		<li class="price-value list-group-item list-group-item-danger">price Value for <?php echo $key; ?></li>
		<li class="profit-value list-group-item list-group-item-success">profit Value for <?php echo $key; ?></li>
		<li class="tracejtory-value list-group-item list-group-item-danger">trajectory Value for <?php echo $key; ?></li>
	</ul>
</div><!--modal-body-->
				 