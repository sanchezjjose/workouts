const compareNames = (a, b) => {
  const nameA = a.name.toUpperCase(); 
  const nameB = b.name.toUpperCase(); 

  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0;
}

const compareGroupNames = (a, b) => {
  const nameA = a.group.toUpperCase(); 
  const nameB = b.group.toUpperCase(); 

  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0;
}

const groupBy = (key, array) => {
  return array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});
};

const formatDate = (date) => {
  const month = `${date.getMonth()+1}`;
  const dayOfMonth = `${date.getDate()}`;
  const monthFormatted = month.length === 1 ? '0' + month : month;
  const dayFormatted = dayOfMonth.length === 1 ? '0' + dayOfMonth : dayOfMonth;

  return `${monthFormatted}-${dayFormatted}-${date.getFullYear()}`;
}

const convertMetric = (value, unit) => {
  let result;

  switch (unit) {
    case 'lbs':
      result = value / 2.205;
      break;

    case 'kg':
      result = value * 2.205;
      break;

    case 'mi':
      result = value * 1.609;
      break;

    case 'km':
      result = value / 1.609;
      break;

    case 'min':
      result = value * 60;
      break;

    case 'sec':
      result = value / 60;
      break;

    default:
      result = value;
  }

  return Math.round(result * 10) / 10;
}

const convertTimeToDecimal = (metricValue, unit) => {
  if (typeof metricValue === 'number') {
    return metricValue;
  }

  const timeUnits = metricValue.split(':');
  const numTimeUnits = timeUnits.length;

  let [ hrs, mins, secs ] = [ 0, 0, 0 ];
  let result = metricValue;

  if (numTimeUnits === 1) {
    return Number(metricValue);

  } else if (numTimeUnits === 2) {
    [ mins, secs ] = timeUnits.map(num => Number(num));

  } else if (numTimeUnits === 3) {
    [ hrs, mins, secs ] = timeUnits.map(num => Number(num));
  }

  if (unit === 'min') {
    result = (hrs * 60) + mins + (secs / 60)

  } else if (unit === 'sec') {
    result = (hrs * 3600) + (mins * 60) + secs;
  }

  return Math.round(result * 10) / 10;
}

// export { compareNames, compareGroupNames, formatDate };
module.exports = {
  compareNames: compareNames,
  compareGroupNames: compareGroupNames,
  groupBy: groupBy,
  formatDate: formatDate,
  convertMetric: convertMetric,
  convertTimeToDecimal: convertTimeToDecimal
};
