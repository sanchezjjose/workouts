class History {

  constructor(history) {
    this.history = history;
  }

  get() {
    return this.history;
  }

  getDates() {
    return this.history.dates;
  }

  hasDate(date) {
    return this.history.dates.indexOf(date) > -1;
  }

  addDate(date) {
    if (this.history.dates.indexOf(date) === -1) {
      this.history.dates.push(date);
    }
  }

  removeDate(date) {
    this.history.dates = this.history.dates.filter(d => d !== date);
  }
}

export default History;