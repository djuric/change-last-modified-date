<?php
/**
 * Filter functions to run before post is saved.
 * 
 * @package Clm_Date
 */

/**
 * Append required parameters to REST call.
 *
 * @param stdClass        $prepared_post An object representing a single post prepared for inserting or updating the database.
 * @param WP_REST_Request $request Request object.
 * @return stdClass $prepared_post Resulting post object.
 */
function clm_pass_modified_params( $prepared_post, $request ) {

	$params = $request->get_params();

	if ( isset( $params['modified'] ) ) {
		$prepared_post->clm_modified = $params['modified'];
	}

	if ( isset( $params['meta']['_stopmodifiedupdate'] ) ) {
		$prepared_post->clm_stopmodifiedupdate = $params['meta']['_stopmodifiedupdate'];
	}

	return $prepared_post;
}

$clm_post_types = get_post_types( [ 'show_in_rest' => true ] );

if ( defined( 'CLM_DATE_POST_TYPES' ) ) {
	$clm_post_types = array_merge( $clm_post_types, CLM_DATE_POST_TYPES );
}

foreach ( $clm_post_types as $clm_post_type ) {
	add_filter( "rest_pre_insert_{$clm_post_type}", 'clm_pass_modified_params', 10, 2 );
}

/**
 * Update or prevent updating modified date for the post.
 *
 * @param array $data An array of slashed post data.
 * @param array $postarr An array of sanitized, but otherwise unmodified post data.
 * @return array $data Resulting array of slashed post data.
 */
function clm_update_last_modified( $data, $postarr ) {

	$stop_modified_update = get_post_meta( $postarr['ID'], '_stopmodifiedupdate', true );

	if ( ! empty( $postarr['clm_modified'] ) ) {

		$clm_modified_timestamp = strtotime( $postarr['clm_modified'] );
		$clm_modified_date      = date( 'Y-m-d H:i:s', $clm_modified_timestamp );

		$data['post_modified']     = $clm_modified_date;
		$data['post_modified_gmt'] = $clm_modified_date;
	}

	if ( isset( $postarr['clm_stopmodifiedupdate'] ) ) {

		if ( $postarr['clm_stopmodifiedupdate'] ) {

			$data['post_modified']     = $postarr['post_modified'];
			$data['post_modified_gmt'] = $postarr['post_modified_gmt'];
			
		}   
	} elseif ( $stop_modified_update ) {

		$data['post_modified']     = $postarr['post_modified'];
		$data['post_modified_gmt'] = $postarr['post_modified_gmt'];
		
	}

	return $data;

}

add_filter( 'wp_insert_post_data', 'clm_update_last_modified', 10, 2 );
