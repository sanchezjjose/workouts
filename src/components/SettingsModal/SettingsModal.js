import React, { Component } from 'react';

import './SettingsModal.css';
import "@material/radio/dist/mdc.radio.min.css";
import "@material/form-field/dist/mdc.form-field.min.css";

class SettingsModal extends Component {

  state = {
    weight: this.props.settings.units.weight,
    time: this.props.settings.units.time
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const weightUnit = this.state.weight;
    const timeUnit = this.state.time;

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
          <label htmlFor="radio-lbs">lbs</label>
          <div className="mdc-radio">
            <input onChange={this.handleChange} className="mdc-radio__native-control" type="radio" id="radio-kg" name="weight" value="kg" checked={weightUnit === 'kg'}/>
            <div className="mdc-radio__background">
              <div className="mdc-radio__outer-circle"></div>
              <div className="mdc-radio__inner-circle"></div>
            </div>
          </div>
          <label htmlFor="radio-kg">kg</label>
        </div>
        <div className='form-field-heading'>Time</div>
        <div className="mdc-form-field">
          <div className="mdc-radio">
            <input onChange={this.handleChange} className="mdc-radio__native-control" type="radio" id="radio-sec" name="time" value="seconds" checked={timeUnit === 'seconds'} />
            <div className="mdc-radio__background">
              <div className="mdc-radio__outer-circle"></div>
              <div className="mdc-radio__inner-circle"></div>
            </div>
          </div>
          <label htmlFor="radio-sec">Seconds</label>
          <div className="mdc-radio">
            <input onChange={this.handleChange} className="mdc-radio__native-control" type="radio" id="radio-min" name="time" value="minutes" checked={timeUnit === 'minutes'} />
            <div className="mdc-radio__background">
              <div className="mdc-radio__outer-circle"></div>
              <div className="mdc-radio__inner-circle"></div>
            </div>
          </div>
          <label htmlFor="radio-min">Minutes</label>
        </div>
      </div>
    );
  }
}

export default SettingsModal;
