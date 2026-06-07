/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { FormToggle } from '@wordpress/components';

const PostModifiedDateFreeze = ({ meta, handleFreezeModified, editedModified }) => {
  const { _stopmodifiedupdate: stopModifiedUpdate } = { ...meta };

  return (
    <>
      <span>{__('Freeze modified date', 'change-last-modified-date')}</span>
      <FormToggle
        checked={stopModifiedUpdate}
        onChange={() => handleFreezeModified(meta, !stopModifiedUpdate, editedModified)}
      />
    </>
  );
};

export default compose([
  withSelect((select) => {
    return {
      meta: select('core/editor').getEditedPostAttribute('meta'),
      editedModified: select('core/editor').getEditedPostAttribute('modified'),
    };
  }),
  withDispatch((dispatch) => {
    return {
      handleFreezeModified(meta, stopModifiedUpdate, editedModified) {
        const newMeta = {
          ...meta,
          _stopmodifiedupdate: stopModifiedUpdate,
        };
        dispatch('core/editor').editPost({
          meta: newMeta,
          modified: editedModified,
        });
      },
    };
  }),
])(PostModifiedDateFreeze);
