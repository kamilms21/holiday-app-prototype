import React, { Component } from 'react';
import { Button, Form, Input, TextArea } from 'semantic-ui-react';
import { connect } from 'react-redux' 

class Contact extends Component {
    
  // https://us-central1-AIzaSyDMa965zuWhlfeYyMuph_OgSz33v2XrSt4.cloudfunctions.net/sendMail
      
    onSubmit = (e) => {
      e.preventDefault()
      this.props.send
    }

    render() {
        return (
          <div className = "contact">
          <div className = 'about__description'>
          We are people who love travel,
          especially at reasonable costs. 
          </div>
          <Form>
            <Form.Group widths='equal' onSubmit = {this.onSubmit}>
              <Form.Field control={Input} placeholder='First name' />
              <Form.Field control={Input} placeholder='Email' />
            </Form.Group>
            <Form.Field control={TextArea} placeholder='How can We help You ?' />
            <Form.Field control={Button}>Send</Form.Field>
          </Form>
          </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  send: () => {dispatch(sendEmail())}
}) 

export default connect(undefined, mapDispatchToProps)(Contact)
