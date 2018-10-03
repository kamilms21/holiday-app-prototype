export default (deals) => {
  return deals
      .map((deal) => deal.amount)
      .reduce((sum, value) => sum + value, 0);
};
