import React from 'react';
import database from '../firebase/firebase';
import { connect } from 'react-redux';
import DealListItem from './DealListItem';
import { Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { startRemoveDeal } from '../actions/deals';

class UserDeals extends React.Component {
        state = {
           deals: []
        };
   
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
        {
        this.props.username && this.state.deals ? 
       this.props.type === 'admin' ? 
            this.state.deals.map((deal) => {
             return <div className = "myaccount__deal">
             <DealListItem {...deal} />
            <div className = "myaccount__deal-actions">

            <Link to = {`/edit/${deal.title}`}>
            <Button icon labelPosition='left'>
             <Icon name='edit' />
                 Edit
                </Button>
            </Link>
        <Button icon labelPosition='left' onClick = {()=>{this.props.startRemoveDeal(deal.id)}}  >
        Remove
        <Icon name='remove' />
        </Button>
            </div>
            </div>
         })
      :
        this.state.deals.filter((deal) => { return deal.addedBy === this.props.username})
        .map((deal) => {
             return <div className = "myaccount__deal">
             <DealListItem {...deal} />
            <div className = "myaccount__deal-actions">

            <Link to = {`/edit/${deal.title}`}>
            <Button icon labelPosition='left'>
             <Icon name='edit' />
                 Edit
                </Button>
            </Link>
        <Button icon labelPosition='left' onClick = {()=>{this.props.startRemoveDeal(deal.id)}}  >
        Remove
        <Icon name='remove' />
        </Button>
            </div>
            </div>
         })
             : <p>No deals</p>
             }
     </div>
        )
    }
}
const mapDispatchToProps = (dispatch, props) => ({
    startRemoveDeal: (data) => dispatch(startRemoveDeal(data))
  });
  
  export default connect(undefined, mapDispatchToProps)(UserDeals);

