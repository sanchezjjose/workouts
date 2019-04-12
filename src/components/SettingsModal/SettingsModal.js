import React, { Component } from 'react';
import { saveSettings } from '../../api/Settings';
import { UserContext } from '../UserContext';

import './SettingsModal.css';
import "@material/radio/dist/mdc.radio.min.css";
import "@material/form-field/dist/mdc.form-field.min.css";

class SettingsModal extends Component {
  static contextType = UserContext;

  handleChange = (e) => {
    const userId = this.context.user.id;
    const settings = this.context.settings;
    const type = e.target.name;
    const value = e.target.value;

    settings.setUnit(type, value);

    saveSettings(userId, settings.get())
      .then(() => {
        window.location.reload();  
      });
  }

  handleModeChange = (e) => {
    const userId = this.context.user.id;
    const settings = this.context.settings;
    const value = e.target.value;

    settings.setMode(value);

    saveSettings(userId, settings.get())
      .then(() => {
        this.context.updateSettings(settings);
      });
  }

  render() {
    const colorMode = this.context.settings.getMode();
    const units = this.context.settings.getUnits();
    const weightUnit = units.weight;
    const timeUnit = units.time;
    const distanceUnit = units.distance;

    return (
      <div className='SettingsModal'>
        <div onClick={this.props.handleClose} className='close-modal'>&times;</div>

        <div className='form-field-heading'>Mode</div>
        <div className="mdc-form-field">
          <div className="mdc-radio">
            <input onChange={this.handleModeChange} className="mdc-radio__native-control" type="radio" id="radio-light" name="mode" value="light" checked={colorMode === 'light'} />
            <div className="mdc-radio__background">
              <div className="mdc-radio__outer-circle"></div>
              <div className="mdc-radio__inner-circle"></div>
            </div>
          </div>
          <label htmlFor="radio-sec">Light</label>
          <div className="mdc-radio">
            <input onChange={this.handleModeChange} className="mdc-radio__native-control" type="radio" id="radio-dark" name="mode" value="dark" checked={colorMode === 'dark'} />
            <div className="mdc-radio__background">
              <div className="mdc-radio__outer-circle"></div>
              <div className="mdc-radio__inner-circle"></div>
            </div>
          </div>
          <label htmlFor="radio-min">Dark</label>
        </div>

        <div className='form-field-heading'>Weight</div>
        <div className="mdc-form-field">
          <div className="mdc-radio">
            <input onChange={this.handleChange} className="mdc-radio__native-control" type="radio" id="radio-lbs" name="weight" value="lbs" checked={weightUnit === 'lbs'} />
            <div className="mdc-radio__background">
              <div className="mdc-radio__outer-circle"></div>
              <div className="mdc-radio__inner-circle"></div>
            </div>
          </div>
          <label htmlFor="radio-lbs">Pounds</label>
          <div className="mdc-radio">
            <input onChange={this.handleChange} className="mdc-radio__native-control" type="radio" id="radio-kg" name="weight" value="kg" checked={weightUnit === 'kg'}/>
            <div className="mdc-radio__background">
              <div className="mdc-radio__outer-circle"></div>
              <div className="mdc-radio__inner-circle"></div>
            </div>
          </div>
          <label htmlFor="radio-kg">Kilograms</label>
        </div>

        <div className='form-field-heading'>Time</div>
        <div className="mdc-form-field">
          <div className="mdc-radio">
            <input onChange={this.handleChange} className="mdc-radio__native-control" type="radio" id="radio-sec" name="time" value="sec" checked={timeUnit === 'sec'} />
            <div className="mdc-radio__background">
              <div className="mdc-radio__outer-circle"></div>
              <div className="mdc-radio__inner-circle"></div>
            </div>
          </div>
          <label htmlFor="radio-sec">Seconds</label>
          <div className="mdc-radio">
            <input onChange={this.handleChange} className="mdc-radio__native-control" type="radio" id="radio-min" name="time" value="min" checked={timeUnit === 'min'} />
            <div className="mdc-radio__background">
              <div className="mdc-radio__outer-circle"></div>
              <div className="mdc-radio__inner-circle"></div>
            </div>
          </div>
          <label htmlFor="radio-min">Minutes</label>
        </div>

        <div className='form-field-heading'>Distance</div>
        <div className="mdc-form-field">
          <div className="mdc-radio">
            <input onChange={this.handleChange} className="mdc-radio__native-control" type="radio" id="radio-mi" name="distance" value="mi" checked={distanceUnit === 'mi'} />
            <div className="mdc-radio__background">
              <div className="mdc-radio__outer-circle"></div>
              <div className="mdc-radio__inner-circle"></div>
            </div>
          </div>
          <label htmlFor="radio-sec">Miles</label>
          <div className="mdc-radio">
            <input onChange={this.handleChange} className="mdc-radio__native-control" type="radio" id="radio-km" name="distance" value="km" checked={distanceUnit === 'km'} />
            <div className="mdc-radio__background">
              <div className="mdc-radio__outer-circle"></div>
              <div className="mdc-radio__inner-circle"></div>
            </div>
          </div>
          <label htmlFor="radio-min">Kilometers</label>
        </div>

      </div>
    );
  }
}

export default SettingsModal;
