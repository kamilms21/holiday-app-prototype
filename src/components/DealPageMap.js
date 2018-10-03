import React from 'react';
import { connect } from 'react-redux';
import selectDeals from '../selectors/deals';
import MapBox from './MapBox';
const { compose, withProps, withStateHandlers } = require("recompose");
const FaAnchor = require("react-icons/lib/fa/anchor");
const {
  withGoogleMap,
  GoogleMap,
  Marker
} = require("react-google-maps");

const svg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAARzSURBVGhDzdpZqHZTHMfxY57HDKHMJckUuTFlSskQXhciQyFEKJnJVIakjBemC1O4knkqLsh4ISFkyDwPmWe+35ddq+W/91prn9d5nl996j2nd61nD2vt/V/rOTMjsjQOwPW4D8/hcdyM07ElFkJLFsPOOBu34xHci2uxD5bEAssSOAff46+CD3EWVsZQ1sWV+ApRP513sBdmnXXwGqIPGfIdLsEySLMhbsNviNpF/sQxGB2vmlck6ryW7XeHd/V8/ITo/5V4MnujOYvgaUSdjuGQi37f4j0si6aciKizSXOuVscnySeIOvoUD8En1dW4Gy/jD0T/v4bz5V28BSf/0PxxqC6MquyHtLHj2oPeHg65KBvgAnyNtG2fz3AxNsfiSOPw2QOXwZPL2+6Kqni1u0aPwSdXKV6llbAenkL6wbl7sApqYr974gV07S9HVV6FDa5BdAeWwr64As/iC3Qfol+zn1Nvw7ZH4VgchB2xIobii/ZwOPS8UMX4Jv0dtyJ/S68Bh9g3iA5ytl7HVdgFffNgLTyKfDj+J6vjDaQvMjs9Az8iOoD/w5s4GZZFeXwYFUuXtWGN02UFOE+iD5sLH+FItNZw88+0a7QcShN3rtwPR8uoOE+iTms4zx7G0dgMi2JNWADegJoCNOc7xMd8U3yyRJ2V+ASzpC9dPZ9SVg99L94+ljrWgFVxaL2IqKM+38IHgsMxj/1ZOEaPWN89N8GiMOo34nD3DhezA6IO+lhcRrfcE7Bi7S6KE/cwRPFEa6sCnYRiLkLUOOdVPA99V2db5G2cO33ZAh8jbxOxNivelScRNU79ggMxFCd21DYafl3WR1RfRYorx/cRNex4VfdHKYcgal+q3TZCTfVgkTqYoVpJx6EmJyBqvylK8WqXHgBuUgzmZ0QNZWVcm3MR9bE1auJOStS+8wAG8zmihh9gedTG6jnqZzvUxMe165aoD92FwXRlfG4eWmKVGvVTeyLGUj/qQ96xwdyBvNHzaC3c3CzI+1HLibj28f0T9eP6ZDCnIG/kKq0llt99k3UbtORC5H24R2DtNhjX5mkjXz7VC/5/Y6GY9pHaBC2xasj7cNgW4/LW3ZKukRtrrTkC6QenXPO0Jp+3riKrch26RpYOrbkF6QenLBRb4z5x1/4Zf1Ebt1xs5J1pneTG4dh9cK643g6SVgm7+YvaePCv4M75P7XFeik98JTriTHxKwvb3zj/p8a4VvYrgtb0lSZyLTEmq8Ea0D2E5riTstM//2yKe13RSci5MyY+NZuG1Gzj9x/RCXSKFeu0xAONTqBzKKY+bj5/iegEOlth6nMqooPv/ICqTYNJxvK+tLXzBKY+bj5HB586DVMdq1nX8dHBp2qWuBOLLyh376MDT72EqY0vKTeXowPPHY+pjLVYaXOg49ZO6RupicQ7UXsSOhNTF69s7XCS1W7+ZxwTj2sUv8yMDjjiurp6JTcX2RiuS1q2/jVmibzAsyoOxoMY81cNl2Li8Wto/xjMoTSG36/MUWZm/gb/5KDYwQ8fFgAAAABJRU5ErkJggg=="



const MapWithAMakredInfoWindow = compose(
  withStateHandlers(() => ({
    isOpen: false,
  }), {  
  }),
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={5}
    defaultCenter={{ lat: props.deal.locationMap.lat, lng: props.deal.locationMap.lng  }}
    styles = {{width: '200px'}}
  >
{
  <Marker 
    position = {{ lat: props.deal.locationMap.lat, lng: props.deal.locationMap.lng  }}
    icon = {svg}
  />

}
  </GoogleMap>
)


class DealPageMap extends React.Component {
 render() {

  return (
<MapWithAMakredInfoWindow
    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCZEgeiTKeyXPSzeX_K9nQwEtayMmE5Z2w&libraries=places"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `300px`, width:'100%', marginBottom: '25px' }} />}
    mapElement={<div style={{ height: `100%` }} />}
    deal = {this.props.deal}
  /> 

  )
}
}





export default DealPageMap;



