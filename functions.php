<?php

add_action( 'admin_enqueue_scripts', '_action_starter_admin_enqueue_scripts' );

function _action_starter_admin_enqueue_scripts() {
	$admin_styles  = 'dist/css/admin.css';
	$admin_scripts = 'dist/js/admin.js';

	wp_enqueue_style( 'starter-admin', get_theme_file_uri( $admin_styles ), array(), filemtime( get_theme_file_path( $admin_styles ) ) );
	wp_enqueue_script( 'starter-admin', get_theme_file_uri( $admin_styles ), array(), filemtime( get_theme_file_path( $admin_scripts ) ), true );
}

add_action( 'enqueue_block_editor_assets', '_action_starter_enqueue_block_editor_assets' );

function _action_starter_enqueue_block_editor_assets() {
	$editor_scripts = 'dist/js/editor.js';
	wp_enqueue_script(
		'starter-editor',
		get_theme_file_uri( $editor_scripts ),
		array( 'jquery', 'wp-blocks', 'wp-rich-text', 'wp-element', 'wp-editor' ),
		filemtime( get_theme_file_path( $editor_scripts ) ),
		true
	);
}

/**
 * Enqueue Gutenberg Assets for font-end and back-end
 */
add_action( 'enqueue_block_assets', '_action_starter_enqueue_block_assets' );

function _action_starter_enqueue_block_assets() {
	$editor_styles = 'dist/css/editor.css';
	wp_enqueue_style( 'starter-editor', get_theme_file_uri( $editor_styles ), array( 'dashicons' ), filemtime( get_theme_file_path( $editor_styles ) ) );
}

add_action( 'body_class', '_action_starter_body_class' );

function _action_starter_body_class( $classes ) {

	return $classes;
}

add_action( 'after_setup_theme', '_action_starter_register_nav_menus' );

function _action_starter_register_nav_menus() {
	register_nav_menus(
		array(
			'primary_menu' => esc_html__( 'Primary menu', 'starter' ),
		)
	);
}

add_action( 'init', '_action_starter_register_gutenberg_blocks' );
function _action_starter_register_gutenberg_blocks() {
	$blocks = array(
		'container' => array(
			'attr'     =>
				array(
					'type'    => 'string',
					'default' => '',
				),
		),
	);

	$localize = array(
		'isAdmin' => is_admin(),
		'ajaxUrl' => admin_url( 'admin-ajax.php' ),
	);

	foreach ( $blocks as $block => $attrs ) {
		wp_register_script(
			"starter-{$block}-editor",
			get_theme_file_uri( "dist/blocks/{$block}/editor.js" ),
			array( 'wp-blocks', 'wp-element' ),
			filemtime( get_theme_file_path( "dist/blocks/{$block}/editor.js" ) ),
			true
		);

		wp_register_script(
			"starter-{$block}",
			get_theme_file_uri( "dist/blocks/{$block}/view.js" ),
			array( 'jquery' ),
			filemtime( get_theme_file_path( "dist/blocks/{$block}/view.js" ) ),
			true
		);

		wp_localize_script( "starter-{$block}-editor", preg_replace( '/\W+/', '_', "{$block}BlockParams" ), $localize );
		wp_localize_script( "starter-{$block}", preg_replace( '/\W+/', '_', "{$block}BlockParams" ), $localize );

		wp_register_style(
			"starter-{$block}-editor",
			get_theme_file_uri( "dist/blocks/{$block}/editor.css" ),
			array(),
			filemtime( get_theme_file_path( "dist/blocks/{$block}/editor.css" ) )
		);

		wp_register_style(
			"starter-{$block}",
			get_theme_file_uri( "dist/blocks/{$block}/view.css" ),
			array(),
			filemtime( get_theme_file_path( "dist/blocks/{$block}/view.css" ) )
		);

		register_block_type(
			"starter/{$block}",
			array(
				'render_callback' => function ( $attributes, $content ) use ( $block ) {
					ob_start();
					require get_theme_file_path( "blocks/{$block}/{$block}.php" );

					return trim( ob_get_clean() );
				},
				'editor_script'   => "starter-{$block}-editor",
				'editor_style'    => "starter-{$block}-editor",
				'style'           => "starter-{$block}",
				'script'          => "starter-{$block}",
				'attributes'      => $attrs,
			)
		);
	}
}
