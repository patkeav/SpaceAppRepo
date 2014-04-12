<?php

$dollar_value = $_POST['dollar'];
$danger_value = $_POST['danger'];
$material_value = $_POST['material'];
$price_value = $_POST['price'];
$profit_value = $_POST['profit'];
$trajectory_value = $_POST['traj'];

?>

<div class="wrapper">
	<ul class="list-group" id="change-state">
		<li class="dollar-value list-group-item list-group-item-success">Dollar Value: $<?php echo $dollar_value; ?></li>
		<li class="danger-value list-group-item list-group-item-danger">Danger Value: <?php echo $danger_value; ?></li>
		<li class="material-value list-group-item list-group-item-info">material Value: <?php echo $material_value; ?></li>
		<li class="price-value list-group-item list-group-item-info">price Value: <?php echo $price_value; ?></li>
		<li class="profit-value list-group-item list-group-item-info">profit Value: <?php echo $profit_value; ?></li>
		<li class="tracejtory-value list-group-item list-group-item-info">trajectory Value: <?php echo $trajectory_value; ?></li>
	</ul>
</div><!--modal-body-->
				 