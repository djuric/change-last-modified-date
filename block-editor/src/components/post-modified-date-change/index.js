/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { format, __experimentalGetSettings } from '@wordpress/date';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { DateTimePicker, Dropdown, Button } from '@wordpress/components';
import { __experimentalInspectorPopoverHeader as InspectorPopoverHeader } from '@wordpress/block-editor';

const PostModifiedDateChange = ({
  editedModified,
  currentModified,
  publishDate,
  handleModified,
  meta,
}) => {
  const settings = __experimentalGetSettings();
  const dateTimeFormat = `${settings.formats.date} ${settings.formats.time}`;

  const { _stopmodifiedupdate: freezeModified } = { ...meta };

  return (
    <>
      {freezeModified ? (
        <>
          <span>{__('Last modified', 'change-last-modified-date')}</span>
          <b>{format(dateTimeFormat, currentModified)}</b>
        </>
      ) : (
        <>
          <span>{__('Modified', 'change-last-modified-date')}</span>
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
                  {format(dateTimeFormat, editedModified)}
                </Button>
              </>
            )}
            renderContent={() => (
              <>
                <InspectorPopoverHeader
                  title={__('Modified', 'change-last-modified-date')}
                  actions={[
                    {
                      label: __('Copy published', 'change-last-modified-date'),
                      onClick: () => handleModified(publishDate),
                    },
                  ]}
                />
                <DateTimePicker
                  currentDate={editedModified}
                  onChange={(modified) => handleModified(modified)}
                  is12Hour={settings.formats.time.includes('a')}
                  __nextRemoveHelpButton
                  __nextRemoveResetButton
                />
              </>
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
      publishDate: select('core/editor').getEditedPostAttribute('date'),
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
