import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByFlyDate, sortByAmount, setStartDate, setFlyDate, setPriceFilter, setLastMinuteFilter, setExpiredFilter } from '../actions/filters';
import AmountFilter from './AmountFilter';
import SocialIcons from './SocialIcons';
import Newsletter from './Newsletter';
import classNames from 'classnames';

export class DealListFilters extends React.Component {
  state = {
    calendarFocused: null,
    checkedLastMinute: false,
    checkedExpired: false,
    mobileOpen: false
  };
  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setFlyDate(endDate);
  };
  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));
  }
  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value);
  };
  onSortChange = (e) => {
    if (e.target.value === 'date') {
      this.props.sortByFlyDate();
    } else if (e.target.value === 'amount') {
      this.props.sortByAmount();
    }
  };

 filterPrice = (min, max) => {
    this.props.setPriceFilter(min, max)
  }

  onLastChange = (e) => {
    const checkbox = e.target;
    this.setState({checkedLastMinute: checkbox.checked});
    this.props.setLastMinuteFilter(checkbox.checked);
  }
  onExpChange = (e) => {
    const checkbox = e.target;
    this.setState({checkedExpired: checkbox.checked});
    this.props.setExpiredFilter(checkbox.checked);
  }
toogleMobile = () => {
  this.setState((prevState) => ({mobileOpen: !prevState.mobileOpen}))
}

  render() {
    const filterStyle = classNames('sidebar_right', {'sidebar_right--open': this.state.mobileOpen})
    return (
      <div className = {filterStyle}>
      <span className = "filter__handler" 
      onClick = {this.toogleMobile}> Filters</span>
        <div className="input-group">
          <div className="input-group__item input-search">
            <input
              type="text"
              className="text-input"
              placeholder="Search Deals"
              value={this.props.filters.text}
              onChange={this.onTextChange}
              style = {{borderBottom: 'none'}}
            />
          </div>
          <div className="input-group__item" style = {{'padding': '1px'}}>
            <select
              className="select"
              value={this.props.filters.sortBy}
              onChange={this.onSortChange}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          <div className="input-group__item">
            <DateRangePicker
              startDate={this.props.filters.startDate}
              endDate={this.props.filters.flyDate}
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              showClearDates={true}
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
          </div>
          <AmountFilter filterPrice = {this.filterPrice}/>
          <div className="input-group__item filtered_checkboxes">
            <label className = "filter_checkbox">
              <input type = "checkbox" 
              onChange = {this.onLastChange} 
              checked = {this.state.checkedLastMinute}/>
              <span>Last minute</span>
            </label>
        </div>
        <div className="input-group__item filtered_checkboxes" style = {{marginTop: '5px'}}>
            <label className = "filter_checkbox">
              <input type = "checkbox" 
              onChange = {this.onExpChange} 
              checked = {this.state.checkedExpired}
             />
              <span>Show Expired</span>
            </label>
        </div>
        </div>
        <div className = 'bottom-sidebar'>
          <Newsletter />
          <SocialIcons />
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByFlyDate: () => dispatch(sortByFlyDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setFlyDate: (endDate) => dispatch(setFlyDate(endDate)),
  setPriceFilter: (min, max) => dispatch(setPriceFilter(min, max)),
  setLastMinuteFilter: (checkbox) => dispatch(setLastMinuteFilter(checkbox)),
  setExpiredFilter: (checkbox) => dispatch(setExpiredFilter(checkbox))
});

export default connect(mapStateToProps, mapDispatchToProps)(DealListFilters);
