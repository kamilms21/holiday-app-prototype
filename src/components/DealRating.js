import React from 'react';
import { connect } from 'react-redux';
import { startVotePlus } from '../actions/deals';
import { CSSTransition } from 'react-transition-group';
import { Modal } from 'semantic-ui-react';
import SignIn from './SignIn';

class DealRating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            voted: false,
            showModal: false
        }
    }

    handleClose = () => this.setState({showModal: !this.state.showModal});
  
    votePlus = (e) => {
        e.preventDefault();
        const {id, rating} = this.props;
        let newRating = rating + 1;
        if (this.props.auth.uid) { 

            const usersArray = Object.values(this.props.ratedBy)
            const votingUser = this.props.auth.user.username;
            const admin = this.props.auth.user.type
            if (usersArray.indexOf(votingUser) > -1 && admin !== 'admin') {
            return    alert('you voted already!')
            }
            const myUser = this.props.auth.user.username;
        this.props.votePlus(id, newRating, myUser);
        this.setState({voted: true})
        setTimeout(() => this.setState({voted: false}), 200)
        }
        else {
            this.setState({showModal: !this.state.showModal})
        }
        }


    render() {
        const {rating} = this.props
        return (
              <CSSTransition
                in={this.state.voted}
                timeout={200}
                classNames="rating_number"
              >
            <div className = 'rating-box' onClick = {this.votePlus}  style = {{backgroundImage: `url(../../../images/sun.svg)`, backgroundPosition: 'center center',
            backgroundSize: '100%', backgroundRepeat: 'no-repeat', cursor: 'pointer', ...this.props.style}}>
                        <span className = "rating_number"> {rating}</span> 
                        <Modal open = {this.state.showModal}
                        onClose={this.handleClose}>
                   <Modal.Content style = {{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                       Login to be able to rate new deals.
                       <SignIn />
                   </Modal.Content>
                   </Modal> 
                        </div>
                </CSSTransition>    
        )
    }
}

const mapStateToProps = (state) => {
    return {
        deals: state.deals,
        auth: state.auth
    }
}


const mapDispatchToProps = (dispatch, id, rating, username) => {
    return {
        votePlus: (id, rating, username) => dispatch(startVotePlus(id, rating, username))
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(DealRating);