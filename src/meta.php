<?php
/**
 * Register meta fields.
 * 
 * @package Clm_Date
 */

register_meta(
	'post',
	'_stopmodifiedupdate',
	[
		'show_in_rest'  => true,
		'type'          => 'boolean',
		'single'        => true,
		'auth_callback' => '__return_true',
	]
);

register_meta(
	'post',
	'_modified_date',
	[
		'show_in_rest'  => true,
		'type'          => 'string',
		'single'        => true,
		'auth_callback' => '__return_true',
	]
);
