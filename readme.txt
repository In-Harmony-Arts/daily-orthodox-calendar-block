=== IHA Orthodox Resources ===
Contributors:      In Harmony Arts
Tags:              daily,orthodox,calendar,saints,scripture
Requires at least: 6.8.0
Tested up to:      7.1
Stable tag:        1.0.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Orthodox Calendar with lives of the saints, icons, troparions and kontakions. Daily Scripture readings. Feasts, fast days, days of remembrance.

== Description ==

The is a Gutenberg Block instance for loading the daily Orthodox Calendar information from https://www.holytrinityorthodox.com/calendar.

There are settings for all of the options for the calendar as well as options for the assocaited link popup window.

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/orthodox-resources-daily-calendar` directory, or install the plugin through the WordPress plugins screen directly.
1. Activate the plugin through the 'Plugins' screen in WordPress

== Screenshots ==

1. Orthodox Calendar
2. Block setttings

== Changelog ==

= 0.1.0 =
* Release

= 0.2.0 =
* Removed seperate functions PHP file and combined into main PHP file

= 0.3.0 =
* Updated contributors to include original plugin author

= 0.4.0 =
* Added date picker option
* Copy static text files to build folder so they are included in package zip script

= 0.5.0 =
* Name space PHP functions

= 0.5.1 =
* Fix error getting static text

= 0.6.0 =
* Move date picker to end of buttons & wrap

= 0.7.0 =
* Update PHP code to use wp_remote_get
* Update JS code to move all functions outside of init

= 0.8.0 =
* Enqueue JS only if block in on page
* Use block name as contianer class name
* Small cleanup

= 0.9.0 =
* Externalize text into settings

= 0.10.0 =
* Added support and options for Russian language
* Implemented server side sanitizing from original plugin update
* Removed client side sanitizing
* Handle link popups
* Add cachebuster query param

= 0.10.1 =
* Recompile JS

= 0.11.0 =
* Add content overlay for links

= 0.11.1 =
* Uninstall react-resizable

= 1.0.0 =
* Overhaul to use render.php and WP Interactivity API