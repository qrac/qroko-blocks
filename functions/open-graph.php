<?php
// Debug
//require __DIR__ . '/../debug/ChromePhp.php';

// Composer
require __DIR__ . '/../vendor/autoload.php';
use Embed\Embed;

function open_graph() {
  $target_url = $_POST['target_url'];
  $esc_target_url = esc_url($target_url);

  $graph = Embed::create($esc_target_url);

  $og_title = $graph->title;
  $og_description = $graph->description;
  $og_url = $graph->url;
  $og_image = $graph->image;
  $og_type = $graph->type;

  $esc_og_title = esc_html($og_title);
  $esc_og_description = esc_html($og_description);
  $esc_og_url = esc_url($og_url);
  $esc_og_image = esc_url($og_image);
  $esc_og_type = esc_html($og_type);

  $merge_esc_url = ($esc_og_url === null) ? $esc_target_url : $esc_og_url;

  $match_protocol = is_ssl() ? '|^https://.*$|' : '|^https?://.*$|';
  $filter_esc_image = preg_match($match_protocol, $esc_og_image) ? $esc_og_image : null;

  $records[] = array(
    'title' => $esc_og_title,
    'description' => $esc_og_description,
    'url' => $merge_esc_url,
    'image' => $filter_esc_image,
    'type' => $esc_og_type
  );

  // Debug: Chrome
  //ChromePhp::log(json_encode($graph));
  //ChromePhp::log(json_encode($records));

  echo json_encode($records);

  die();
}
add_action( 'wp_ajax_open_graph', 'open_graph' );
add_action( 'wp_ajax_nopriv_open_graph', 'open_graph' );