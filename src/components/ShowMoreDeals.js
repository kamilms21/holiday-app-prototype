import React, { Component } from 'react'
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {startSetDeals} from '../actions/deals';

class ShowMoreDeals extends Component {
    state = {
        showDeals: 15,
        allDeals: ''
    }


    loadMore = () => {
        this.setState((prevState) => ({
        showDeals: prevState.showDeals + 15
        }))
        this.props.startSetDeals(this.state.showDeals)
    }
        render() {
    return (
      <div>
      { this.props.allDealsQty < this.props.showedDealsQty &&  <Button basic color='blue' onClick = {this.loadMore} >
        Show More
      </Button> }
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, amount) => {
    return {
        startSetDeals: (amount) => dispatch(startSetDeals(amount))
    }
}

export default connect(undefined, mapDispatchToProps)(ShowMoreDeals);