const sortByDate = (list) => {
  const compare = (a, b) => {
    if (new Date(a.date) < new Date(b.date)) return -1;
    if (new Date(a.date) > new Date(b.date)) return 1;
    return 0;
  }

  return list.sort(compare) || [];
};

const getNextGame = (schedule) => {
  return schedule.find(game => new Date() < new Date(game.date));
};

const getNextGameIndex = (schedule) => {
  return schedule.findIndex(game => new Date() < new Date(game.date));
};

export { sortByDate, getNextGame, getNextGameIndex };
