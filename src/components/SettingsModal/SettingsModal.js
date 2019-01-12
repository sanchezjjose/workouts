import React, { Component } from 'react';

import './SettingsModal.css';

class SettingsModal extends Component {

  render() {
    return (
      <div className='SettingsModal'>
        <div className="mdc-form-field">
          <div className="mdc-radio">
            <input className="mdc-radio__native-control" type="radio" id="radio-1" name="radios" checked />
            <div className="mdc-radio__background">
              <div className="mdc-radio__outer-circle"></div>
              <div className="mdc-radio__inner-circle"></div>
            </div>
          </div>
          <label htmlFor="radio-1">Radio 1</label>
        </div>
      </div>
    );
  }
}

export default SettingsModal;
