// Run Command:
// NODE_ENV=development REACT_APP_AWS_ACCESS_KEY_ID=XXX REACT_APP_AWS_SECRET_ACCESS_KEY=XXX node scripts/populateHistory.js

const formatDate = require('../src/lib/Util').formatDate;
const History = require('../src/models/History');
const HistoryDB = require('../src/api/History');

function addDays(date, days) {
  const initialDate = new Date(date);
  const result = initialDate.setDate(initialDate.getDate() + days);
  return new Date(result);
}

function skipDate(date) {
  const month = date.getMonth();
  const dayOfMonth = date.getDate();
  return (month === 11 && dayOfMonth > 20) || (month === 0 && dayOfMonth < 20);
}

const history = new History();
// const historyDb = new HistoryDB();

const today = new Date();
const start = new Date(2018, 8, 10);
const end = new Date(today.getFullYear(), today.getDate(), today.getMonth());

for (let i = 0; true; i++) {
  let currDate = addDays(start, i);

  if (formatDate(currDate) === formatDate(end)) {
    break;
  }

  if (!history.hasDate(currDate) && !skipDate(currDate)) {
    history.addDate(formatDate(currDate));
  }
}

HistoryDB
  .saveDates('joses', history.getDates())
  .catch(e => console.log(e));
