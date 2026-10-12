<?php
/**
 * Plugin Name:       Orthodox Calendar Block
 * Description:       Displays daily Orthodox Calendar information from 
 * Version:           0.11.1
 * Requires at least: 6.8.0
 * Requires PHP:      7.4
 * Author:            Dustin Vietzke, David Leselidze
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       orthodox-calendar-block
 *
 * @package OrthodoxCalendar
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

define( 'ORTHOCAL_DIR', __DIR__ );
define( 'ORTHODOX_CALENDAR_BLOCK_VERSION', "0.10.0" );
define( 'ORTHODOX_CALENDAR_BLOCK_ALLOWED_HOST', 'www.holytrinityorthodox.com' );
define( 'ORTHODOX_CALENDAR_BLOCK_NONCE_MESSAGE', '<p>Nonce shall pass.</p>' );
define( 'ORTHODOX_CALENDAR_BLOCK_DEFAULT_MESSAGE', '<p>Blessed is he who comes in the name of the LORD.</p>' );
define( 'ORTHODOX_CALENDAR_BLOCK_ERROR_MESSAGE', '<p>An error occurred</p>' );


/**
 * Registers the block(s) metadata from the `blocks-manifest.php` and registers the block type(s)
 * based on the registered block metadata. Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
 */
function orthocalbl_create_block_init() {
	// Init config values
	wp_interactivity_config( 'orthocalbl', array(
		'url_day'		=> admin_url('admin-ajax.php?action=orthocalbl_request', __FILE__),
		'url_popup'		=> admin_url('admin-ajax.php?action=orthocalbl_popup', __FILE__),
		'sec_req'		=> wp_create_nonce('orthocalbl-request'),
		'sec_pop'		=> wp_create_nonce('orthocalbl-popup'),
		'translations'		=> array(
			'loading'		=> __( 'Loading...', 'orthocalbl' ),
			'error'			=> __( 'An error occurred', 'orthocalbl' ),
		),
	) );


	wp_register_block_types_from_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
}
add_action( 'init', 'orthocalbl_create_block_init' );

/**
 * Only enqueue block js if block is in content
 *
 * @return void
 */
function orthocalbl_enqueue_if_block_is_present(){
	if ( has_block('orthodox-calendar-block/orthodox-calendar-block', get_the_ID()) ) {
		wp_enqueue_script('orthocalbl-script');
	}
}
add_action('wp_enqueue_scripts','orthocalbl_enqueue_if_block_is_present');
add_action('admin_enqueue_scripts','orthocalbl_enqueue_if_block_is_present');


/**
 * Convert Windows-1251 content to UTF-8.
 *
 * @param string $content string to convert
 * @return string
 */
function orthocalbl_content_to_utf8( $content ) {
	if ( !is_string( $content ) || empty($content) ) {
		return '';
	}

	$str_return = $content;

	if ( function_exists( 'mb_convert_encoding' ) ) {
		$converted = mb_convert_encoding( $content, 'UTF-8', 'Windows-1251' );
		if ( $converted !== false ) {
			$str_return = $converted;
		}
	} else if ( function_exists( 'iconv' ) ) {
		$converted = iconv( 'Windows-1251', 'UTF-8//IGNORE', $content );
		if ( $converted !== false ) {
			$str_return = $converted;
		}
	}

	return $str_return;
}


/**
 * Allowed HTML tags and atts
 *
 * @return array
 */
function orthocalbl_get_allowed_html() {
	return array(
		'p'      => array(
			'class' => true,
			'align' => true,
		),
		'span'   => array( 'class' => true ),
		'a'      => array(
			'class'               	=> true,
			'href'                	=> true,
			'title'               	=> true,
			'data-orthodox-popup' 	=> true,
			'target'			  	=> true,
		),
		'img'    => array(
			'src'    => true,
			'alt'    => true,
			'title'  => true,
			'border' => true,
			'width'  => true,
			'height' => true,
		),
		'b'      => array(),
		'strong' => array(),
		'i'      => array(),
		'em'     => array(),
		'sup'    => array(),
		'br'     => array(),
		'table'  => array(),
		'th'     => array(),
		'tr'     => array(),
		'td'     => array(),
	);
}


/**
 * Get remote content url
 *
 * @param string $lang
 * @return string
 */
