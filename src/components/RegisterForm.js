import React from 'react';
import {
    Button,
    Form,
    Grid,
    Message,
    Segment
  } from "semantic-ui-react";

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            repeatpassword: '',
            email: '',
            city: ''
        }
    }
    onUsernameChange = (e) => {
        const username = e.target.value;
        this.setState(() => ({username}))
    }
    onPasswordChange = (e) => {
        const password = e.target.value;
        this.setState(() => ({password}))
    }
    onRepeatPasswordChange = (e) => {
        const repeatpassword = e.target.value;
        this.setState(() => ({repeatpassword}))
    }
    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({email}))
    }
    onCityChange = (e) => {
        const city = e.target.value;
        this.setState(() => ({city}))
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.register({
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            city: this.state.city
        })
    }

    render() {
        return (
<Segment className="login-segment">
    <Form onSubmit = {this.onSubmit} style = {{width: '100%'}}>
    {this.props.reg_error && <Message size='mini' color = 'red'>
    {this.props.reg_error}</Message>}
    <Form.Input
    fluid
    icon="user"
    iconPosition="left"
    placeholder="Username"
    onChange={this.onUsernameChange}
    
  />
  <Form.Input
    fluid
    icon="lock"
    iconPosition="left"
    placeholder="Password"
    type="password"
    onChange={this.onPasswordChange}
  />
 <Form.Input
    fluid
    icon="lock"
    iconPosition="left"
    placeholder="Repeat Password"
    type="password"
    onChange={this.onRepeatPasswordChange}
  />
    <Form.Input
    fluid
    icon="mail"
    iconPosition="left"
    placeholder="E-mail address"
    onChange={this.onEmailChange} 
  />
    <Form.Input
    fluid
    icon="home"
    iconPosition="left"
    placeholder="City"
    onChange={this.onCityChange}
  />
    <Button color="blue" fluid size="large" type="submit">
    Register
  </Button>

  </Form>
</Segment>

        )
}
}
export default RegisterForm;

