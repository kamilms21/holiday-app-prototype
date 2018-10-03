export default (state = {}, action) => {
    switch (action.type) {
      case 'REGISTER':
        return [
            ...state,
            userDetails
        ];
        case 'SET_USERS':
          return action.users;
        case 'ADD_BOOKMARK_USERS': 
         return state.map((user) => {
           if (user.id === action.payload.user_id) { 
              return {
                ...user,
                'bookmarks': {
                  ...user.bookmarks,
                  [action.payload.deal_id]: action.payload.deal_id
                }
              }
            }
            else {
              return user
            }
          })
        case 'DELETE_BOOKMARK_USERS':
        return state.map((user) => {
          let newState =  Object.keys(...user.bookmarks).filter(bookmark => bookmark !== action.payload.deal_id)
          if (user.id === action.payload.user_id) { 
             return {
               ...user,
               'bookmarks': {
               ...newState
               }
             }
           }
           else {
             return user
           }
         })
      default:
        return state;
    }
  };