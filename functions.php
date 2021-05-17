<?php
add_theme_support( 'title-tag' );
add_theme_support( 'post-thumbnails' );


add_action( 'wp_enqueue_scripts', '_action_starter_enqueue_scripts', 9999 );

function _action_starter_enqueue_scripts() {
    $theme = wp_get_theme();
    wp_enqueue_style( 'starter', get_theme_file_uri('static/css/styles.css'), array(), $theme->get( 'Version' ) );

    wp_enqueue_script( 'starter', get_theme_file_uri('static/js/scripts.js'), array( 'jquery', 'imagesloaded' ), $theme->get( 'Version' ), true );

    wp_localize_script( 'starter', 'starterParams', array(
        'homeUrl'  => home_url( '/' ),
        'ajaxUrl'  => admin_url( 'admin-ajax.php' ),
        'themeUrl' => get_template_directory_uri(),
    ) );
}

add_action( 'body_class', '_action_starter_body_class' );

function _action_starter_body_class( $classes ) {

    return $classes;
}