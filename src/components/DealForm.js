import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import { connect } from 'react-redux';
import {firebase} from '../firebase/firebase';
import SearchGoogleMap from './SearchGoogleMap';
import MyEditor from './MyEditor';
import { unemojify } from "node-emoji";
import { Button, Icon } from 'semantic-ui-react';
import { Radio } from 'semantic-ui-react';
import { Message } from 'semantic-ui-react';


class DealForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.deal ? props.deal.title : '',
      description: this.props.deal ? this.props.deal.description : "",
      category: this.props.deal ? this.props.deal.category : 'packages',
      location: this.props.deal ? this.props.deal.location : '',
      hotel: this.props.deal ? this.props.deal.hotel : '',
      airport: this.props.deal ? this.props.deal.airport : '',
      amount: this.props.deal ? this.props.deal.amount.toString() : '',
      flyingOut: this.props.deal ? moment(this.props.deal.flyingOut) : moment(),
      addedBy: this.props.deal ? this.props.deal.addedBy : '',
      expired: this.props.deal ? this.props.deal.expired : false,
      calendarFocused: this.props.deal ? this.props.deal.calendarFocused : false,
      rating: this.props.deal ? this.props.deal.rating : 0,
      ratedBy: this.props.deal ? this.props.deal.ratedBy : "",
      createdAt: this.props.deal ? this.props.deal.createdAt : '',
      comments: this.props.deal ? this.props.deal.comments : [],
      locationMap: this.props.deal ? this.props.deal.locationMap : {},
      placeId: this.props.deal ? this.props.deal.placeId : '',
      image: this.props.deal ? this.props.deal.image : '',
      selectedFile: this.props.deal ? this.props.deal.selectedFile : null,
      myImage: this.props.deal ? this.props.deal.myImage : null,
      published: this.props.deal ? this.props.deal.published : false,
      ext_url: this.props.deal ? this.props.deal.ext_url : '',

      titleError: '',
      descriptionError: '',
      locationError: '',
      hotelError: '',
      amountError: '',
      airportError: '',
      flyingOutError: '',
      imageError: '',
      ext_urlError: '',
      getLocationError: ''

    };
 
    let sessionsRef = firebase.database().ref("currentTime");
    sessionsRef.set({
      startedAt: firebase.database.ServerValue.TIMESTAMP

})

  }
  

componentDidMount() {


 const getTime = () => {
  let currentTime = firebase.database().ref("currentTime/startedAt");
currentTime.once("value")
.then((snapshot) => {
  let time = snapshot.val();
  this.setState(() => ({ createdAt: time }));
});
};
getTime();
};

onImgUrlChange = (e) => {
  const url = e.target.value.trim()
  this.setState(() => ({image: url}))
}


getEditorData = (editorData) => {
  this.setState(() => ({ description: unemojify(editorData) }));
} 

onUrlChange = (e) => {
  const url = e.target.value.trim()
  this.setState(() => ({ext_url: url}))
}

onExpiredChange = (e, {value}) => {
e.preventDefault();
this.setState({expired: !value})
}

removeAddedPhoto = () => {
  this.setState({myImage: null })
}

