import React from 'react';
import Item from './ItemArrayComponent';
import '../App.css';

  class Input extends React.Component {
          constructor(props) {
              super(props);
              this.state = {
                  items: this.props.data.items,
                  widthInput: 20,
                  selection: [],
                  active: false,
                  newArray: []
              };
              this.filterList = this.filterList.bind(this);
              this.retinaInput = this.retinaInput.bind(this);
              this.focusInput = this.focusInput.bind(this);
              this.addItem = this.addItem.bind(this);
              this.deleteItem = this.deleteItem.bind(this);

          }

          filterList(e) {
              //фильтруем введённое значение
              let filterList = this.props.data.items.filter(function (item) {
                  return item.toLowerCase().search(e.target.value.trim().toLowerCase()) !== -1;
              });
              this.setState({
                  items: filterList
              });
          }

          retinaInput(e) {
              let changeWidthInput = +e.target.value.length * 10;
              this.setState({
                  widthInput: changeWidthInput
              });
              if (changeWidthInput >= 500) {
                  this.setState({
                      widthInput: 500
                  });
              }
          }

          focusInput() {
              this.refs.input.focus();
          }

          addItem(e) {
              if (e.keyCode === 13) {
                if(this.refs.input.value.trim() === '') {
                    alert('Введите значение')
                }
                else {
                  //удаляем ведённые пункт из массива, при его совпадении с пунктом массива  
                  let itemArray = this.state.items.map((item) => {
                      return item
                  })
                  let itemDelete = itemArray.join('');
                  if (this.refs.input.value.trim() === itemDelete) {
                      let indexArray = this.props.data.items.map((item, index) => {
                          if (itemDelete === item) {
                              return index
                          }
                      })
                      let indexDelete = parseInt(indexArray.join(''));
                      let arrayDelete = this.props.data.items;
                      arrayDelete.splice(indexDelete, 1)
                      //обновляем состояние
                      this.setState({
                          items: arrayDelete
                      })
                  }

                  //добавляем введённое значение в массив selection
                  let arraySelect = this.state.selection;
                  if(arraySelect.includes(this.refs.input.value.trim())) {
                      alert('Данное значение уже есть')
                  }
                  else {
                    arraySelect.push(this.refs.input.value.trim())
                  }
                  this.refs.selection.appendChild(this.refs.input);
                  //обновляем состояние
                  this.setState({
                      selection: arraySelect,
                      widthInput: 20,
                      items: this.props.data.items
                  })
                  this.refs.input.focus();
                  this.refs.input.value = ' ';
              }
            }
              //удаляем пункт при нажатии на backspace
              if (this.refs.input.value.length < 1 && e.keyCode === 8) {
                  let deleteItemSelection = this.state.selection;
                  deleteItemSelection.pop();
                  this.setState({
                      selection: deleteItemSelection
                  })
              }
              
          }
        

          deleteItem(e) {
              let arrayIndexDelete = this.state.selection.map((item, index) => {
                  if (e.target.value === item) {
                      return index;
                  }
              })
              let deleteItem = this.state.selection.map((item, index) => {
                  if (e.target.value === item) {
                      return item;
                  }
              })
              let panelArray = this.props.data.items;
              let itemDelete = deleteItem.join('').trim()
                     
                panelArray.push(itemDelete)
              
              

              let indexDelete = parseInt(arrayIndexDelete.join(''));
              let arrayDelete = this.state.selection;
              arrayDelete.splice(indexDelete, 1)
              
              this.setState({
                  items: panelArray,
                  selection: arrayDelete,
              });
          }

  render() {
      return(
          <div>         
              <h2>{this.props.data.title}</h2>
              <div onClick={this.focusInput} className="input__wrapper">
              <div className="input__selection" ref='selection'>
                  {
                      this.state.selection.map((item, index) => {
                        return <div  key={index}><button onClick={this.deleteItem} value={item}>X</button>{item}</div>
                    }) 
                  }
              <input placeholder="" onKeyUp={this.addItem} style={{width:this.state.widthInput + 'px'}} onKeyDown={this.retinaInput} ref='input' onChange={this.filterList} />
              </div>
              </div>
              <ul>
                  {
                      this.state.items.map(function(item){
                          return <Item key={item} name={item} />
                      })
                  }
              </ul>
          </div>);
  }
}

export default Input;
