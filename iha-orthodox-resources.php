<?php
/**
 * Plugin Name:       IHA Orthodox Resources
 * Description:       "This plugin adds resources for use with Orthodox Christian websites"
 * Version:           1.0.0
 * Requires at least: 6.8
 * Requires PHP:      7.4
 * Author:            In Harmony Arts
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       iha-orthodox-resources
 *
 * @package IHAOrthoRes/OrthodoxCalendar
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

define( 'IHA_ORTHODOX_RESOURCES_DIR', __DIR__ );
define( 'IHA_ORTHODOX_RESOURCES_VERSION', "0.10.0" );
define( 'IHA_ORTHODOX_RESOURCES_ALLOWED_HOST', 'www.holytrinityorthodox.com' );
define( 'IHA_ORTHODOX_RESOURCES_NONCE_MESSAGE', '<p>Nonce shall pass.</p>' );
define( 'IHA_ORTHODOX_RESOURCES_DEFAULT_MESSAGE', '<p>Blessed is he who comes in the name of the LORD.</p>' );
define( 'IHA_ORTHODOX_RESOURCES_ERROR_MESSAGE', '<p>An error occurred</p>' );
define( 'IHA_ORTHODOX_RESOURCES_DEFAULT_LANGUAGE', "en" );


/**
 * Registers the block(s) metadata from the `blocks-manifest.php` and registers the block type(s)
 * based on the registered block metadata. Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
 */
function iha_orthodox_resources_create_block_init() {
	// Init config values
	wp_interactivity_config( 'orthores/daily-calendar', array(
		'url_day'		=> admin_url('admin-ajax.php?action=orthores_daily_calendar_request', __FILE__),
		'url_popup'		=> admin_url('admin-ajax.php?action=orthores_daily_calendar_popup', __FILE__),
		'sec_req'		=> wp_create_nonce('orthores-daily-calendar-request'),
		'sec_pop'		=> wp_create_nonce('orthores-daily-calendar-popup'),
		'translations'		=> array(
			'loading'		=> __( 'Loading...', 'iha-orthodox-resources' ),
			'error'			=> __( 'An error occurred', 'iha-orthodox-resources' ),
		),
	) );


	wp_register_block_types_from_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
}
add_action( 'init', 'iha_orthodox_resources_create_block_init' );

/**
 * Only enqueue block js if block is in content
 *
 * @return void
 */
function iha_orthodox_resources_enqueue_if_block_is_present(){
	if ( has_block('orthodox-resources/daily-calendar', get_the_ID()) ) {
	}
}
// add_action('wp_enqueue_scripts','iha_orthodox_resources_enqueue_if_block_is_present');
// add_action('admin_enqueue_scripts','iha_orthodox_resources_enqueue_if_block_is_present');


/**
 * Convert Windows-1251 content to UTF-8.
 *
 * @param string $content string to convert
 * @return string
 */