function orthocalbl_get_site_url( $lang ) {
	$rootPath = "https://" . ORTHODOX_CALENDAR_BLOCK_ALLOWED_HOST . "/";
	$langPath = ($lang == "en") ? "" :  $lang . "/";
	$calendarPath = "calendar/";

	return $rootPath . $langPath . $calendarPath;
}


/**
 * Get updated remote popup content path based on language
 *
 * @param string $lang
 * @return string
 */
function orthocalbl_get_popup_url( $lang ) {
	// https://www.holytrinityorthodox.com/htc/ocalendar/ru/los/September/20-01.htm
	$rootPath = "https://" . ORTHODOX_CALENDAR_BLOCK_ALLOWED_HOST . "/";
	$calendarPath = "htc/ocalendar/";
	$langPath = ($lang == "en") ? "" :  $lang . "/";

	return $rootPath . $calendarPath . $langPath;
}


/**
 * Convert relative URLs in selected remote tags to absolute safe URLs.
 *
 * @param string $html Remote HTML.
 * @return string
 */
function orthocalbl_normalize_remote_urls( $html, $lang ) {
	$site_url = orthocalbl_get_site_url( $lang );

	foreach ( array( 'href', 'src' ) as $attribute ) {
		$html = preg_replace_callback(
			'/<' . ( 'href' === $attribute ? 'a' : 'img' ) . '\\b[^>]*\\s' . $attribute . '\\s*=\\s*(["\'])(.*?)\\1[^>]*>/i',
			function ( $matches ) use ( $attribute, $site_url, $lang ) {
				$url = html_entity_decode( $matches[2], ENT_QUOTES, 'UTF-8' );
				if ( '' === $url || 0 === strpos( $url, '#' ) || preg_match( '#^javascript:#i', $url ) ) {
					return $matches[0];
				}

				$absolute = wp_http_validate_url( $url ) ? $url : '';
				if ( '' === $absolute ) {
					$absolute = esc_url_raw( $url, array( 'http', 'https' ) );
				}

				if ( '' !== $absolute && 0 !== strpos( $absolute, 'http://' ) && 0 !== strpos( $absolute, 'https://' ) ) {
					$absolute = trailingslashit( $site_url ) . ltrim( $url, '/' );
				}

				if ( '' === $absolute || ! orthocalbl_is_allowed_remote_url( $absolute, $lang ) ) {
					return preg_replace( '/\\s' . preg_quote( $attribute, '/' ) . '\\s*=\\s*(["\'])(.*?)\\1/i', '', $matches[0] );
				}

				return preg_replace_callback(
					'/\\s' . preg_quote( $attribute, '/' ) . '\\s*=\\s*(["\'])(.*?)\\1/i',
					function ( $attribute_match ) use ( $attribute, $absolute ) {
						return ' ' . $attribute . '="' . esc_attr( $absolute ) . '"';
					},
					$matches[0]
				);
			},
			$html
		);
	}

	return is_string( $html ) ? $html : '';
}


/**
 * Return allowed base URL paths for the selected language.
 *
 * @return array
 */
function orthocalbl_get_allowed_paths( $lang ) {
	$site_url = orthocalbl_get_site_url( $lang );
	$parts  = wp_parse_url( $site_url );
	$path   = isset( $parts['path'] ) ? untrailingslashit( $parts['path'] ) : '';
	return array( $path );
}


/**
 * Determine whether a remote URL is permitted.
 *
 * @param string $url URL.
 * @return bool
 */
function orthocalbl_is_allowed_remote_url( $url, $lang ) {
	$url = esc_url_raw( $url );
	if ( '' === $url ) {
		return false;
	}

	$parts = wp_parse_url( $url );
	if ( empty( $parts['scheme'] ) || empty( $parts['host'] ) ) {
		return false;
	}

	if ( 'https' !== strtolower( $parts['scheme'] ) || ORTHODOX_CALENDAR_BLOCK_ALLOWED_HOST !== strtolower( $parts['host'] ) ) {
		return false;
	}

	$path = isset( $parts['path'] ) ? $parts['path'] : '/';
	foreach ( orthocalbl_get_allowed_paths( $lang ) as $allowed_path ) {
		if ( 0 === strpos( untrailingslashit( $path ), $allowed_path ) ) {
			return true;
		}
	}

	return false;
}


/**
 * Replace the known popup inline JavaScript with a safe data attribute.
 *
 * @param string $html Calendar HTML.
 * @return string
 */
