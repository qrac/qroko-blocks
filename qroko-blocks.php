<?php
/**
 * Plugin Name: Qroko Blocks
 * Plugin URI: https://github.com/qrac/qroko-blocks/
 * Description: Custom Blocks for headless WordPress
 * Author: qrac
 * Author URI: https://qrac.jp/
 * Version: 1.3.1
 * Text Domain: qroko-blocks
 * Domain Path: /languages
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package qroko-blocks
 * @author qrac
 * @license GPL-2.0+
 */

defined('ABSPATH') || exit;

//----------------------------------------------------
// Setting: Text Domain
//----------------------------------------------------

add_action('init', function() {
  load_plugin_textdomain('qroko-blocks', false, basename(dirname( __FILE__ )) . '/languages');
});

//----------------------------------------------------
// Setting: Gutenberg Blocks
//----------------------------------------------------

add_action('init', function() {

  // Automatically load dependencies and version
  $editors_asset_file = include(plugin_dir_path(__FILE__) . 'build/editors.asset.php');

  // Register CSS (Editors)
  wp_register_style(
    'qroko-blocks-editors',
    plugins_url('build/editors.css', __FILE__),
    array(),
    filemtime(plugin_dir_path(__FILE__) . 'build/editors.css')
  );

  // Register JavaScript (Editors)
  wp_register_script(
    'qroko-blocks-editors',
    plugins_url('build/editors.js', __FILE__),
    $editors_asset_file['dependencies'],
    $editors_asset_file['version'],
    true
  );

  // Register Block: Section
  register_block_type('qroko-blocks/section', array(
    'editor_style' => 'qroko-blocks-editors',
    'editor_script' => 'qroko-blocks-editors'
  ));

  // Register Block: Box
  register_block_type('qroko-blocks/box', array(
    'editor_style' => 'qroko-blocks-editors',
    'editor_script' => 'qroko-blocks-editors'
  ));

  // Register Block: Blog Card
  register_block_type('qroko-blocks/blog-card', array(
    'editor_style' => 'qroko-blocks-editors',
    'editor_script' => 'qroko-blocks-editors'
  ));

  // Register Block: Compact Box
  /*register_block_type('qroko-blocks/compact-box', array(
    'editor_style' => 'qroko-blocks-editors',
    'editor_script' => 'qroko-blocks-editors'
  ));*/

  // Setting Translations
  if (function_exists('wp_set_script_translations')) {
    wp_set_script_translations('qroko-blocks-editors', 'qroko-blocks',
    plugin_dir_path(__FILE__) . 'languages/');
  }

});

//----------------------------------------------------
// Setting: Gutenberg Front End
//----------------------------------------------------

add_action('wp_enqueue_scripts', function() {
  if (!is_admin()) {

    // Enqueue CSS (Fronts)
    wp_enqueue_style(
      'qroko-blocks-fronts',
      plugins_url('build/fronts.css', __FILE__),
      array(),
      filemtime(plugin_dir_path(__FILE__) . 'build/fronts.css')
    );

    // Enqueue JavaScript (Fronts)
    wp_enqueue_script(
      'qroko-blocks-fronts',
      plugins_url('build/fronts.js', __FILE__),
      array(),
      filemtime(plugin_dir_path(__FILE__) . 'build/fronts.js'),
      true
    );
  }
});

//----------------------------------------------------
// Setting: Gutenberg Blocks Categories
//----------------------------------------------------

add_filter('block_categories', function($categories, $post) {
  return array_merge(
    $categories,
    array(
      array(
        'slug' => 'qroko',
        'title' => __( 'Qroko Blocks', 'qroko-blocks' )
      ),
    )
  );
  return $categories;
}, 10, 2);

//----------------------------------------------------
// Setting: Include Functions
//----------------------------------------------------

require_once('functions/open-graph.php');