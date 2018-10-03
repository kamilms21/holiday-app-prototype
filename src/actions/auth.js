import database, { firebase, googleAuthProvider } from '../firebase/firebase';

export const throw_error = (msg) => ({
type: 'THROW_ERROR',
msg
})

export const login = (uid, userData) => ({
  type: 'LOGIN',
  uid,
  userData
});

export const startLogin = () => {
  return (dispatch) => {
    return firebase.auth().signInWithPopup(googleAuthProvider).then((authUser) => {
      const {email, photoURL} = authUser.user;
      if (authUser.additionalUserInfo.isNewUser) {
        const user = {
          avatar: photoURL,
          email,
          username: email.slice(0, email.indexOf('@')),
          banned: 'false',
          type: 'newbie',
          city: '',
          deals: [],
        comments: [], 
        joined: '',
        bookmarks: []
        }
        return database.ref(`users/${authUser.user.uid}`).set(user)
     }
  }).catch((error) => {
    dispatch(throw_error(error.message))
    console.log(error.message)
  })
  };
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};

export const loginWithEmail = (uid) => {
  return {
    type: 'LOGIN_EMAIL',
    uid
  }
}

export const startLoginWithEmail = (email, password) => {
  return (dispatch) => {
    return firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
        dispatch(throw_error(error.message))
    })
  }
}