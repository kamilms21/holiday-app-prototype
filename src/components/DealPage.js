import React from 'react';
import { connect } from 'react-redux';
import Comments from './Comments';
import draftToHtml from "draftjs-to-html";
import convert from 'htmr';
import { emojify } from "node-emoji";
import moment from 'moment';
import numeral from 'numeral';
import DealRating from './DealRating';
import MdPlace from 'react-icons/lib/md/place';
import MdHome from 'react-icons/lib/md/home';
import MdFlightTakeoff from 'react-icons/lib/md/flight-takeoff';
import MdBookmarkOutline from 'react-icons/lib/md/bookmark-outline';
import MdBookmark from 'react-icons/lib/md/bookmark';
import { addBookmarkDB } from '../actions/users';
import DealPageMap from './DealPageMap';
import { Button, Icon } from 'semantic-ui-react'

const onMissing = (name) => {
  return name;
}


export class DealPage extends React.Component {
    render()
    {

        return (
        
            <div>
            {this.props.deal ?
            (
                <div className = 'content-container'>
                <div className = 'deal-page'>
                <img className = 'dealpage__img' src = {this.props.deal.image} alt = 'Deal' />
                <h2 className = "dealpage__title">{this.props.deal.title}</h2>
                <div className = "dealPage_content">
                
                <div className = "dealPage_info">
                 <DealRating id = {this.props.deal.id} ratedBy = {this.props.deal.ratedBy} rating = {this.props.deal.rating} style = {{alignSelf: 'center'}} />
                 <span><MdPlace /> {this.props.deal.location} </span>
                <span><MdHome /> {this.props.deal.hotel} </span>
                 <span><MdFlightTakeoff /> {moment(this.props.deal.flyingOut).format('L')}</span>
                 <span><MdFlightTakeoff /> {this.props.deal.airport}</span>
                 <span><span class = "dealPage_pound">£</span>{`${numeral(this.props.deal.amount).format('0,0.00')}`}</span>
                 </div>
                <div className = "dealPage_body">
                <div className = "dealPage_desc">{convert(draftToHtml(JSON.parse(emojify(this.props.deal.description, onMissing))))}</div>
                    <div className = "dealPage_footer">
                     {this.props.users.filter((user) => {
                    return user.username === this.props.deal.addedBy
                      }).map((user) => {
                        return <span className = "deal_low_avatar"><strong><p>{moment().from(this.props.deal.createdAt)} by {user.username}</p></strong> <img src = {user.avatar} height = '40' width = '40' style = {{marginTop: '-5px'}}/> </span>
                    })}
                    <a href = {`${this.props.deal.ext_url}`}>
                     <Button color = 'red' animated='horizontal'  >
      <Button.Content hidden>Go there</Button.Content>
      <Button.Content visible>
        <Icon name='plane' />
      </Button.Content>
    </Button>
    </a>

                    </div>
                </div>
                <DealPageMap deal = {this.props.deal} />
                </div>

           
                 <Comments 
                 comments = {this.props.deal.comments} 
                 id = {this.props.deal.id} />
                 </div>
                 </div>
            )
            :
            <p>loading...</p>
            }
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        deal: state.deals.find((deal) => deal.title === props.match.params.title),
        users: state.users
    }
}


export default connect(mapStateToProps)(DealPage);


