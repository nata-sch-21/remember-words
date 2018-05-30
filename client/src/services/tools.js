const modRound = (value, precision) => {
  const precisionNumber = 10 ** precision;
  return Math.round(value * precisionNumber) / precisionNumber;
};

export default {
  modRound,
};
