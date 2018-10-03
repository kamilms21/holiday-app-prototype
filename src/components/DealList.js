import React from 'react';
import DealListItem from './DealListItem';
import TopRatedDeals from './TopRatedDeals';
import ShowMoreDeals from './ShowMoreDeals';

export const DealList = (props) => (
  <div className="list-body">
  <TopRatedDeals topDeals = {props.topDeals} />  
      {
        props.deals.length === 0 ? (
          <div className="list-item list-item--message">
            <span>No Deals</span>
          </div>
        ) : (
            props.deals
            .map((deal) => {
              return <DealListItem key={deal.id} {...deal} />;
            })
          )
      }
      <ShowMoreDeals 
      allDealsQty = {props.allDealsQty}
      showedDealsQty = {props.showedDealsQty}
      /> 
    </div>
);


export default DealList;
