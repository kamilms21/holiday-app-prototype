import React from 'react';
import TopRatedDeal from './TopRatedDeal';
import Slider from 'react-slick';


class TopRatedDeals extends React.Component {

   
render() {
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      }
    return (  

<div className = "slider_wrapper">
<Slider {...settings}>
{ this.props.topDeals ? this.props.topDeals 
      .map((deal) => {
        if (!deal.expired) { 
        return <TopRatedDeal key = {deal.id} deal = {deal} />
        }
      })
    : <p>loading</p>
    }
</Slider>
</div>
        )
    }
}   



export default TopRatedDeals;