fileChangedHandler = (event) => {
  this.setState({selectedFile: event.target.files[0]})
   this.setState({myImage: URL.createObjectURL(event.target.files[0])})
}

  onTitleChange = (e) => {
    const title = e.target.value;
    this.setState(() => ({ title }));
  };
  onCategoryChange = (e) => {
    const category = e.target.value;
    this.setState(() => ({ category }));
  };
  onLocationChange = (e) => {
    const location = e.target.value;
    this.setState(() => ({ location }));
  };
  onAirportChange = (e) => {
    const airport = e.target.value;
    this.setState(() => ({ airport }));
  };
  onHotelChange = (e) => {
    const hotel = e.target.value;
    this.setState(() => ({ hotel }));
  };
  onAmountChange = (e) => {
    const amount = e.target.value;
      this.setState(() => ({ amount }));
  };
  onFlyDateChange = (flyingOut) => {
    if (flyingOut) {
      this.setState(() => ({ flyingOut }));
    }
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };
  getLocation = (latLng, placeId) => {
    this.setState(() => ({locationMap: latLng}));
    // this.setState(() => ({placeId}));
    // let self = this;
 
    // var service
    // var request = {
    //   placeId: placeId
    // };    
    // service = new google.maps.places.PlacesService(document.createElement('div'));
    // placeId && service.getDetails(request, callback);
    
    // function callback(place, status) {
    //   if (status == google.maps.places.PlacesServiceStatus.OK) {

    //     self.setState({image: place.photos[0].getUrl({'maxWidth': 1000})})
    //   }
    // }
  }
  
  onSubmit = (e, user) => {
    e.preventDefault();

    if (!this.state.locationMap.lat) {
      this.setState(() => ({ getLocationError: 'Please choose place from a list' }));
    } 

    if (!this.state.description || this.state.description.length < 100) {
      this.setState(() => ({ descriptionError: 'Description is too short.' }));
    } 
    
    else if (!this.state.title || this.state.title.length < 3) {
      this.setState({titleError: 'You need to add title'})
    }
  
    else if (!this.state.location || this.state.location.length < 3) {
      this.setState({locationError: 'You need to add correct location'})
    }

    else if (!this.state.amount || this.state.amount < 0 || this.state.amount > 100000 ||
    isNaN(this.state.amount) ) {
      this.setState({amountError: 'You need to add correct price'})
    }

    else if (!this.state.hotel || this.state.hotel.length < 4) {
      this.setState({hotelError: 'You need to add hotel or place where you are going to stay'})
    }
    
    else if (!urlRef.test(this.state.ext_url)) {
      this.setState({ext_urlError: 'You need to add url in this format: "http://holidayfromlondon.co.uk"'})
    }
    else if (!urlRefImg.test(this.state.image)) {
      this.setState({imageError: 'You need to add url to image ending at ".jpg" or ".png"'})
    }
  
  
    
    else {
      this.setState(() => ({ error: ''}));

      this.props.onSubmit({
        description: this.state.description,
        title: this.state.title,
        category: this.state.category,
        location: this.state.location,
        amount: parseFloat(this.state.amount, 10),
        flyingOut: this.state.flyingOut.valueOf(),
        airport: this.state.airport,
        hotel: this.state.hotel,
        createdAt: this.state.createdAt,
        addedBy: this.props.username,
        rating: this.state.rating,
        comments: this.state.comments,
        placeId: this.state.placeId,
        locationMap: this.state.locationMap,
        image: this.state.myImage ? this.state.selectedFile : this.state.image,
        published: this.state.published,
        ratedBy: this.state.ratedBy,
        ext_url: this.state.ext_url,
        expired: this.state.expired
      });
    }
  };
  render() {
    const renderImage = () => {
      let img = new Image;
      img.src = this.state.image;
     if(img.width > 1) return <img src = {this.state.image} width = '100%' />
    }
      
    return (
      <div className = 'formContainer '>
      <form className="form" onSubmit={this.onSubmit}>
      {this.props.deal && <Radio toggle label = "Expired ?? (Price has changed or is not available anymore)" 
      onChange = {this.onExpiredChange}
      checked = {this.state.expired} value = {this.state.expired}
      />}
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <SearchGoogleMap getLocation = {this.getLocation} />
      {this.state.getLocationError && <span>{this.state.getLocationError}</span> }

        <input
          type="text"
          placeholder="Title"
          autoFocus
          className="text-input"
          value={this.state.title}
          onChange={this.onTitleChange}
          onFocus = {() => this.setState(() => ({'titleError': ''}))}
        />


        {this.state.titleError && <Message size='mini' color = 'red' style = {messageStyle} >
        {this.state.titleError}</Message>}
            
        <input
        type="text"
        placeholder="Image URL"
        autoFocus
        className="text-input"
        value={this.state.imgUrl}
        onChange={this.onImgUrlChange}
      />
      {this.state.imageError && <Message size='mini' color = 'red' style = {messageStyle} >
      {this.state.imageError}</Message>}
        
        <input
        type="text"
        placeholder="Location"
        className="text-input"
        value={this.state.location}
        onChange={this.onLocationChange}
        onFocus = {() => this.setState(() => ({'locationError': ''}))}
      />
      {this.state.locationError && <Message size='mini' color = 'red' style = {messageStyle} >
      {this.state.locationError}</Message>}

      <div className = 'selects'>
        <SingleDatePicker
          date={this.state.flyingOut}
          onDateChange={this.onFlyDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
          placeholder={'Flying Out'}
        />
      <input
          type="text"
          placeholder="Amount"
          className="text-input"
          value={this.state.amount}
          onChange={this.onAmountChange}
          onFocus = {() => this.setState(() => ({'amountError': ''}))}
        />
        {this.state.amountError && <Message size='mini' color = 'red' style = {messageStyle} >
        {this.state.amountError}</Message>}

      </div>
        <input
          type="text"
          placeholder="Hotel"
          className="text-input"
          value={this.state.hotel}
          onChange={this.onHotelChange}
          onFocus = {() => this.setState(() => ({'hotelError': ''}))}
        />
        {this.state.hotelError && <Message size='mini' color = 'red' style = {messageStyle} >
        {this.state.hotelError}</Message>}

    <div className = "selects">
        <select 
        value = {this.state.category}
        onChange = {this.onCategoryChange}
        >
          <option value = 'packages'>Packages</option>
          <option value = 'flights'>Flights</option>
          <option value = 'hotels'>Hotels</option>
          <option value = 'other'>Other</option>
        </select>
        
        <select 
        value = {this.state.airport}
        onChange = {this.onAirportChange}
        >
          <option value = 'choose' >Choose airport</option>
          <option value = 'heathrow'>London Heathrow</option>
          <option value = 'gatwick'>London Gatwick</option>
          <option value = 'stansted'>London Stansted</option>
          <option value = 'luton'>London Luton</option>
          <option value = 'other'>Other</option>
        </select>
        
    </div>
        <input type = "text"
        placeholder = "Link URL"
        className="text-input"
        value={this.state.ext_url }
        onChange={this.onUrlChange}
        onFocus = {() => this.setState({ext_urlError: ''})}
        />
        {this.state.ext_urlError && <Message size='mini' color = 'red' style = {messageStyle} >
        {this.state.ext_urlError}</Message>}
    
        <MyEditor editorData = {this.getEditorData} description = {this.props.deal && this.props.deal.description} />
        {this.state.descriptionError && <span>{this.state.descriptionError}</span>}

        <div style = {{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <input type="file" onChange={this.fileChangedHandler} style = {{marginBottom: '12px'}} />

{ !this.state.myImage && renderImage()}
{this.state.myImage && (
  <div style = {{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>     
  <img src = {this.state.myImage} width = '100%' /> 
            <Button icon labelPosition='right' onClick={this.removeAddedPhoto} style = {{marginTop: '12px'}}>Remove photo 
            <Icon name='right delete' />
            </Button>
  </div>
)}
          <Button  icon labelPosition='right'  onClick={this.uploadHandler} style = {{marginTop: '12px'}}>
          Save deal
          <Icon name='right write' />
          </Button>
        </div>
      </form>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    userId: state.auth.uid,
    username: state.auth.user.username
  }
}

const messageStyle = {marginTop: '-18px',
height: '33px', padding: '10px', marginBottom: '22px'};

const urlRef = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
const urlRefImg = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png)/g;

export default connect(mapStateToProps)(DealForm);