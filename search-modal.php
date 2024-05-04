<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://josephgreve.co
 * @since             1.0.0
 * @package           Search_Modal
 *
 * @wordpress-plugin
 * Plugin Name:       Search Modal
 * Plugin URI:        https://josephgreve.co
 * Description:       Show a beautifully styled search modal whenever a link with the `.jg-search-modal-trigger` is clicked. 
 * Version:           1.0.0
 * Author:            Joe Greve
 * Author URI:        https://josephgreve.co/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       search-modal
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'SEARCH_MODAL_VERSION', '1.0.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-search-modal-activator.php
 */
function activate_search_modal() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-search-modal-activator.php';
	Search_Modal_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-search-modal-deactivator.php
 */
function deactivate_search_modal() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-search-modal-deactivator.php';
	Search_Modal_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_search_modal' );
register_deactivation_hook( __FILE__, 'deactivate_search_modal' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-search-modal.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_search_modal() {

	$plugin = new Search_Modal();
	$plugin->run();

}
run_search_modal();
