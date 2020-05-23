function addHiddenModifiedInput() {
  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = 'clm_modified';
  input.id = 'clm-modified-date';

  document
    .getElementsByClassName('metabox-location-normal')[0]
    .appendChild(input);
}

export { addHiddenModifiedInput };
