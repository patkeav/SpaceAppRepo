<?php
/** Template file for creating detail popovers for individual asteroids **/

$name = $_POST['name'];
$dollar_value = $_POST['dollar'];
$danger_value = $_POST['danger'];
$material_value = $_POST['material'];
$profit_value = $_POST['profit'];
$trajectory_value = $_POST['traj'];
$opacity = $_POST['opacity'];

?>

<div class="popover-wrapper">
	<ul class="list-group" id="change-state">
		<li class="dollar-value list-group-item "><h2><?php echo $name; ?></h2></li>
		<li class="dollar-value list-group-item list-group-item-success">Dollar Value: $<?php echo $dollar_value; ?></li>
		<li class="danger-value list-group-item " style="background-color: rgba(255,0,0, <?php echo $opacity; ?>);">Proximity to Earth: <?php echo $danger_value; ?></li>
		<li class="material-value list-group-item list-group-item-info">Materials: <?php echo $material_value; ?></li>
		<li class="profit-value list-group-item list-group-item-info">Profit: $<?php echo $profit_value; ?></li>
		<li class="tracejtory-value list-group-item list-group-item-info">Trajectory: <?php echo $trajectory_value; ?></li>
	</ul>
	<button class="cancel-button">Cancel</button>
</div><!--/.popover-wrapper-->
				 