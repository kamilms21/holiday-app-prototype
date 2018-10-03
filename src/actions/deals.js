import database from '../firebase/firebase';
import axios from 'axios';
import {storage} from '../firebase/firebase';


// ADD_DEAL
export const addDeal = (deal) => ({
  type: 'ADD_DEAL',
  deal
});

export const startAddDeal = (dealData = {}) => {
  return (dispatch) => {
    const {
      title = '',
      description = '',
      category = '',
      hotel = '',
      location = '',
      airport = '',
      amount = 0,
      createdAt = 0,
      flyingOut = 0,
      addedBy = '',
      expired = '', 
      rating = 0,
      comments = [],
      placeId = '',
      locationMap = '',
      image = '',
      ratedBy = [],
      published = false,
      ext_url = '',
      

    } = dealData;
    const deal = { title, description, category, hotel, location, airport, amount, 
      createdAt, flyingOut, addedBy, expired, rating, comments, placeId, locationMap, image, ratedBy, published, ext_url };

    return database.ref(`deals`).push(deal).then((ref) => {
      if (deal.image) {
      const formData = new FormData()
  formData.append('myFile', deal.image, `deal-${ref.key}.jpg`)
  axios.post('https://us-central1-traveldealsuk-b664e.cloudfunctions.net/uploadFile', formData)
  .then(function (response) {
    let pathReference = storage.ref().child(`deal-${ref.key}.jpg`);
    pathReference.getDownloadURL().then(function(url) {
      database.ref(`deals/${ref.key}`).update({image: url}).then(() => {
        dispatch(addDeal({
          id: ref.key,
          ...deal,
          image: url
        }))
      })
    })
})

    } else {
      dispatch(addDeal({
        id: ref.key,
        ...deal
      }))
    }
    //
    })
  };
};

// REMOVE_DEALS
export const removeDeal = ( id  = {}) => ({
  type: 'REMOVE_DEAL',
  id
});

export const startRemoveDeal = ( id  = {}) => {
  return (dispatch, getState) => {
    return database.ref(`deals/${id}`).remove().then(() => {
      dispatch(removeDeal({ id }));
    });
  };
};

// EDIT_DEAL
export const editDeal = (id, updates) => ({
  type: 'EDIT_DEAL',
  id,
  updates
});

export const startEditDeal = (id, updates) => {
  return (dispatch, getState) => {
    return database.ref(`deals/${id}`).update(updates).then(() => {
      dispatch(editDeal(id, updates));
    });
  };
};

// SET_DEALS
export const setDeals = (deals) => ({
  type: 'SET_DEALS',
  deals
});

export const startSetDeals = (qty = 15) => {
  return (dispatch, getState) => {
    return database.ref(`deals`)
    .orderByKey()
    .limitToLast(qty).
    once('value').then((snapshot) => {
      const deals = [];
      snapshot.forEach((childSnapshot) => {
        deals.push({
          id: childSnapshot.key,
          comments: [],
          ...childSnapshot.val(),
          image: childSnapshot.val().image ? childSnapshot.val().image : "https://www.maidstonehonda.co.uk/media/Honda-Custom-Build-2.jpg"
        });
      });

      dispatch(setDeals(deals));
    });
  };
};

export const startVotePlus = (id, rating, username) => {
  return (dispatch) => {
    database.ref(`deals/${id}`).update({rating})
    .then(() => {
     database.ref(`deals/${id}/ratedBy`).push(username)
    })
    .then(() => {
      dispatch(startVote(id, rating, {username}));
    })

  }
}


export const startVote = (id, rating, username) => ({
  type: 'ADD_RATING',
  id,
  rating,
  username
});


export const addComment = (id, comment_id, comment) => ({
  type: 'ADD_COMMENT',
  id,
  comment_id,
  comment
});

export const addCommentDB = (id, comment) => {
 return (dispatch) => {
  return database.ref(`deals/${id}/comments`).push(comment).then((snap) => {
    dispatch(addComment(id, snap.key, comment))
  })
 }
}

export const deleteComment = (id, comment_id) => {
  return database.ref(`deals/${id}/comments/${comment_id}`).remove()
}

export const sendEmail = () => {
  axios.post('https://us-central1-traveldealsuk-b664e.cloudfunctions.net/sendMail')
  .then((response) => {
    console.log(response)
  })
}


