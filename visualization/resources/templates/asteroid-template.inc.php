<?php
/** Template file for creating asteroid elements **/

$element = $_POST['object'];

//$element = json_decode($element); 
?>
<asteroid class="asteroid-click" 
	title="Asteroid Details"
	key="<?php echo $element["id"]; ?>"
	data-html="true" 
	data-full-name="<?php echo $element["full_name"]; ?>"
	data-material="diamonds"
	data-price="<?php echo round($element["price"]); ?>"
	data-profit="<?php echo $element["profit"]; ?>"
	data-closeness="<?php echo $element["full_name"]; ?>"
	onMouseOver="createPreviewTooltip(this);"
	onClick="createDetailTooltip(this);" 
	style="bottom: <?php echo round($element["yPos"]); ?>px; right:<?php echo round($element["xPos"]); ?>px">
	<a class="asteroid-click-button"></a>
</asteroid>
