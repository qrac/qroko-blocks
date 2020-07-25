<?php

// Debug
//require __DIR__ . '/../debug/ChromePhp.php';

class OpenGraph {
  static public function fetch($URI) {
    $response = wp_remote_get($URI);

    if (!empty($response)) {
      return self::_parse($response['body']);
    } else {
      return false;
    }
  }

  static private function _parse($HTML) {
    $HTML = mb_convert_encoding($HTML, "HTML-ENTITIES", "UTF-8");
    $dom = new DOMDocument();
    @$dom->loadHTML($HTML);
    $xml = simplexml_import_dom($dom);
    $result = array();

    $result['title'] = (string)$xml->xpath('//meta[@property="og:title"]/@content')[0];
    $result['description'] = (string)$xml->xpath('//meta[@property="og:description"]/@content')[0];
    $result['url'] = (string)$xml->xpath('//meta[@property="og:url"]/@content')[0];
    $result['image'] = (string)$xml->xpath('//meta[@property="og:image"]/@content')[0];
    //$result['type'] = (string)$xml->xpath('//meta[@property="og:type"]/@content')[0];

    if (empty($result['title'])) {
      $result['title'] = (string)$xml->xpath('//title')[0];
    }
    if (empty($result['description'])) {
      $result['description'] = (string)$xml->xpath('//meta[@name="description"]/@content')[0];
    }

    if ($result['title'] === 'Access Denied') {
      $result['title'] = null;
    }
    if (strpos($result['image'], 'cdninstagram.com')) {
      $result['image'] = null;
    }

    // Debug
    //ChromePhp::log($xml);
    //ChromePhp::log($result['image']);
    //ChromePhp::log(json_encode($result));

    if (empty($result)) { return false; }

    return $result;
  }
}

function open_graph() {
  $target_url = $_POST['target_url'];
  $esc_target_url = esc_url($target_url);

  $graph = OpenGraph::fetch($esc_target_url);

  $og_title = $graph['title'];
  $og_description = $graph['description'];
  $og_url = $graph['url'];
  $og_image = $graph['image'];
  //$og_type = $graph['type'];

  $esc_og_title = esc_html($og_title);
  $esc_og_description = esc_html($og_description);
  $esc_og_url = esc_url($og_url);
  $esc_og_image = esc_url($og_image);
  //$esc_og_type = esc_html($og_type);

  $merge_esc_title = !$esc_og_title ? $esc_target_url : $esc_og_title;
  $merge_esc_url = !$esc_og_url ? $esc_target_url : $esc_og_url;

  $match_protocol = is_ssl() ? '|^https://.*$|' : '|^https?://.*$|';
  $filter_esc_image = preg_match($match_protocol, $esc_og_image) ? $esc_og_image : null;

  $records[] = array(
    'title' => $merge_esc_title,
    'description' => $esc_og_description,
    'url' => $merge_esc_url,
    'image' => $filter_esc_image,
    //'type' => $esc_og_type
  );

  // Debug
  //ChromePhp::log($merge_esc_title);
  //ChromePhp::log($merge_esc_url);
  //ChromePhp::log(json_encode($records));

  echo json_encode($records);

  die();
}
add_action( 'wp_ajax_open_graph', 'open_graph' );
add_action( 'wp_ajax_nopriv_open_graph', 'open_graph' );