function iha_orthodox_resources_content_to_utf8( $content ) {
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
function iha_orthodox_resources_get_allowed_html() {
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
function iha_orthodox_resources_get_site_url( $lang ) {
	$rootPath = "https://" . IHA_ORTHODOX_RESOURCES_ALLOWED_HOST . "/";
	$langPath = ($lang == IHA_ORTHODOX_RESOURCES_DEFAULT_LANGUAGE) ? "" :  $lang . "/";
	$calendarPath = "calendar/";

	return $rootPath . $langPath . $calendarPath;
}


/**
 * Get updated remote popup content path based on language
 *
 * @param string $lang
 * @return string
 */
function iha_orthodox_resources_get_popup_url( $lang ) {
	// https://www.holytrinityorthodox.com/htc/ocalendar/ru/los/September/20-01.htm
	$rootPath = "https://" . IHA_ORTHODOX_RESOURCES_ALLOWED_HOST . "/";
	$calendarPath = "htc/ocalendar/";
	$langPath = ($lang == IHA_ORTHODOX_RESOURCES_DEFAULT_LANGUAGE) ? "" :  $lang . "/";

	return $rootPath . $calendarPath . $langPath;
}


/**
 * Convert relative URLs in selected remote tags to absolute safe URLs.
 *
 * @param string $html Remote HTML.
 * @return string
 */
function iha_orthodox_resources_normalize_remote_urls( $html, $lang ) {
	$site_url = iha_orthodox_resources_get_site_url( $lang );

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

				if ( '' === $absolute || ! iha_orthodox_resources_is_allowed_remote_url( $absolute, $lang ) ) {
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
function iha_orthodox_resources_get_allowed_paths( $lang ) {
	$site_url = iha_orthodox_resources_get_site_url( $lang );
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
function iha_orthodox_resources_is_allowed_remote_url( $url, $lang ) {
	$url = esc_url_raw( $url );
	if ( '' === $url ) {
		return false;
	}

	$parts = wp_parse_url( $url );
	if ( empty( $parts['scheme'] ) || empty( $parts['host'] ) ) {
		return false;
	}

	if ( 'https' !== strtolower( $parts['scheme'] ) || IHA_ORTHODOX_RESOURCES_ALLOWED_HOST !== strtolower( $parts['host'] ) ) {
		return false;
	}

	$path = isset( $parts['path'] ) ? $parts['path'] : '/';
	foreach ( iha_orthodox_resources_get_allowed_paths( $lang ) as $allowed_path ) {
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
function iha_orthodox_resources_prepare_popup_links( $html ) {
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
function iha_orthodox_resources_check_tag_attribute_urls( $html, $tagname, $att, $lang ) {
	$regex_tag = '/<' . $tagname . '\b[^>]*>/i';
	$regex_att = '/\s' . $att . '\s*=\s*(["\'])(.*?)\1/i';

	return preg_replace_callback(
		$regex_tag,
		function ( $matches ) use ( $regex_att, $lang ) {
			$tag = $matches[0];
			if ( preg_match( $regex_att, $tag, $href ) ) {
				$url = html_entity_decode( $href[2], ENT_QUOTES, 'UTF-8' );
				if ( ! iha_orthodox_resources_is_allowed_remote_url( $url, $lang ) ) {
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
function iha_orthodox_resources_sanitize_html( $html, $lang ) {
	if ( empty($html) ||  ! is_string( $html ) ) {
		return '';
	}

	$html = iha_orthodox_resources_prepare_popup_links( $html );
	// $html = iha_orthodox_resources_normalize_remote_urls( $html, $lang );
	$html = iha_orthodox_resources_check_tag_attribute_urls( $html, 'a', 'href', $lang );
	// $html = iha_orthodox_resources_check_tag_attribute_urls( $html, 'img', 'src', $lang );
	$html = wp_kses( $html, iha_orthodox_resources_get_allowed_html() );

	return is_string( $html ) ? $html : '';
}


/**
 * Return array of supported languages objects
 *
 * @return array
 */
function iha_orthodox_resources_get_languages() {
	return [
		[ "label" => __("English", "iha-orthodox-resources"), "code" => "en" ],
		[ "label" => __("Russian", "iha-orthodox-resources"), "code" => "ru" ]
	];
}


/**
 * Return array of supported languages code array
 *
 * @return array
 */
function iha_orthodox_resources_get_language_codes() {
	$langs = iha_orthodox_resources_get_languages();
	$codes = array();

	foreach ( $langs as $data ) {
		foreach ( $data as $key => $value ) {
			$codes[] = $key;
		}
	}

	return $codes;
}


/**
 * Return init language from attributes
 *
 * @param array $atts block properties.
 * @return string
 */
function iha_orthodox_resources_get_language_default($atts) {
	$langs = iha_orthodox_resources_validate_var_array($atts['ln'], iha_orthodox_resources_get_language_codes());
	$multi_langs = isset($langs[1]); // just need to know that more than 1 value is set
	$default_lang = !$multi_langs ? $langs[0] : iha_orthodox_resources_validate_var_string(esc_html($atts['dl']), IHA_ORTHODOX_RESOURCES_DEFAULT_LANGUAGE);
	$initlang = !$multi_langs ? $langs[0] : iha_orthodox_resources_validate_var_string(esc_html($atts['lang']), IHA_ORTHODOX_RESOURCES_DEFAULT_LANGUAGE);

	return $initlang;
}


/**
 * Return init language from attributes
 *
 * @param array $atts block properties.
 * @return string
 */
function iha_orthodox_resources_get_multiple_languages($atts) {
	$langs = iha_orthodox_resources_validate_var_array($atts['ln'], iha_orthodox_resources_get_language_codes());
	return isset($langs[1]); // just need to know that more than 1 value is set
}


/**
 * Validate the passed language code is supported
 *
 * @param string $lang
 * @return boolean
 */
function iha_orthodox_resources_validate_languate_code( $lang ) {
	$langs = iha_orthodox_resources_get_languages();

	foreach ( $langs as $data ) {
		foreach ( $data as $key => $value ) {
			if ( $key === "code" && $value === $lang ) {
				return true;
			}
		}
	}

	return false;
}


function iha_orthodox_resources_get_fetch_context() {
	return array(
		'isLoading'         => false,
		'contentHtml'       => "",
		'errorHtml'         => "",
		'oldQsps'           => "",
		'loadingText'       => __("Loading...", 'iha-orthodox-resources'),
	);
}


function iha_orthodox_resources_is_editor() {
	return (defined('REST_REQUEST') && REST_REQUEST && isset($_REQUEST['context']) && ('edit' === $_REQUEST['context']));
}


// For logged-in users
add_action('wp_ajax_orthores_daily_calendar_request', 'iha_orthodox_resources_ajax_request');
// For non-logged-in users
add_action('wp_ajax_nopriv_orthores_daily_calendar_request', 'iha_orthodox_resources_ajax_request');
/**
 * Hangle request for daily information
 *
 * @return JSON
 */
function iha_orthodox_resources_ajax_request() {

    // EXIT & send back error
	if ( !isset( $_REQUEST['sec_req'] ) || !wp_verify_nonce( sanitize_title(wp_unslash($_REQUEST['sec_req'])), 'orthores-daily-calendar-request' ) ) {
		wp_send_json_error( wp_kses_post(IHA_ORTHODOX_RESOURCES_NONCE_MESSAGE) );
	}

	$props = array(
		'month'			=> intval(wp_unslash($_REQUEST['month'] ?? 0)),
		'today'			=> intval(wp_unslash($_REQUEST['today']?? 0)),
		'year'			=> intval(wp_unslash($_REQUEST['year']?? 0)),
		'editor'		=> intval(wp_unslash($_REQUEST['editor'] ?? 0)),
		'li'			=> intval(wp_unslash($_REQUEST['li'] ?? 1)),
		'cb'			=> intval(wp_unslash($_REQUEST['cb'] ?? 0)),
		'dt'			=> intval(wp_unslash($_REQUEST['dt']?? 0)),
		'hh'			=> intval(wp_unslash($_REQUEST['hh']?? 0)),
		'll'			=> intval(wp_unslash($_REQUEST['ll']?? 0)),
		'ss'			=> intval(wp_unslash($_REQUEST['ss']?? 0)),
		'tt'			=> intval(wp_unslash($_REQUEST['tt']?? 0)),
		'lang'			=> sanitize_key(wp_unslash($_REQUEST['lang'] ?? IHA_ORTHODOX_RESOURCES_DEFAULT_LANGUAGE)),
	);

	$resp = iha_orthodox_resources_get_request_content($props);

	if ( !$resp['success'] ) {
    	wp_send_json_error($resp['data'], $resp['code'] ?? 500);
	}

	// EXIT & send back content
    wp_send_json_success($resp['data']);
}


function iha_orthodox_resources_get_request_content($props) {
	// get date components
	$date = getdate();
	$month = iha_orthodox_resources_validate_var_int($props['month'], $date['mon'], 1, 12 );
	$day = iha_orthodox_resources_validate_var_int($props['today'], $date['mday'], 1, 31);
	$year = iha_orthodox_resources_validate_var_int($props['year'], $date['year'], 1900, 2200  );

	// EXIT & send back invalid date error
	if ( ! checkdate( $month, $day, $year ) ) {
		return array(
			'success' => false,
			'data' => 'Invalid date: ' . $month . '/' . $day . '/' . $year,
			'code' => 400,
		);
	}


	$contents = IHA_ORTHODOX_RESOURCES_DEFAULT_MESSAGE;
	$cachebuster = iha_orthodox_resources_validate_var_int($props['cb'] ?? 0, 0, 0, 1);
	$editor = iha_orthodox_resources_validate_var_int($props['editor'], 0, 0, 1);
	$liveinfo = iha_orthodox_resources_validate_var_int($props['li'] ?? 1, 1, 0, 1);

	$dt = iha_orthodox_resources_validate_var_int($props['dt'], 1, 0, 1);
	$header = iha_orthodox_resources_validate_var_int($props['hh'], 1, 0, 1);
	$lives = iha_orthodox_resources_validate_var_int($props['ll'], 3, 0, 1);
	$scripture = iha_orthodox_resources_validate_var_int($props['ss'], 1, 0, 1);
	$trp = iha_orthodox_resources_validate_var_int($props['tt'], 0, 0, 1);
	$lang = iha_orthodox_resources_validate_var_string($props['lang'], IHA_ORTHODOX_RESOURCES_DEFAULT_LANGUAGE);

	// default to English if bad language code sent
	if ( ! iha_orthodox_resources_validate_languate_code($lang) ) {
		$lang = IHA_ORTHODOX_RESOURCES_DEFAULT_LANGUAGE;
	}

	// EXIT & send back our static stored info for editing
	if ( !$liveinfo ) {
		$contents = iha_orthodox_resources_get_static_text($dt, $header, $lives, $scripture, $trp);
		return array(
			'success' => true,
			'data' => $contents,
			'code' => 200,
		);
	}

	// create unique cache key for reducing remote api calls
	$cache_key = sprintf(
		'iha_orthodox_resources_%s_%04d_%02d_%02d_%d_%d_%d_%d_%d',
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
	$root_path = iha_orthodox_resources_get_site_url($lang);
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
			'user-agent'  => 'Orthodox Resources Daily Calendar/' . IHA_ORTHODOX_RESOURCES_VERSION . '; ' . home_url( '/' ),
		)
	);

	// this checks for a 200 response code as well
	$body = wp_remote_retrieve_body( $response );
	$code = wp_remote_retrieve_response_code( $response );
	$error = wp_remote_retrieve_response_message( $response );

	if ( $code !== 200 ) {
		return array(
			'success' => false,
			'data' => IHA_ORTHODOX_RESOURCES_ERROR_MESSAGE . '<p>' . $error . '</p>',
			'code' => $code,
		);
    // good response from remote server
	} else if ( !empty($body) ) {
		// make UTF-8 for translations
		$contents = iha_orthodox_resources_content_to_utf8( $body );

		if ( empty($contents) ) {
			return array(
				'success' => false,
				'data' => '<p>Error converting content to UTF-8.</p>',
				'code' => 500,
			);
		}
		// make sure the content is clean
		$contents = iha_orthodox_resources_sanitize_html( $contents, $lang );
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
		$contents = iha_orthodox_resources_get_static_text($dt, $header, $lives, $scripture, $trp);
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
function iha_orthodox_resources_get_request_var_int($name, $default, $min, $max) {
	if ( !isset( $_REQUEST[$name] ) ) {
		return $default;
	}

	return iha_orthodox_resources_validate_var_int( intval( wp_unslash($_REQUEST[$name] ) ), $default, $min, $max );
}

function iha_orthodox_resources_validate_var_int($value, $default, $min, $max) {
	if ( !isset( $value ) ) {
		return $default;
	}

	$value = absint( $value );
	$inrang = ( $min <= $value && $value <= $max  );

	return ( $inrang ) ? $value : $default;
}

function iha_orthodox_resources_get_request_var_array($name, $default = array()) {
	if ( !isset( $_REQUEST[$name] ) ) {
		return $default;
	}

    return iha_orthodox_resources_validate_var_array( rest_sanitize_array( wp_unslash($_REQUEST[$name]) ), $default );
}
function iha_orthodox_resources_validate_var_array($value, $default = array()) {
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
function iha_orthodox_resources_get_request_var_string($name, $default = "") {
	if ( !isset( $_REQUEST[$name] ) ) {
		return $default;
	}

	return iha_orthodox_resources_validate_var_string( sanitize_text_field(wp_unslash($_REQUEST[$name] ) ), $default);
}

function iha_orthodox_resources_validate_var_string($value, $default = "") {
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
function iha_orthodox_resources_is_local() {
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
function iha_orthodox_resources_get_static_file_text($file) {
	$path = IHA_ORTHODOX_RESOURCES_DIR . '/build/static-text/' . $file . '.html';
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
function iha_orthodox_resources_get_static_text($date, $header, $lives, $scripture, $troparion) {
	$contents = '';

	$contents .= $date ? iha_orthodox_resources_get_static_file_text('date') : '';
	$contents .= $header ? iha_orthodox_resources_get_static_file_text('header') : '';
	$contents .= $lives ? iha_orthodox_resources_get_static_file_text('lives-' . $lives) : '';
	$contents .= $scripture ? iha_orthodox_resources_get_static_file_text('scripture-' . $scripture) : '';
	$contents .= $troparion ? iha_orthodox_resources_get_static_file_text('troparion-' . $troparion) : '';

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
function iha_orthodox_resources_normalize_popup_urls( $html, $path, $lang ) {
	
	if ( ! is_string( $html ) || empty($html) ) {
		return '';
	}

	$host = iha_orthodox_resources_get_allowed_paths( $lang )[0];

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
function iha_orthodox_resources_get_popup_path( $url, $lang ) {
	// break url path down
	$path = wp_parse_url($url, PHP_URL_PATH);
	$info = pathinfo($path);
	$file = $info['basename'];

	// create path for remote content
	$root_path = iha_orthodox_resources_get_popup_url($lang);
	$parts = explode("/calendar/", $path);
	$file_path = $parts[1] ?? '';
	
	// popup content path
	$popup_path = $root_path . $file_path;

	return $popup_path;
}


// For logged-in users
add_action('wp_ajax_orthores_daily_calendar_popup', 'iha_orthodox_resources_ajax_popup_content');
// For non-logged-in users
add_action('wp_ajax_nopriv_orthores_daily_calendar_popup', 'iha_orthodox_resources_ajax_popup_content');
function iha_orthodox_resources_ajax_popup_content() {

    // EXIT & send back error
	if ( !isset( $_REQUEST['sec_pop'] ) || !wp_verify_nonce( sanitize_text_field(wp_unslash($_REQUEST['sec_pop'])), 'orthores-daily-calendar-popup' ) ) {
		wp_send_json_error( wp_kses_post(IHA_ORTHODOX_RESOURCES_NONCE_MESSAGE) );
	}

	$contents = IHA_ORTHODOX_RESOURCES_DEFAULT_MESSAGE;

	$cachebuster = iha_orthodox_resources_get_request_var_int('cb', 0, 0, 1);
	$lang = iha_orthodox_resources_get_request_var_string('lang', IHA_ORTHODOX_RESOURCES_DEFAULT_LANGUAGE);
	$popup = iha_orthodox_resources_get_request_var_string('popup', '');

	if ( empty($popup) ) {
		wp_send_json_error(array(
			'success' => false,
			'data' => '<p>Ivalid path</p>',
			'code' => 403,
		));
	}
	// popup content path
	$remote_path = iha_orthodox_resources_get_popup_path( $popup, $lang );

	// create unique cache key for reducing remote api calls
	$cache_key = sprintf(
		'iha_orthodox_resources_%s_%s',
		$lang,
		wp_parse_url($remote_path, PHP_URL_PATH)
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
			'user-agent'  => 'Orthodox Calendar Block/' . IHA_ORTHODOX_RESOURCES_VERSION . '; ' . home_url( '/' ),
		)
	);

	// this checks for a 200 response code as well
	$body = wp_remote_retrieve_body( $response );
	$code = wp_remote_retrieve_response_code( $response );
	$error = wp_remote_retrieve_response_message( $response );

	if ( $code !== 200 ) {
		return array(
			'success' => false,
			'data' => IHA_ORTHODOX_RESOURCES_ERROR_MESSAGE . '<p>' . $error . '</p>',
			'code' => $code,
		);
    // good response from remote server
	} else if ( !empty($body) ) {
		$contents = $body;

		// remove line endings
		$contents = str_replace(["\r\n","\r","\n"], "", $contents);

		// make UTF-8 for translations
		$contents = iha_orthodox_resources_content_to_utf8( $body );

		if ( empty($contents) ) {
			return array(
				'success' => false,
				'data' => '<p>Error converting content to UTF-8.</p>',
				'code' => 500,
			);
		}

		$parts = explode("/", $remote_path);	// split parts of url
		array_pop($parts);						// remove file from path
		$srcPath = join("/", $parts);			// combine parts

		// fix relative urls
		$contents = iha_orthodox_resources_normalize_popup_urls( $contents, $srcPath, $lang );
		// make sure the content is clean
		$contents = iha_orthodox_resources_sanitize_html( $contents, $lang );
		if ( empty($contents) ) {
			return array(
				'success' => false,
				'data' => '<p>Error sanitizing content.</p>',
				'code' => 500,
			);
		}

		// store contents to avoid redundant requests
		set_transient( $cache_key, $contents, DAY_IN_SECONDS );
	}

	// EXIT & send back content
    wp_send_json_success($contents);
}
