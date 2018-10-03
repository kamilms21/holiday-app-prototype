import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import selectDeals from '../selectors/deals';
import selectDealsTotal from '../selectors/deals-total';

export const DealsSummary = ({ dealsCount, dealsTotal }) => {
  const dealsWord = dealsCount === 1 ? 'deal' : 'deals';
  const formattedDealsTotal = `£${numeral(dealsTotal / 100).format('0,0.00')}`;

  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">Viewing <span>{dealsCount}</span> {dealsWord} totalling <span>{formattedDealsTotal}</span></h1>
        <div className="page-header__actions">
          <Link className="button" to="/create">Add Deal</Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const visibleDeals = selectDeals(state.deals, state.filters);

  return {
    dealsCount: visibleDeals.length,
    dealsTotal: selectDealsTotal(visibleDeals)
  };
};

export default connect(mapStateToProps)(DealsSummary);
