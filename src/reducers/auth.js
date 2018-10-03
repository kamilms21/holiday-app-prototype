export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        uid: action.uid,
        user: action.userData
      };
      case 'THROW_ERROR':
      return {
        error: action.msg
      }
      case 'THROW_REG_ERROR':
      return {
        reg_error: action.msg
      }
      case 'ADD_BOOKMARK':
      return {
        ...state,
        'user': {
          ...state.user,
            'bookmarks': {
              ...state.user.bookmarks,
            [action.payload.deal_id] : action.payload.user_id
            } 
        }       
        }
      case 'DELETE_BOOKMARK':
      const deleteIt = (bookmarks) => {
        return Object.keys(bookmarks).filter(bookmark => bookmark !== action.payload.deal_id)
      }
      return {
        ...state,
        'user': {
          ...state.user,
          'bookmarks': deleteIt(state.user.bookmarks)
        }
      }
      
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};
