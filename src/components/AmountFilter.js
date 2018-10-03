import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { Input, Label } from 'semantic-ui-react'




class AmountFilter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            min: '',
            max: ''
        }
    }

onMinValueChange = (e) => {
    this.setState({
        min : e.target.value
    })
}

onMaxValueChange = (e) => {
    this.setState({
        max : e.target.value
    })
}



sendPriceFilterAsProps = (e) => {
    e.preventDefault();
    let min = this.state.min ? this.state.min  : 0;
    let max = this.state.max ? this.state.max  : 100000;
    this.props.filterPrice(parseFloat(min), parseFloat(max))
    
}

    render() {
        return (
        <div className = "input-group__item">
            <form onSubmit = {this.sendPriceFilterAsProps} className = "amount-filter-form">
                  
                  <Input type='text' placeholder='£ min' className = 'input_amount'
                   onChange = {this.onMinValueChange}
                   value = {this.state.min}
                   style = {{width: "63px", marginRight: '4px'}}
                   >
    <input />
  </Input>

  <Input type='text' placeholder='£ max' className = 'input_amount'
                   onChange = {this.onMaxValueChange}
                   value = {this.state.max}
                   style = {{width: "63px",  marginRight: '4px'}}
                   >
    <input />
  </Input>

                <Button type = "submit" animated style ={{paddingLeft: '12px', marginTop: '1px'}}>
      <Button.Content visible>Go</Button.Content>
      <Button.Content hidden>
        <Icon name='right arrow' />
      </Button.Content>
    </Button>
            </form>
        </div>

        )
    }
}

export default AmountFilter;