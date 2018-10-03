import React, { Component } from 'react'
import database from '../firebase/firebase';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startRemoveDeal } from '../actions/deals';


class Admin extends Component {
    state = {
        deals: []
    }

    componentDidMount() {
        let _this = this;
       database.ref(`deals`).on('value', (snapshot) => {
        const deals = [];
        snapshot.forEach((childSnapshot) => {
            deals.push({id: childSnapshot.key, ...childSnapshot.val()})
            })
            _this.setState(() => ({
                deals
            }));
        })    
    }
    


  render() {
    return (
      <div>
        {this.props.user && this.props.user.type === 'admin'
        ? 
        <p> Hi, {this.props.user.username} </p>
        
        :
        <p> You are not allowed to be here </p>
        }
        {this.state.deals && this.state.deals.map(deal => <p>{deal.title} ====> 
            <span onClick = {()=>{this.props.startRemoveDeal(deal.id)}}>delete</span>
            </p>)}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    user: state.auth.user
})

const mapDispatchToProps = (dispatch, props) => ({
    startRemoveDeal: (data) => dispatch(startRemoveDeal(data))
  });

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
