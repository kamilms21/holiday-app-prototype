import React, { Component } from 'react';

export default class About extends Component {
    
      render() {
        return (
          <div>
          <div className = "about">
            <img className = "img_about1" src = '../../images/dominican.jpg' />
            <img className = "img_about2" src = '../../images/sardignia.jpg' />
            <img className = "img_about3" src = '../../images/mexico.jpg' />
          </div>
            <div className = "footer__bottom">
            Copyright HolidayFromLondon @ 2018
            </div>
          </div>
    )
  }
}
