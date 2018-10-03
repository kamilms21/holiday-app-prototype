import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'; 
import moment from 'moment';
import numeral from 'numeral';
import DealRating from './DealRating';
import MdPlace from 'react-icons/lib/md/place';
import MdHome from 'react-icons/lib/md/home';
import MdFlightTakeoff from 'react-icons/lib/md/flight-takeoff';
import MdBookmarkOutline from 'react-icons/lib/md/bookmark-outline';
import MdBookmark from 'react-icons/lib/md/bookmark';
import { addBookmarkDB, deleteBookmarkDB } from '../actions/users';
import draftToHtml from "draftjs-to-html";
import convert from 'htmr';
import { emojify } from "node-emoji";
import database  from '../firebase/firebase';

const onMissing = (name) => {
  return name;
}

const iconStyle = {
  width: '20px',
  height: '20px'
}

class DealListItem extends React.Component {
constructor (props) {
  super(props)
  this.state = {
    saved: false,
    hovered: false,
    bookmarks: this.props.user.user ? this.props.user.user.bookmarks : ''
  }
}

componentDidMount = () => {
  let bookmarkRef = database.ref(`users/${this.props.user.uid}/bookmarks`);
  let _this = this;
  bookmarkRef.on('value', (snapshot) => {
    _this.setState({
      bookmarks: snapshot.val(),
      });  
      });
    }

checkBookmark = () => {
  Object.values(this.state.bookmarks).indexOf(this.props.id) === -1 ? this.setState({saved: false}) : this.setState({saved: true});
}
addBookmark = () => {
  const payload = {
    user_id: this.props.user.uid,
    deal_id: this.props.id
  }
this.props.addBookmarkDB(payload)
this.checkBookmark();
}

deleteBookmark = () => {
  const payload = {
    user_id: this.props.user.uid,
    deal_id: this.props.id
  }
this.props.deleteBookmarkDB(payload)
 this.checkBookmark();
}


  render() {
   const avatar = (
      this.props.users.filter((user) => {
        return user.username === this.props.addedBy
      })
      .map((user) => {
        return <span className = "deal_low_avatar"><strong>{user.username}</strong> <img src = {user.avatar} height = '32' width = '32' /> </span>
      })
  )

    const { id, description, amount, createdAt, flyingOut, hotel, title, location, rating, image, comments, ratedBy} = this.props;
 let renderDesc = convert(draftToHtml(JSON.parse(emojify(description, onMissing))))
    return (
   
     <div className="list-item">
    <Link to={`/deal/${title}`} className = "deal__img" style = {{width: '270px', height: '210px', backgroundImage: `url(${image})`,     
  backgroundPosition: 'center', backgroundSize: '100%', backgroundRepeat: 'no-repeat' }}> </Link>
 
    <div className = "deal__info">
    <DealRating id = {id} rating = {rating} ratedBy = {ratedBy} style = {{position: 'absolute', top: '0', right: '-29px'}} />
    <p><MdPlace /> {location} </p>
    <p><MdHome /> {hotel} </p>
    <p><MdFlightTakeoff /> {moment(flyingOut).format('L')}</p>
    <p><span className = "pound">£</span>{`${numeral(amount).format('0,0.00')}`}</p>
  </div>
    <div className = "deal__content">
    <div className = 'deal__body'>
    <Link to={`/deal/${title}`} style = {{color: 'black'}}>
      <h2 className = 'deal__title'> {title} </h2>
      <p className = "deal__desc">{renderDesc}</p>
      </Link>

  
    </div>
        <div className = "deal__low">  
          <span className = "deal_low_addedBy">{moment().from(createdAt)} by {this.props.users && avatar}</span>
          <p className = "deal__low-comment">{comments && Object.values(comments).length} comments</p>
  
 <p style = {{cursor: 'pointer'}}>
  {
   this.state.bookmarks ? (
     Object.values(this.state.bookmarks).indexOf(this.props.id) === -1 ?
    <MdBookmarkOutline style = {{fill: 'black', ...iconStyle}} onClick = {this.addBookmark}/> 
     : 
  <MdBookmark onClick = {this.deleteBookmark} style = {{...iconStyle}} />
     )
    :
    <MdBookmarkOutline  style = {{...iconStyle}} />
    }  
          </p>
        </div>
      </div>
</div>

    )
  }
}



const mapStateToProps = (state) => {
  return {
    users: state.users,
    user: state.auth
  }
}

const mapDispatchToProps = (dispatch) => ({
    addBookmarkDB: (payload) => dispatch(addBookmarkDB(payload)),
    deleteBookmarkDB: (payload) => dispatch(deleteBookmarkDB(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(DealListItem);


