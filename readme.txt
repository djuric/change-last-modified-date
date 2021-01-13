=== Change Last Modified Date ===
Contributors: djuric
Tags: last modified, edit date, edit last modified
Requires at least: 5.1
Tested up to: 5.6
Requires PHP: 5.6
Stable tag: 1.4.2
License: GPLv3 or later
License URI: http://www.gnu.org/licenses/gpl.html

Change or prevent updating Last Modified date for individual posts.

== Description ==

<p>Using this plugin you can easily change or prevent updating the last modified date for each post. Controlling the last modified date can come in handy when you would like to control "order by last modified" for posts (or custom post type).</p>

<p>When this plugin is active it will enable Last modified date options in Status & Visibility panel in sidebar. Changing the modified date can be done by clicking the date link and selecting a new date for the post. It's also possible to disable future updates of the last modified date by setting the "Freeze modified date" option to on.</p>

= Custom post types support =

<p>To update the last modified date, plugin is using "rest_pre_insert_{$post_type}" hook which is executed before "init" where other custom post types are usually registered. This is the reason why plugin is not aware of any additional post types other than those registered by WordPress core. To support additional post types you can add constant in following format to wp-config.php:</p>

<code>
define( 'CLM_DATE_POST_TYPES', ['post-type-slug-1', 'post-type-slug-2'] );
</code>

<p>Custom post types are also required to have "custom-fields" support declared.</p>

= Support =

<p>For support or code contributions please refer to <a href="https://github.com/djuric/change-last-modified-date">Github repo</a>.</p>

== Installation ==
1. Upload zip package to Plugins > Add New in admin of wordpress.
2. Activate the plugin.

== Screenshots ==
1. screenshot-1.png

== Changelog ==
= 1.0 =
* Initial release.

= 1.2 =
* Remove unnecessary directory

= 1.3 =
* Rewrite the plugin for new block editor

= 1.4.2 =
* Fix plugin crashing for custom post types without custom fields support declared