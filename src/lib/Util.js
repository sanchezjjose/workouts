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

// export { compareNames, compareGroupNames, formatDate };
module.exports = {
  compareNames: compareNames,
  compareGroupNames: compareGroupNames,
  formatDate: formatDate,
  convertMetric: convertMetric
};
