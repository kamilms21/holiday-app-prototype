import moment from 'moment';

// Get visible deals

export default (deals, { text, sortBy, startDate, flyDate, minPrice, maxPrice, lastMinute, expired }) => {
  return deals && deals.filter((deal) => {
    const createdAtMoment = moment(deal.flyingOut);
    const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
    const endDateMatch = flyDate ? flyDate.isSameOrAfter(createdAtMoment, 'day') : true;
    const textMatch = deal.title.toLowerCase().includes(text.toLowerCase());
    const expiredCheck = deal.expired; 

    return startDateMatch && endDateMatch && textMatch && !expiredCheck;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.flyingOut > b.flyingOut ? 1 : -1;
    } else if (sortBy === 'amount') {
      return a.amount < b.amount ? 1 : -1;
    }
  })
    .filter((deal) => {
    return deal.amount >= minPrice && deal.amount <= maxPrice;
  })
  .filter((deal) => {
    if (lastMinute) {
      return moment(deal.flyingOut).isSameOrBefore(moment().add(14, 'days'));
    }
    else {
      return deal
    }

  })
  .filter((deal) => {
    if (expired) {
      return moment(deal.flyingOut).isSameOrAfter(moment().subtract(7, 'days'));
    
    }
    else {
      return moment(deal.flyingOut).isSameOrAfter(moment());
    }
  })
}
 
