// SET_TEXT_FILTER
export const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});

// SORT_BY_DATE
export const sortByAddDate = () => ({
  type: 'SORT_BY_ADD_DATE'
});


export const sortByFlyDate = () => ({
  type: 'SORT_BY_FLY_DATE'
});

export const setFlyDate = (flyDate) => ({
  type: 'SET_FLY_DATE',
  flyDate
});

// SORT_BY_AMOUNT
export const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
});

// SET_START_DATE
export const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
});

export const setPriceFilter = (min, max) => ({
  type: 'SET_PRICE_FILTER',
  min,
  max
});

export const setLastMinuteFilter = (checkbox) => ({
  type: 'CHECK_LAST_MINUTE',
  lastMinute: checkbox
});


export const setExpiredFilter = (checkbox) => ({
  type: 'CHECK_EXPIRED',
  expired: checkbox
});






