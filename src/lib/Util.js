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

const chartMonths = (currentMonth) => {
  const dates = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const chartDates = [];

  let startIndex = dates.indexOf(currentMonth);

  for (let i = startIndex; chartDates.length !== dates.length; i--) {
    if (i < 0) {
      i = dates.length - 1;
    }
    chartDates.push(dates[i]);
  }

  return chartDates.reverse();
}

// export { compareNames, compareGroupNames, formatDate };
module.exports = {
  compareNames: compareNames,
  compareGroupNames: compareGroupNames,
  formatDate: formatDate,
  chartMonths: chartMonths
}
