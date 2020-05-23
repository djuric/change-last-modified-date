/**
 * WordPress dependencies
 */
import { registerPlugin } from '@wordpress/plugins';
import { PluginPostStatusInfo } from '@wordpress/edit-post';

/**
 * Internal dependencies
 */
import PostModifiedDateChange from './components/post-modified-date-change';
import PostModifiedDateFreeze from './components/post-modified-date-freeze';
import { addHiddenModifiedInput } from './utils/meta-box-field';

/**
 * Hidden input is required to make it backwards compatible with Meta Boxes.
 */
addHiddenModifiedInput();

const PluginChangeLastModified = () => {
  return (
    <>
      <PluginPostStatusInfo>
        <PostModifiedDateChange />
      </PluginPostStatusInfo>
      <PluginPostStatusInfo>
        <PostModifiedDateFreeze />
      </PluginPostStatusInfo>
    </>
  );
};

registerPlugin('post-change-last-modified', {
  render: PluginChangeLastModified,
});
