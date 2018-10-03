import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogin, startLogout } from '../actions/auth';
import SignIn from './SignIn';
import { Modal, Button } from 'semantic-ui-react';
import classnames from 'classnames'


class Header extends React.Component {
constructor(props) {
super(props) 
this.state  = {
  mobile: document.documentElement.clientWidth < 750,
  mobileOpen: false
}
}

componentDidMount = () => {
window.addEventListener("resize", this.updateMobile)
}

updateMobile = () => {
 if  (document.documentElement.clientWidth < 750)  {this.setState({mobile: true})} else { 
    this.setState({mobile: false})
    this.setState({mobileOpen: false})
 }
}

openMenu = () => {
  this.setState((prevState) => ({mobileOpen: !prevState.mobileOpen}))
}

closeMenu = () => {
  this.setState({mobileOpen: false})
}

closeLogout = () => {
  this.closeMenu();
  this.props.startLogout()
}

smoothScroll = (h) => {
  let i = h || 0 ;
  if (i < document.getElementById('app').clientHeight) {
    setTimeout(() => {
      window.scrollTo(0, i);
      this.smoothScroll(i + 30)
    }, 5);
  }
  this.closeMenu();
}


  render() {
    const { isAuthenticated, user } = this.props
    const menuStyle = classnames("header", {'mobile': this.state.mobile, 'open': this.state.mobileOpen})
    const menu = (
    <div id="nav-icon1" className = {this.state.mobileOpen ? 'open' : ''} onClick = {this.openMenu}>
    <span></span>
    <span></span>
    <span></span>
  </div>
    )
    
    return (
      <header className={menuStyle}>
      <Link className="header__logo" to="/" onClick = {this.closeMenu}>      
      <img className = "logo"
      src="/images/logopng.png" 
      alt="Holiday from London" />
      </Link>
     
    
       { this.state.mobile &&  menu  }
      <div className="header__content">
          <Link className="menu__item" to="/" onClick = {this.closeMenu}>
          <button className="button button--link button--menu" >   
          Home
        </button>
        </Link>  
        <Link className="menu__item" to="/deal-map" onClick = {this.closeMenu}>
        <button className="button button--link button--menu" >   
       Deal Map
      </button>
        </Link> 
        <Link className="menu__item" to="/"
        onClick = {() => {this.smoothScroll(0)}}>
        <button className="button button--link button--menu" >   
        Contact
      </button>
        </Link> 
        <Link className="menu__item" to="/" 
        onClick = {()=> {this.smoothScroll(0)}}>
        <button className="button button--link button--menu" >   
        About Us
      </button>
        </Link> 
    
        { isAuthenticated ? 
        <Link className="menu__item menu__create" to = "/create" style = {{height: '45px'}} onClick = {this.closeMenu}> 
           <Button inverted color='yellow' className = "button__add--menu">
          Add deal
        </Button>
      </Link> 
      :
      <Modal trigger = {
        <Button inverted color='yellow' className = "button__add--menu add--loggedOut" style = {{height: '45px'}} onClick = {this.closeMenu}>
        Add deal
      </Button>} >
      <Modal.Content style = {{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
          Login to be able to add new deals.
          <SignIn />
      </Modal.Content>
      </Modal> 
  
  
        }
  
          {!isAuthenticated && <SignIn close = {this.closeMenu} /> }
          {isAuthenticated && 
            <Link className="menu__item menu__item--avatar" to="/myaccount" onClick = {this.closeMenu}>
                 <img src = {user.avatar}  height = '35px' width= '35px'/>
              <button className="button button--link button--menu" style = {{paddingLeft: '3px'}} >   
                My Account
              </button>
            </Link>}
            
         {isAuthenticated && <a href="#" className="menu__item menu__logout"><button className="button button--link button--menu" onClick={this.closeLogout}>Logout</button> </a>}
         </div>
    </header>
    )
  }
}



const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid,
  user: state.auth.user
});

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin()),
  startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
