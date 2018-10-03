import React from 'react';
import { connect } from 'react-redux';
import DealForm from './DealForm';
import { startAddDeal } from '../actions/deals';

export class AddDealPage extends React.Component {
  onSubmit = (deal) => {
    this.props.startAddDeal(deal);
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <div>
          <DealForm
            onSubmit={this.onSubmit}
          />
        </div>
      </div> 
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
})

const mapDispatchToProps = (dispatch) => ({
  startAddDeal: (deal) => dispatch(startAddDeal(deal))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDealPage);
