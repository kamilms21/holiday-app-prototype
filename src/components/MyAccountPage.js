import React from 'react';
import { connect } from 'react-redux';
import database from '../firebase/firebase';
import EditProfile from './EditProfile';
import UserDeals from './UserDeals'
import { Container, Header } from 'semantic-ui-react'
import { Button, Icon } from 'semantic-ui-react'


class MyAccountPage extends React.Component {
    constructor(props) {
         super(props);
        this.state = {
            username: '',
            email: '',
            city: '',
            type: '',
            editUser: false,
            avatar: this.props.auth.user.avatar, 
            showEdit: false
        };
    }
componentDidMount () {
    let _this = this;
   database.ref(`/users/${this.props.auth.uid}`).on('value', (snapshot) => {
        const user = snapshot.val()
        _this.setState(() => ({
            username: user.username,
            email: user.email,
            type: user.type,
            city: user.city,
            avatar: user.avatar
        }));
      })
}

showChageDetails = () => {
    this.setState({
        showEdit: !this.state.showEdit
    })
}
render() {
    return (
<Container textAlign='center'>
<img className = 'myaccount__avatar' alt = 'User Avatar' src = {this.state.avatar} />
    <p>Welcome {this.state.username}. How are you today?</p>
    <p>Your email is {this.state.email}</p>
    <Button icon labelPosition='right' onClick = {this.showChageDetails}>
             Change details
             <Icon name='right edit' />
           </Button>
    {this.state.showEdit && <EditProfile /> }
    <h2 style = {{'marginTop': '40px'}}> Your deals </h2>
    <UserDeals username = {this.state.username} type = {this.props.auth.user.type} />
</Container>
)};
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(MyAccountPage);
