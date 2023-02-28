const getArrayFromList = (list) => {
  const array = [];

  list.forEach((item) => {
    array.push(item);
  });

  return array;
};

module.exports = getArrayFromList;
