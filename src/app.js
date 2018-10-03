import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetDeals } from './actions/deals';
import { startSetUsers } from './actions/users';
import { login, logout } from './actions/auth';
import getVisibleDeals from './selectors/deals';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import database, { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';


const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
let hasRendered = false;
const renderAction = new Promise((resolve, reject) => {
  resolve(store.dispatch(startSetUsers()));
  reject('something not good in my promise')
})
const renderApp =  () => {
  if (!hasRendered) {
    renderAction.then(() => ReactDOM.render(jsx, document.getElementById('app'))).then(() => {
      hasRendered = true;
    })
 
   
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));



firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    database.ref(`/users/${user.uid}`).once('value').then((snapshot) => {
      const loggedUser = snapshot.val()
     const userData = {
          username: loggedUser.username,
          email: loggedUser.email,
          type: loggedUser.type,
          city: loggedUser.city,
          avatar: loggedUser.avatar,
          bookmarks: loggedUser.bookmarks
     }

     const loadAll = () => {
      return new Promise(resolve => resolve(store.dispatch(startSetUsers()))) 
     }

     loadAll().then(() => {
      store.dispatch(login(user.uid, userData));
     })
  
    })
    .then(() => {
      renderApp();
    });
  } else {
    store.dispatch(logout());
    renderApp();
  }
});
