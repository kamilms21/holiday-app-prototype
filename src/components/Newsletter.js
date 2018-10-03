import React from 'react';
import { Button } from 'semantic-ui-react';
import { Icon, Input } from 'semantic-ui-react';
import database from '../firebase/firebase';


class Newsletter extends React.Component {
state = {emailInput: '', buttonState: ''}

  subscribeDeals = () => {
    database.ref(`subscriptions`).push(this.state.emailInput);
    this.setState({emailInput: ''})
    this.setState({buttonState: 'sent'})
  }

 render() {
   return (
    <div className = "newsletter" >
    <Input action='add' iconPosition='left' placeholder='Email' style = {{borderRight: '1px solid rgba(34,36,38,.15)'}}>
  <Icon name='at'/>
  <input type="text" value = {this.state.emailInput} onChange = {e => this.setState({emailInput: e.target.value})} />
</Input>
    <Button disabled = {!!this.state.buttonState} basic color='blue' style = {{width: '100px', alignSelf: 'center', marginTop: '7px'}}
    onClick = {this.subscribeDeals}
    >
  {this.state.buttonState ? 'Thanks!' : 'Subscribe' }
</Button>
</div>
   )
 }
}

export default Newsletter;