import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react'
import {startRegister} from '../actions/users';
import RegisterForm from './RegisterForm';
import Login from './LoginPage';
import { Button } from "semantic-ui-react";


    class SignIn extends React.Component {
  state = {
     showRegister: false
   }
          registerSwitch = () => {
            this.setState({showRegister: true})
          }
          registerNewUser = (user) => {
            this.props.startRegister(user);
          }
      
        render() {
          return (
            <div>
              <Modal
                style = {{width: '400px'}}
                 trigger= {
                 <Button className = "menu__login" color = "red" style = {{height: '45px', marginLeft: '12px'}}
                 onClick = {this.props.close}>
                 Login / Register
               </Button>
               
              }
              >
              <Login registerSwitch = {this.registerSwitch} /> 
            {this.state.showRegister && <RegisterForm register = {this.registerNewUser} reg_error = {this.props.reg_error} /> }
              </Modal>
            </div>
          );
        }
      }
      const mapStateToProps = (state) => ({
        reg_error: state.auth.reg_error
      })
      const mapDispatchToProps = (dispatch) => ({
        startRegister: (user) => dispatch(startRegister(user))
      });
      
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
