export const checkFollow = (number) => {
  if (number > Math.pow(10, 6)) {
    return Math.round((number / Math.pow(10, 6)) * 10) / 10 + 'M';
  } else if (number < 1000) {
    return number;
  } else {
    return Math.round((number / Math.pow(10, 3)) * 10) / 10 + 'K';
  }
};

// console.log(Math.round((2519916 / Math.pow(10, 6)) * 10) / 10 + 'M');
