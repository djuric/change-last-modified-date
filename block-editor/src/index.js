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
  render: PluginChangeLastModified
});
