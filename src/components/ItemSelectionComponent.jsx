import React from 'react';


class Selection extends React.Component {
    constructor(props){
        super(props);
        this.press = this.press.bind(this);
    }
    press(e) {
        let n = this.props.value.map(function(item,index,array) {
        if(e.target.textContent === item) {
            array.splice(index,1)
            return array
        }
        }
    
        )
        this.props.value = n;
    }
  render() {
    return <div onClick={this.press}>{this.props.item}
    </div>;
  }
}

export default Selection;