function orthocalbl_prepare_popup_links( $html ) {
	if ( ! is_string( $html ) || '' === $html ) {
		return '';
	}

	// ensure DOMDocument handles UTF-8 encoding correctly - this will get filtered out
	$html = '<meta http-equiv="content-type" content="text/html; charset=utf-8">' . $html;

	$dom = new DOMDocument;                 		// init new DOMDocument
	$dom->loadHTML($html, LIBXML_NOERROR);          // load HTML into it
	$xpath = new DOMXPath($dom);            		// create a new XPath
	$nodes = $xpath->query('//*[@onclick]');  		// Find elements with an onclick attribute
	foreach ($nodes as $node) {              		// Iterate over found elements
		$node->removeAttribute('onclick');    		// Remove onclick attribute
	}
	$anchors = $dom->getElementsByTagName("a");		// Find anchor elements
	foreach ($anchors as $link) {              		// Iterate over found elements
		$link->setAttribute('data-orthodox-popup', '1'); 	// Add popup attribute for JS
		$link->setAttribute('target', '_blank');    // Add target attribute to open in new window by default
	}
	
	return $dom->saveHTML();
}


/**
 * Check HTML Element tag attribute for valid url
 *
 * @param string $html
 * @param string $tagname
 * @param string $att
 * @param string $lang
 * @return string
 */
function orthocalbl_check_tag_attribute_urls( $html, $tagname, $att, $lang ) {
	$regex_tag = '/<' . $tagname . '\b[^>]*>/i';
	$regex_att = '/\s' . $att . '\s*=\s*(["\'])(.*?)\1/i';

	return preg_replace_callback(
		$regex_tag,
		function ( $matches ) use ( $regex_att, $lang ) {
			$tag = $matches[0];
			if ( preg_match( $regex_att, $tag, $href ) ) {
				$url = html_entity_decode( $href[2], ENT_QUOTES, 'UTF-8' );
				if ( ! orthocalbl_is_allowed_remote_url( $url, $lang ) ) {
					$tag = preg_replace( $regex_att, '', $tag );
				}
			}
			return $tag;
		},
		$html
	);
}


/**
 * Sanitize remote HTML and remove unapproved URLs.
 *
 * @param string $html Calendar HTML.
 * @return string
 */
function orthocalbl_sanitize_html( $html, $lang ) {
	if ( empty($html) ||  ! is_string( $html ) ) {
		return '';
	}

	$html = orthocalbl_prepare_popup_links( $html );
	// $html = orthocalbl_normalize_remote_urls( $html, $lang );
	$html = orthocalbl_check_tag_attribute_urls( $html, 'a', 'href', $lang );
	// $html = orthocalbl_check_tag_attribute_urls( $html, 'img', 'src', $lang );
	$html = wp_kses( $html, orthocalbl_get_allowed_html() );

	return is_string( $html ) ? $html : '';
}


/**
 * Return array of supported languages objects
 *
 * @return void
 */
function orthocalbl_get_languages() {
	return [
		[ "label" => __("English", "orthocalbl"), "code" => "en" ],
		[ "label" => __("Russian", "orthocalbl"), "code" => "ru" ]
	];
}


/**
 * Validate the passed language code is supported
 *
 * @param string $lang
 * @return boolean
 */
function orthocalbl_validate_languate_code( $lang ) {
	$langs = orthocalbl_get_languages();

	foreach ( $langs as $data ) {
		foreach ( $data as $key => $value ) {
			if ( $key === "code" && $value === $lang ) {
				return true;
			}
		}
	}

	return false;
}


// For logged-in users
add_action('wp_ajax_orthocalbl_request', 'orthocalbl_ajax_request');
// For non-logged-in users
add_action('wp_ajax_nopriv_orthocalbl_request', 'orthocalbl_ajax_request');
/**
 * Hangle request for daily information
 *
 * @return JSON
 */
