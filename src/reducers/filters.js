import moment from 'moment';
import { isNullOrUndefined } from 'util';

// Filters Reducer

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: //moment().startOf('month'),
  undefined,
  flyDate: undefined,
  minPrice: 0,
  maxPrice: 100000
};

export default (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      };
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      };
    case 'SORT_BY_FLY_DATE':
      return {
        ...state,
        sortBy: 'date'
      };
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      };
    case 'SET_FLY_DATE':
      return {
        ...state,
        flyDate: action.flyDate
      };
    case 'SET_PRICE_FILTER': 
      return {
        ...state,
        minPrice: action.min,
        maxPrice: action.max
      };
      case 'CHECK_LAST_MINUTE':
        return {
          ...state,
         lastMinute: action.lastMinute
        };
        case 'CHECK_EXPIRED':
          return {
            ...state,
            expired: action.expired
          };
    default:
      return state;
  }
};
