/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { FormToggle } from '@wordpress/components';

const PostModifiedDateFreeze = ({ meta, handleFreezeModified }) => {
  const { _stopmodifiedupdate: stopModifiedUpdate } = { ...meta };

  return (
    <>
      <span>{__('Freeze modified date', 'clm-date')}</span>
      <FormToggle
        checked={stopModifiedUpdate}
        onChange={() => handleFreezeModified(meta, !stopModifiedUpdate)}
      />
    </>
  );
};

export default compose([
  withSelect((select) => {
    return {
      meta: select('core/editor').getEditedPostAttribute('meta'),
    };
  }),
  withDispatch((dispatch) => {
    return {
      handleFreezeModified(meta, stopModifiedUpdate) {
        const newMeta = {
          ...meta,
          _stopmodifiedupdate: stopModifiedUpdate,
        };
        dispatch('core/editor').editPost({ meta: newMeta });
      },
    };
  }),
])(PostModifiedDateFreeze);