function orthocalbl_ajax_request() {

    // EXIT & send back error
	if ( !isset( $_REQUEST['sec_req'] ) || !wp_verify_nonce( $_REQUEST['sec_req'], 'orthocalbl-request' ) ) {
		wp_send_json_error( wp_kses_post(ORTHODOX_CALENDAR_BLOCK_NONCE_MESSAGE) );
	}

	$props = array(
		'month'			=> $_REQUEST['month'],
		'day'			=> $_REQUEST['today'],
		'year'			=> $_REQUEST['year'],
		'editor'		=> $_REQUEST['editor'],
		'liveinfo'		=> $_REQUEST['liveinfo'],
		'cachebuster'	=> $_REQUEST['cachebuster'],
		'dt'			=> $_REQUEST['dt'],
		'hh'			=> $_REQUEST['header'],
		'll'			=> $_REQUEST['lives'],
		'ss'			=> $_REQUEST['scripture'],
		'tt'			=> $_REQUEST['trp'],
		'lang'			=> $_REQUEST['language'],
	);

	$resp = orthocalbl_get_request_content($props);

	if ( !$resp['success'] ) {
    	wp_send_json_error($resp['data']);
	}

	// EXIT & send back content
    wp_send_json_success($resp['data']);
}


function orthocalbl_get_request_content($props) {
	// get date components
	$date = getdate();
	$month = orthocalbl_validate_var_int($props['month'], $date['mon'], 1, 12 );
	$day = orthocalbl_validate_var_int($props['day'], $date['mday'], 1, 31);
	$year = orthocalbl_validate_var_int($props['year'], $date['year'], 1900, 2200  );

	// EXIT & send back invalid date error
	if ( ! checkdate( $month, $day, $year ) ) {
		return array(
			'success' => false,
			'data' => 'Invalid date: ' . $month . '/' . $day . '/' . $year,
			'code' => 400,
		);
	}


	$contents = ORTHODOX_CALENDAR_BLOCK_DEFAULT_MESSAGE;
	$editor = orthocalbl_validate_var_int($props['editor'], 0, 0, 1);
	$liveinfo = orthocalbl_validate_var_int($props['liveinfo'], 1, 0, 1);
	$cachebuster = orthocalbl_validate_var_int($props['cachebuster'], 0, 0, 1);

	$dt = orthocalbl_validate_var_int($props['dt'], 1, 0, 1);
	$header = orthocalbl_validate_var_int($props['hh'], 1, 0, 1);
	$lives = orthocalbl_validate_var_int($props['ll'], 3, 0, 1);
	$scripture = orthocalbl_validate_var_int($props['ss'], 1, 0, 1);
	$trp = orthocalbl_validate_var_int($props['tt'], 0, 0, 1);
	$lang = orthocalbl_validate_var_string($props['lang'], 'en');

	// default to English if bad language code sent
	if ( ! orthocalbl_validate_languate_code($lang) ) {
		$lang = "en";
	}

	// EXIT & send back our static stored info for editing
	if ( !$liveinfo ) {
		$contents = orthocalbl_get_static_text($dt, $header, $lives, $scripture, $trp);
		return array(
			'success' => true,
			'data' => $contents,
			'code' => 200,
		);
	}

	// create unique cache key for reducing remote api calls
	$cache_key = sprintf(
		'orthocalbl_%s_%04d_%02d_%02d_%d_%d_%d_%d_%d',
		$lang,
		$year,
		$month,
		$day,
		$dt,
		$header,
		$lives,
		$trp,
		$scripture
	);

	// check if we already requested this info
	if ( $cachebuster !== 1 ) {
		$contents = get_transient( $cache_key );

		// EXIT & return cached content if found
		if ( ! empty($contents) ) {
			return array(
				'success' => true,
				'data' => $contents,
				'code' => 200,
			);
		}
	} else {
		// clear cache
		delete_transient( $cache_key );
	}

	// create path for remote content
	$root_path = orthocalbl_get_site_url($lang);
	$remote_path = $root_path . "calendar2.php";

	// add query params to remote path
	$remote_path = add_query_arg(
		array(
			'month'     => $month,
			'today'     => $day,
			'year'      => $year,
			'dt'        => $dt,
			'hh'		=> $header,
			'll'		=> $lives,
			'ss'		=> $scripture,
			'tt'		=> $trp,
		),
		$remote_path
	);

	// fetch the remote data
	$response = wp_remote_get(
		$remote_path,
		array(
			'timeout'     => 15,
			'redirection' => 3,
			'user-agent'  => 'Orthodox Calendar Block/' . ORTHODOX_CALENDAR_BLOCK_VERSION . '; ' . home_url( '/' ),
		)
	);

	// this checks for a 200 response code as well
	$body = wp_remote_retrieve_body( $response );

    // good response from remote server
	if ( !empty($body) ) {
		// make UTF-8 for translations
		$contents = orthocalbl_content_to_utf8( $body );

		if ( empty($contents) ) {
			return array(
				'success' => false,
				'data' => '<p>Error converting content to UTF-8.</p>',
				'code' => 500,
			);
		}
		// make sure the content is clean
		$contents = orthocalbl_sanitize_html( $contents, $lang );
		if ( empty($contents) ) {
			return array(
				'success' => false,
				'data' => '<p>Error sanitizing content.</p>',
				'code' => 500,
			);
		}

		// store contents to avoid redundant requests
		set_transient( $cache_key, $contents, DAY_IN_SECONDS );
	} else if ( $editor ) {
		// make sure we send something back if admin editing
		$contents = orthocalbl_get_static_text($dt, $header, $lives, $scripture, $trp);
	}

	return array(
		'success' => true,
		'data' => $contents,
		'code' => 200,
	);
}


