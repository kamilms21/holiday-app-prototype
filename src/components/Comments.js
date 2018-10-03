import React from 'react';
import { connect } from 'react-redux';
import { addCommentDB } from '../actions/deals'
import Comment from './Comment';
import CommentForm from './CommentForm';
import database  from '../firebase/firebase';
import { Button, Icon } from 'semantic-ui-react'

class Comments extends React.Component {
constructor(props) {
    super(props)
    this.state = {
        comments: [],
        showEditor: false
    }
}

componentDidMount() {
    let commentRef = database.ref(`deals/${this.props.id}/comments`);
    let _this = this;
    commentRef.on('value', (snapshot) => {
        _this.setState({
        comments: snapshot.val(),
        });
        });
      }
commentEditor = () => {
    this.setState({
        showEditor: !this.state.showEditor
    })
}

onSubmit = (id, comment) => {
    this.props.addCommentDB(id, comment);
}
    render() {
        return (   
        <div style = {{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>       

            {!this.state.comments ? <p>No any comments yet. Add some ;)</p> : 
               Object.entries(this.state.comments).map((comment, i) => {
                return <Comment key={i} {...comment[1]} id = {comment[0]} deal_id = {this.props.id} users = {this.props.users} user = {this.props.auth.user && this.props.auth.user.username} />
            })
        }

            
        
           {this.props.auth.user && !this.state.showEditor ? <Button content = 'Add comment' icon = 'commenting' labelPosition='right' onClick = {this.commentEditor} />
             : null}
          {this.state.showEditor && <CommentForm 
            onSubmit  = {this.onSubmit}
            id = {this.props.id}
            user = {this.props.auth.user.username}
            comments = {this.props.comments}
           />   
        }  
        {this.state.error && <Message size='mini' color = 'red' >
        {this.state.error}</Message>}
        
        </div>
        )
    
}
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        users: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCommentDB: (id, comment) => dispatch(addCommentDB(id, comment))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Comments);