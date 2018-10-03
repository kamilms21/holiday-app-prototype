import React from 'react';
import DealRating from './DealRating';
import { Link } from 'react-router-dom';

const TopRatedDeal = (props) => (
    <div className = "TopRatedDeal">
    <div className = "TopRatedDeal__header">
    <Link to={`/deal/${props.deal.title}`} className = "top-rated-deal__img" style = {{display: 'flex', width: '100%', height: '200px', backgroundImage: `url(${props.deal.image})`,     
  backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}> </Link>
        <DealRating id = {props.deal.id} rating = {props.deal.rating} ratedBy = {props.deal.ratedBy} style = {{position: 'absolute', top: '0', left: '-28px'}} />
    </div>
        <p style = {{ whiteSpace: 'nowrap', overflow: 'hidden'}}>{titleShorter(props.deal.title)}</p>
    </div>
)

const titleShorter = (title) => {
    if (title.length > 24) {
        return title.slice(0, 23) + ' ...';
    }
    else {
        return title;
    }
}

export default TopRatedDeal;