/**
 * Get named var value from reqeust
 *
 * @param string $name
 * @param integer $default
 * @return integer
 */
function orthocalbl_get_request_var_int($name, $default, $min, $max) {
	if ( !isset( $_REQUEST[$name] ) ) {
		return $default;
	}

	return orthocalbl_validate_var_int( wp_unslash($_REQUEST[$name]) );
}

function orthocalbl_validate_var_int($value, $default, $min, $max) {
	if ( !isset( $value ) ) {
		return $default;
	}

	$value = absint( $value );
	$inrang = ( $min <= $value && $value <= $max  );

	return ( $inrang ) ? $value : $default;
}

function orthocalbl_get_request_var_array($name, $default = array()) {
	if ( !isset( $_REQUEST[$name] ) ) {
		return $default;
	}

    return orthocalbl_validate_var_array($_REQUEST[$name]);
}
function orthocalbl_validate_var_array($value, $default = array()) {
	if ( !isset( $value ) ) {
		return $default;
	}

    return rest_sanitize_array($value);
}


/**
 * Get named var value from reqeust
 *
 * @param string $name
 * @param string $default
 * @return string
 */
function orthocalbl_get_request_var_string($name, $default = "") {
	return orthocalbl_validate_var_string(wp_unslash($_REQUEST[$name]), $default);
}

function orthocalbl_validate_var_string($value, $default = "") {
	if (empty( $value )) {
		return $default;
	}
	return (string)$value;
}


/**
 * Determing if running on a local server
 *
 * @return boolean
 */
function orthocalbl_is_local() {
  $whitelist = array(
    '127.0.0.1',
    '::1'
  );

  $remote_addr = array_key_exists('REMOTE_ADDR', $_SERVER) ? sanitize_text_field(wp_unslash($_SERVER['REMOTE_ADDR'])) : '';

  $isLocal = in_array($remote_addr , $whitelist);

  return $isLocal;
}


/**
 * Return contents from a static calendar file
 *
 * @param string $file
 * @return string
 */
function orthocalbl_get_static_file_text($file) {
	$path = ORTHOCAL_DIR . '/build/static-text/' . $file . '.html';
	$contents = '';

	try {
		$contents = file_get_contents($path);
	} catch (\Throwable $th) {
		// ignore and return empty string
	}

	return $contents;
}


/**
 * Return contents of static calendar files
 *
 * @param integer $date
 * @param integer $header
 * @param integer $lives
 * @param integer $scripture
 * @param integer $troparion
 * @return string
 */
function orthocalbl_get_static_text($date, $header, $lives, $scripture, $troparion) {
	$contents = '';

	$contents .= $date ? orthocalbl_get_static_file_text('date') : '';
	$contents .= $header ? orthocalbl_get_static_file_text('header') : '';
	$contents .= $lives ? orthocalbl_get_static_file_text('lives-' . $lives) : '';
	$contents .= $scripture ? orthocalbl_get_static_file_text('scripture-' . $scripture) : '';
	$contents .= $troparion ? orthocalbl_get_static_file_text('troparion-' . $troparion) : '';

	return $contents;
}


/**
 * Get correct popup url
 *
 * @param string $html
 * @param string $path
 * @param string $lang
 * @return void string
 */
