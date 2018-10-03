// Deals Reducer

const dealsReducerDefaultState = [];

export default (state = dealsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_DEAL':
      return [
        ...state,
        action.deal
      ];
    case 'REMOVE_DEAL':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_DEAL':
      return state.map((deal) => {
        if (deal.id === action.id) {
          return {
            ...deal,
            ...action.updates
          };
        } else {
          return deal;
        };
      });
    case 'SET_DEALS':
      return action.deals;
    case 'ADD_RATING':
    return state.map((deal) => {
      if (deal.id === action.id) {
        return {
          ...deal,
          rating: action.rating,
          ratedBy: action.username
        };
      } else {
        return deal;
      };
    });
    case 'ADD_COMMENT': 
      return state.map((deal) => {
        if (deal.id === action.id) {
          return {
            ...deal,
            comments: {
              ...deal.comments,
              [action.comment_id] : {
                ...action.comment,
                id: action.comment_id
            }}
        } } else {
          return deal;
        };
      })
    default:
      return state;
  };
};
