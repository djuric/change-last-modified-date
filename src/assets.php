<?php
/**
 * Register assets.
 *
 * @package Clm_Date
 */

/**
 * Enqueue assets.
 */
function clm_register_assets() {

	wp_enqueue_script( 'clm', CLM_DATE_PLUGIN_URL . 'block-editor/dist/index.js', [], CLM_DATE_VERSION, true );
	wp_set_script_translations( 'clm', 'change-last-modified-date' );
}

add_action( 'enqueue_block_editor_assets', 'clm_register_assets' );
