class Settings {

  constructor(settings) {
    this.settings = settings;
  }

  get() {
    return this.settings;
  }

  getMode() {
    // Initialize if doesn't exist.
    this.settings.mode = this.settings.mode || 'light';
    return this.settings.mode;
  }

  getUnit(type) {
    return this.settings.units[type];
  }

  getUnits() {
    return this.settings.units;
  }

  setUnit(type, value) {
    this.settings.units[type] = value;
  }

  setUnits(units) {
    this.settings.units = units;
  }
}

export default Settings;
