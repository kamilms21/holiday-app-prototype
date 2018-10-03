import React, { Component } from 'react'
import database from '../firebase/firebase';
import { connect } from 'react-redux';
import selectDeals from '../selectors/deals';
import DealList from './DealList';
import DealListFilters from './DealListFilters';
import DealMap from './DealMap';
import Contact from './Contact';
import About from './About';


class HomePage extends Component {

  state = {
    deals: [],
    topDeals: []
  }

  componentDidMount = () => {
    let that = this;
    database.ref(`deals`).orderByValue().on("value", snapshot => {
        const deals = [];
        snapshot.forEach((childSnapshot) => {
            deals.push({id: childSnapshot.key, ...childSnapshot.val()})
        });
        this.setState({deals})
        const topDeals = deals.sort((a, b) => {
            return b.rating - a.rating;
            }).slice(0,4)   
            that.setState({topDeals: topDeals})
        });
       
    }

  render() {
    return (
      <div>
      <div  className = "main_content">
        <DealListFilters />
        <DealList 
        deals = {this.props.deals} 
        topDeals = {this.state.topDeals} 
        allDealsQty = {Object.keys(this.state.deals).length} 
        showedDealsQty = {Object.keys(this.props.deals).length} 
        />
        </div>
      <DealMap  
      deals = {this.props.deals}
      isMarkerShown
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCZEgeiTKeyXPSzeX_K9nQwEtayMmE5Z2w&libraries=places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `800px` }} />}
      mapElement={<div style={{ height: `100%` }} />} />
    <footer>
    <Contact />
    <About />
    </footer>
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    deals: selectDeals(state.deals, state.filters)
  };
};

export default connect(mapStateToProps)(HomePage);
