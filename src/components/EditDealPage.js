import React from 'react';
import { connect } from 'react-redux';
import DealForm from './DealForm';
import { startEditDeal } from '../actions/deals';

export class EditDealPage extends React.Component {
  onSubmit = (deal) => {
    this.props.startEditDeal(this.props.deal.id, deal);
    this.props.history.push('/');
  };
 
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Deal</h1>
          </div>
        </div>
        <div className="content-container">
         { this.props.deal && <DealForm
            deal={this.props.deal}
            onSubmit={this.onSubmit}
          />
         }
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  deal: state.deals.find((deal) => deal.title === props.match.params.title)
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditDeal: (id, deal) => dispatch(startEditDeal(id, deal))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditDealPage);
