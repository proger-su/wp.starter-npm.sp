<?php
if ( ! isset( $attributes ) || ! isset( $content ) ) {
	return;
}

$attributes = wp_parse_args(
	$attributes,
	array(
		'attr'     => '',
	)
);
?>

<div>
	<?php echo $content; ?>
</div>
