import React from 'react';
import moment from 'moment';
import MyEditor from './MyEditor';
import { Button, Icon } from 'semantic-ui-react'
import { Message } from 'semantic-ui-react';

class CommentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: '',
            addedBy: this.props.user,
            date: moment().valueOf(),
            error: ''
        }
    }

    getEditorData = (editorData) => {
        this.setState(() => ({ comment: editorData }));
      
      } 
clearEditor = () => {
    let a;
    arguments ? a = 1 : a = 1;
    return a;
}
    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.comment.length < 1) {
            this.setState({error: 'you have to write something :)'})
        }
        else {
        this.props.onSubmit(this.props.id, this.state);
        this.clearEditor('a')
        }
    }

    render() {
        return (
            <div>
                <form onSubmit = {this.onSubmit} >
                    <MyEditor editorData = {this.getEditorData} clear = {this.clearEditor} comment = 'comment'  />
                    <Button  icon labelPosition='right'  type = 'submit' style = {{marginTop: '10px'}} >
          Submit
          <Icon name='right write' />
          </Button>
                </form>
            </div>
        )
    }

}

export default CommentForm;