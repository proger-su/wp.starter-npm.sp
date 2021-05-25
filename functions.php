<?php
add_theme_support( 'title-tag' );
add_theme_support( 'post-thumbnails' );


add_action( 'wp_enqueue_scripts', '_action_starter_front_enqueue_scripts', 9999 );

function _action_starter_front_enqueue_scripts() {
	$front_styles  = 'dist/css/front.css';
	$front_scripts = 'dist/js/front.js';

	wp_enqueue_style( 'starter-front', get_theme_file_uri( $front_styles ), array(), filemtime( get_theme_file_path( $front_styles ) ) );

	wp_enqueue_script( 'starter-front', get_theme_file_uri( $front_scripts ), array(
		'jquery',
		'imagesloaded'
	), filemtime( get_theme_file_path( $front_scripts ) ), true );

	wp_localize_script( 'starter-front', 'starterParams', array(
		'homeUrl'  => home_url( '/' ),
		'ajaxUrl'  => admin_url( 'admin-ajax.php' ),
		'themeUrl' => get_template_directory_uri(),
	) );
}

add_action( 'admin_enqueue_scripts', '_action_starter_admin_enqueue_scripts' );

function _action_starter_admin_enqueue_scripts() {
	$admin_styles  = 'dist/css/admin.css';
	$admin_scripts = 'dist/js/admin.js';

	wp_enqueue_style( 'starter-admin', get_theme_file_uri( $admin_styles ), array(), filemtime( get_theme_file_path( $admin_styles ) ) );
	wp_enqueue_script( 'starter-admin', get_theme_file_uri( $admin_styles ), array(), filemtime( get_theme_file_path( $admin_scripts ) ), true );
}

add_action( 'body_class', '_action_starter_body_class' );

function _action_starter_body_class( $classes ) {

	return $classes;
}