import React, { Component } from 'react'
import DealMap from './DealMap'
import database from '../firebase/firebase';

export class DealMapPage extends Component {
    state = {
        deals: []
    }

    componentDidMount = () => {
      let _this = this;
      database.ref(`deals`).once('value').then((snapshot) => {
        const deals = [];
        snapshot.forEach((childSnapshot) => {
          deals.push({
            ...childSnapshot.val()
          });
      _this.setState({deals})
        });
           });
         
   }
    

  render() {
    return (
      <DealMap deals = {this.state.deals} /> 
    )
  }
}

export default DealMapPage
