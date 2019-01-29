// @flow
import * as React from 'react';
import withGoogle from '../functions/withGoogle.js';

type Props = {
  setPlace?: Function,
  google: {},
  label?: string,
};

class AutocompleteInput extends React.Component<Props> {
  static defaultProps = {
    setPlace: val => val,
    label: 'Address',
  };

  element = null;

  componentDidUpdate() {
    this.renderAutocomplete();
  }

  listen() {
    const { setPlace } = this.props;
    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete.getPlace();

      if (!place) {
        setPlace(new Error('no place found'));
      }

      setPlace(place);
    });
  }


  renderAutocomplete() {
    const { google } = this.props;

    if (!google) {
      return;
    }

    if (!this.autocomplete) {
      this.autocomplete = new google.maps.places.Autocomplete(this.element, {
        componentRestrictions: {
          country: ['uk'],
        },
      });
    }

    this.autocomplete.setFields(['geometry', 'formatted_address']);
    this.listen();
  }


  render() {
    const { label } = this.props;

    return (
      <label htmlFor="autocomplete">
        {label}
        <input
          id="autocomplete"
          ref={(element) => { this.element = element; }}
          type="text"
          placeholder={label}
        />
      </label>
    );
  }
}

export default withGoogle(AutocompleteInput);
