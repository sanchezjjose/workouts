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
  return `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`;
}

export { compareNames, compareGroupNames, formatDate };
