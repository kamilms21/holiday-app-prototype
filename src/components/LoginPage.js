import React from 'react';
import { connect } from 'react-redux';
import { startLogin, startLoginWithEmail } from '../actions/auth';
import {
  Button,
  Form,
  Grid,
  Message,
  Segment,
  Divider
} from "semantic-ui-react";

class LoginPage extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     email: '',
     password: ''
   }
 }

 
 onEmailChange = (e) => {
  const email = e.target.value;
  this.setState(() => ({email}));
 }
onPasswordChange = (e) => {
  const password = e.target.value;
  this.setState(() => ({password}));
}

startLoginWithEmail = (e) => {
  e.preventDefault();
 return this.props.startLoginWithEmail(this.state.email, this.state.password);
}

 render() {
   return(
    <Grid
    textAlign="center"
    style={{ height: "100%" }}
    verticalAlign="middle"
  >
    <Grid.Column style={{ maxWidth: 510 }}>
    <Segment className="login-segment">
    <Form  onSubmit = {this.startLoginWithEmail} style = {{width: '100%'}}>
    {this.props.error && <Message size='mini' color = 'red'>
    {this.props.error}</Message>}
  <Form.Input
    fluid
    icon="user"
    iconPosition="left"
    placeholder="E-mail address"
    onChange={this.onEmailChange}
    
  />
  <Form.Input
    fluid
    icon="lock"
    iconPosition="left"
    placeholder="Password"
    type="password"
    onChange={this.onPasswordChange}

  />
  <Form.Field style={{ float: "left" }} size="mini">
    <a href="#">Forgot Password?</a>
  </Form.Field>
  <Button color="blue" fluid size="large" type="submit">
    Login
  </Button>
  <Button color="red" fluid size="large" onClick={this.props.startLogin} >
    Google login
  </Button>
  <Divider horizontal>Or</Divider>
  <Message style = {{cursor: 'pointer'}}  onClick = {this.props.registerSwitch}>
    New user?{" "}
    <span>
      Sign up
    </span>
  </Message>
</Form>
</Segment>
</Grid.Column>
</Grid>
 )}
}
const mapStateToProps = (state) => ({
  error: state.auth.error,
  reg_error: state.auth.reg_error
})

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin()),
  startLoginWithEmail: (email, password) => dispatch(startLoginWithEmail(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);




