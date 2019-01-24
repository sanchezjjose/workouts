import React, { Component } from 'react';
import { saveSettings } from '../../api/Settings';

import './SettingsModal.css';
import "@material/radio/dist/mdc.radio.min.css";
import "@material/form-field/dist/mdc.form-field.min.css";

class SettingsModal extends Component {

  state = {
    weight: this.props.settings.units.weight,
    time: this.props.settings.units.time,
    distance: this.props.settings.units.distance
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      const settings = { units: this.state };
      const user = this.props.user;

      // TODO: replace with userObj.setSettings method
      user['settings'] = settings;
      this.props.handleUserChange(user);

      saveSettings(user.id, settings)
        .then(() => {
          window.location.reload();  
        });
    });
  }

  render() {
    const weightUnit = this.state.weight;
    const timeUnit = this.state.time;
    const distanceUnit = this.state.distance;

    return (
      <div className='SettingsModal'>
        <div onClick={this.props.handleSettingsClose} className='close-modal'>&times;</div>

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
