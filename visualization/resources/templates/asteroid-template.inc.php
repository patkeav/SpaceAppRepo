<?php
/** Template file for creating asteroid elements **/

$element = $_POST['object'];
$random = mt_rand(-100,100);
$scale_value = 0.5 + (($element["est_diameter"] - 0.17))/6; 
//$element = json_decode($element); 
?>


<asteroid class="asteroid-click" 
	title="Asteroid Details"
	data-key="<?php echo $element["id"]; ?>"
	data-html="true" 
	data-full-name="<?php echo $element["full_name"]; ?>"
	data-material="diamonds"
	data-price="<?php echo number_format(round($element["price"])); ?>"
	data-profit="<?php echo number_format($element["profit"]); ?>"
	data-closeness="<?php echo number_format($element["closeness"]); ?>"
	data-xpos="<?php echo $element["xPos"]; ?>"
	data-ypos="<?php echo $element["yPos"]; ?>"
	onMouseOver="createPreviewPopover(this);"
	onClick="createDetailPopover(this);" 
	style="-webkit-transform: scale(<?php echo $scale_value; ?>) translate(<?php echo round($element["xPos"]); ?>px, <?php echo round($element["yPos"]); ?>px)">
	<a class="asteroid-click-button"></a>
</asteroid>
