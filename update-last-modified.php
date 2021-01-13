<?php
/**
 * The plugin bootstrap file
 * 
 * @package Clm_Date
 * 
 * @wordpress-plugin
 * Plugin Name:       Change Last Modified Date
 * Plugin URI:        https://zarko.dev
 * Description:       Change or prevent updating Last Modified date for each post when editing from admin panel.
 * Version:           1.4.2
 * Author:            Zarko
 * Author URI:        https://zarko.dev
 * Text Domain:       clm-date
 * Domain Path:       /languages
 * License:           GPLv3 or later
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

define( 'CLM_DATE_VERSION', '1.4.2' );
define( 'CLM_DATE_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'CLM_DATE_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

require_once CLM_DATE_PLUGIN_DIR . 'src/meta.php';
require_once CLM_DATE_PLUGIN_DIR . 'src/filters.php';
require_once CLM_DATE_PLUGIN_DIR . 'src/assets.php';
