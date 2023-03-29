/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { dateI18n, getSettings } from '@wordpress/date';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { DateTimePicker, Dropdown, Button } from '@wordpress/components';

const PostModifiedDateChange = ({
  editedModified,
  currentModified,
  handleModified,
  meta,
}) => {
  const settings = getSettings();
  const dateTimeFormat = `${settings.formats.date} ${settings.formats.time}`;

  const { _stopmodifiedupdate: freezeModified } = { ...meta };

  return (
    <>
      {freezeModified ? (
        <>
          <span>{__('Last modified', 'clm-date')}</span>
          <b>{dateI18n(dateTimeFormat, currentModified)}</b>
        </>
      ) : (
        <>
          <span>{__('Modified', 'clm-date')}</span>
          <Dropdown
            popoverProps={{ placement: 'bottom-start' }}
            contentClassName="edit-post-post-schedule__dialog"
            renderToggle={({ onToggle, isOpen }) => (
              <>
                <Button
                  className="edit-post-post-schedule__toggle"
                  onClick={onToggle}
                  aria-expanded={isOpen}
                  variant="tertiary"
                >
                  {dateI18n(dateTimeFormat, editedModified)}
                </Button>
              </>
            )}
            renderContent={() => (
              <DateTimePicker
                currentDate={editedModified}
                onChange={(modified) => handleModified(modified)}
                __nextRemoveHelpButton
                __nextRemoveResetButton
              />
            )}
          />
        </>
      )}
    </>
  );
};

export default compose([
  withSelect((select) => {
    return {
      editedModified: select('core/editor').getEditedPostAttribute('modified'),
      currentModified:
        select('core/editor').getCurrentPostAttribute('modified'),
      meta: select('core/editor').getEditedPostAttribute('meta'),
    };
  }),
  withDispatch((dispatch) => {
    return {
      handleModified(modified) {
        document
          .getElementById('clm-modified-date')
          .setAttribute('value', modified);
        dispatch('core/editor').editPost({ modified });
      },
    };
  }),
])(PostModifiedDateChange);
