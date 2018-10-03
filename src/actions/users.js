import database, { firebase, googleAuthProvider } from '../firebase/firebase';
import axios from 'axios';
import {storage} from '../firebase/firebase';
import {startSetDeals} from './deals'


export const registerUser = (userDetails) => ({
  type: 'REGISTER',
  userDetails
});

export const throw_reg_error = (msg) => ({
  type: 'THROW_REG_ERROR',
  msg
})

export const startRegister = (userData = {}) => {
  return (dispatch) => {
      const {
          username,
          email,
          password,
          city
      } = userData;
      const userDetails = {username, email, city, type: 'newbie', banned: false, deals: [],
                    comments: [], avatar: "http://3.bp.blogspot.com/-r97nppwM6eY/UZw0nX7tn9I/AAAAAAAABMs/110B_J21kQ4/s1600/avatar.jpg", joined: '', bookmarks: ''};

    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( (authUser) => {
      const newUser = authUser.user.uid;
      
       return database.ref(`users/${newUser}`).set(userDetails)
    }).catch((error) => {
      dispatch(throw_reg_error(error.message))
  })
}};

export const setUsers = (users) => ({
    type: 'SET_USERS',
    users
})

export const startSetUsers = () => {
  return (dispatch) => {
    return database.ref(`users`).once('value').then((snapshot) => {
  
      const users = [];

      snapshot.forEach((childSnapshot) => {
        users.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });

      dispatch(setUsers(users));
    })
    .then(() => {
      dispatch(startSetDeals())
    });
  };
}


export const startAddAvatar = (avatar, avatarName) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

      if (avatar && avatarName) {
      const formData = new FormData()
  formData.append('myFile', avatar, `user-${uid}.jpg`)
  axios.post('https://us-central1-traveldealsuk-b664e.cloudfunctions.net/uploadFile', formData)
  .then(function (response) {
    let pathReference = storage.ref().child(`user-${uid}.jpg`);
    pathReference.getDownloadURL().then(function(url) {
      database.ref(`users/${uid}`).update({avatar: url}).then(() => {
        dispatch(startSetUsers());
      })
    })
})

//koniec then
    } else {
    return console.log('something went wrong')
    }
    //

// return database.ref(`users/${uid}`).update(avatar).then(() => {
//   dispatch(startSetUsers());
// });

  }
}

export const addAvatar = (avatar) => ({
  type: 'ADD_AVATAR',
  avatar
});



export const addBookmark = (payload) => ({
  type: 'ADD_BOOKMARK',
  payload
})

export const addBookmarkDB = (payload) => {
  return (dispatch) => {
    dispatch(addBookmark(payload))
    dispatch(addBookmarkToUsers(payload))
    return database.ref(`users/${payload.user_id}/bookmarks`).update({[payload.deal_id]: payload.deal_id})
}
}

export const deleteBookmark = (payload) => ({
  type: 'DELETE_BOOKMARK',
  payload
})

export const deleteBookmarkDB = (payload) => {
return (dispatch) => {
  return database.ref(`users/${payload.user_id}/bookmarks/${payload.deal_id}`).remove().then(() => {
    dispatch(deleteBookmark(payload))
    dispatch(deleteBookmarkToUsers(payload))
  })
}
}

export const addBookmarkToUsers = (payload) => ({
  type: 'ADD_BOOKMARK_USERS',
  payload
})

export const deleteBookmarkToUsers = (payload) => ({
  type: 'DELETE_BOOKMARK_USERS',
  payload
})
