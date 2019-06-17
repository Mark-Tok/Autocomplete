import React from 'react';


class Item extends React.Component {
  constructor(props) {
    super(props);
    this.lol = this.lol.bind(this);

}
  lol(){
    alert(this.props.name)
    console.log(this.state.items)
}
  render() {
    return <li onClick={this.lol}>{this.props.name}</li>;
  }
}

export default Item;