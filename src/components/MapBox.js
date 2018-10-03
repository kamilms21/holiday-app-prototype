import React, { Component } from 'react';
import moment from 'moment';
import DealRating from './DealRating';
import InfoBox from "react-google-maps/lib/components/addons/InfoBox";
import { Link } from 'react-router-dom';
const {
        Marker,
        InfoWindow
} = require("react-google-maps");



class MapBox extends Component {
        constructor(props) {
         super(props)
        this.state = {visible: false}
        }
        onCloseclick = () => {
                return null;
        }
  render() {
    return (
        <Marker
        position={{ lat: this.props.lat, lng: this.props.lng }}
        icon={{url: this.props.svg}}
        onClick = {() => {
                this.setState({visible: !this.state.visible})
        }}
      >
  
<div>
       {
                 this.state.visible ?
                 <InfoWindow onCloseClick = {this.onCloseclick} >
                 <div className = "collapsedBox">
                <Link to={`/deal/${this.props.deal.title}`}>
                <img src = {this.props.deal.image} width = "auto" height =  "300px" style = {{ 
                        marginLeft: '50%',
                        transform: 'translateX(-50%)'}}/>
                </Link>
                <div className = 'infoBox__content'>
                <h2> {this.props.deal.title} </h2> 
                <p>Fly here: {moment(this.props.deal.flyingOut).format('L')}</p>
               <DealRating id = {this.props.deal.id} rating = {this.props.deal.rating} ratedBy = {this.props.deal.ratedBy} style = {{position: 'absolute', top: '0', left: '-28px'}}/>

                </div>
                </div>
                </InfoWindow>
                : 
                <InfoBox
                style = {{marginTop: '-200px !important'}}
                options = {{enableEventPropagation: true}}
                >
                        <div style = {{ fontWeight: 700}}
                        onClick = {() => {
                        this.setState({visible: !this.state.visible})
                }}
                        >
                          { `£${ this.props.deal.amount}` }
                        </div>
                </InfoBox>
        }
 </div>

  </Marker>
    )
  }
}


export default MapBox;