function orthocalbl_normalize_popup_urls( $html, $path, $lang ) {
	
	if ( ! is_string( $html ) || empty($html) ) {
		return '';
	}

	$host = orthocalbl_get_allowed_paths( $lang )[0];

	// ensure DOMDocument handles UTF-8 encoding correctly - this will get filtered out
	$html = '<meta http-equiv="content-type" content="text/html; charset=utf-8">' . $html;

	$dom = new DOMDocument;                 				// init new DOMDocument
	$dom->loadHTML($html, LIBXML_NOERROR);              	// load HTML into it

	$images = $dom->getElementsByTagName("img");			// Find image elements

	foreach ($images as $img) {             				// Iterate over found elements
	    $src = $img->getAttribute('src');
		$hostIndex = strpos($src, $host);

		if ( ! $hostIndex ) {								// Check if allowed host is in url
			$src = $path . "/" . $src;						// Set url to passed path
			$img->setAttribute('src', $src);				// Update 'src' attribute
		}

		$parentNode = $img->parentNode;
		if ($parentNode !== null) {
			$parentNode->setAttribute('align', 'center');	// Align images horizontally centered
		}
	}
	
	return $dom->saveHTML();
}


/**
 * Get updated remote content path
 *
 * @param string $url
 * @param string $lang
 * @return string
 */
function orthocalbl_get_popup_path( $url, $lang ) {
	// break url path down
	$path = parse_url($url, PHP_URL_PATH);
	$info = pathinfo($path);
	$file = $info['basename'];

	// create path for remote content
	$root_path = orthocalbl_get_popup_url($lang);
	$parts = explode("/calendar/", $path);
	$file_path = $parts[1] ?? '';
	
	// popup content path
	$popup_path = $root_path . $file_path;

	return $popup_path;
}


// For logged-in users
add_action('wp_ajax_orthocalbl_popup', 'orthocalbl_ajax_popup_content');
// For non-logged-in users
add_action('wp_ajax_nopriv_orthocalbl_popup', 'orthocalbl_ajax_popup_content');
function orthocalbl_ajax_popup_content() {

    // EXIT & send back error
	if ( !isset( $_REQUEST['sec_pop'] ) || !wp_verify_nonce( $_REQUEST['sec_pop'], 'orthocalbl-popup' ) ) {
		wp_send_json_error( wp_kses_post(ORTHODOX_CALENDAR_BLOCK_NONCE_MESSAGE) );
	}

	$contents = ORTHODOX_CALENDAR_BLOCK_DEFAULT_MESSAGE;

	$cachebuster = orthocalbl_get_request_var_int('cachebuster', 0, 0, 1);
	$lang = orthocalbl_get_request_var_string('language', 'en');
	$popup = orthocalbl_get_request_var_string('popup', '');

	// popup content path
	$remote_path = orthocalbl_get_popup_path( $popup, $lang );

	// create unique cache key for reducing remote api calls
	$cache_key = sprintf(
		'orthocalbl_%s_%s',
		$lang,
		parse_url($remote_path, PHP_URL_PATH)
	);

	// check if we already requested this info
	if ( $cachebuster !== 1 ) {
		$contents = get_transient( $cache_key );

		// EXIT & return cached content if found
		if ( $contents !== false ) {
			wp_send_json_success($contents);
		}
	} else {
		// clear cache
		delete_transient( $cache_key );
	}

	// fetch the remote data
	$response = wp_remote_get(
		$remote_path,
		array(
			'timeout'     => 15,
			'redirection' => 3,
			'user-agent'  => 'Orthodox Calendar Block/' . ORTHODOX_CALENDAR_BLOCK_VERSION . '; ' . home_url( '/' ),
		)
	);

	// this checks for a 200 response code as well
	$body = wp_remote_retrieve_body( $response );

    // good response from remote server
	if ( !empty($body) ) {
		$contents = $body;

		// remove line endings
		$contents = str_replace(["\r\n","\r","\n"], "", $contents); 

		$parts = explode("/", $remote_path);	// split parts of url
		array_pop($parts);						// remove file from path
		$srcPath = join("/", $parts);			// combine parts

		// fix relative urls
		$contents = orthocalbl_normalize_popup_urls( $contents, $srcPath, $lang );
		// make sure the content is clean
		$contents = orthocalbl_sanitize_html( $contents, $lang );

		// store contents to avoid redundant requests
		set_transient( $cache_key, $contents, DAY_IN_SECONDS );
	}

	// EXIT & send back content
    wp_send_json_success($contents);
}
