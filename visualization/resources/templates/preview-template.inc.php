<?php
/** Template file for creating preview popovers for individual asteroids **/

$dollar_value = $_POST['dollar'];
$danger_value = $_POST['danger'];
$opacity = $_POST['opacity'];

?>
<div class="popover-wrapper">
	<ul class="list-group" id="change-state">
		<li class="dollar-value list-group-item list-group-item-success">$<?php echo $dollar_value; ?></li>
		<li class="danger-value list-group-item" style="background-color: rgba(255,0,0, <?php echo $opacity; ?>);"><?php echo $danger_value; ?></li>
	</ul>	
</div><!--/.popover-wrapper-->
				 