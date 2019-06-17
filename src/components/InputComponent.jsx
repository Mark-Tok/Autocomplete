import React from 'react';
import Item from './ItemArrayComponent';
import '../select.scss';
import '../App.css';

  class Input extends React.Component {
          constructor(props) {
              super(props);
              this.state = {
                  items: this.props.data.items,
                  widthInput: 20,
                  selection: [],
                  active: false,
                  newArray: [],
                  show: 'none'
              };
              this.filterList = this.filterList.bind(this);
              this.retinaInput = this.retinaInput.bind(this);
              this.focusInput = this.focusInput.bind(this);
              this.addItem = this.addItem.bind(this);
              this.deleteItem = this.deleteItem.bind(this);
              this.addItemList = this.addItemList.bind(this);
              
          }

          filterList(e) {

                //фильтруем введённое значение  
              let filterList = this.props.data.items.filter(function (item) {
                  return item.toLowerCase().search(e.target.value.replace(/[/\\/]/g,'').trim().toLowerCase()) !== -1;
              });
              
            this.setState({
                items: filterList,
            });        
            if(filterList.length === 0) {
            let hideList = this.state.show;
            hideList = 'none';
            console.log(hideList)
         
            
                this.setState({
                    show: hideList
                });
            }
        }

          addItemList(e) {

            let arrayIndexDelete = this.props.data.items.map((item, index) => {
                if (e.target.textContent === item) {
                    return index
                };
            });
            let deleteItem = this.props.data.items.map((item, index) => {
                if (e.target.textContent === item) {
                    return item;
                };
            });
            let arrayDelete = this.state.selection;
            let itemDelete = deleteItem.join('').trim();
            console.log(itemDelete)

            let indexDelete= parseInt(arrayIndexDelete.join(''));
            let deleteItemSelection = this.props.data.items;

            arrayDelete.push(itemDelete)

            deleteItemSelection.splice(indexDelete, 1);

            let hideList = this.state.show;
            hideList = 'none';

            this.setState({
                items: deleteItemSelection,
                selection: arrayDelete,
                show:hideList
            });

            this.refs.input.value = ' '
            this.refs.input.focus();
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
            if (e.keyCode !== 8) {
                let showList = this.state.show;
                showList = 'block';
                this.setState({
                    show: showList
                });
              }
              if (e.keyCode === 13) {
                if(this.refs.input.value.trim() === '') {
                    alert('Введите значение')
                    let showList = this.state.show;
                showList = 'none';
                this.setState({
                    show: showList
                });
                }
                else {
                const valueInput  = this.refs.input.value.trim();
                const valueInputArray = valueInput.match(/"[^"]*"|'[^']*'|[^\s,]+/g);
                // /'[^"]*'|"[^"]*"|[^\s,]+/g
                if(valueInputArray.length === 1) {
                    //проверка введеного значения в исходном массиве         
                    let itemArray = this.state.items.map((item) => {
                        return item.replace(',', ' ')
                    })
                    let itemDelete = itemArray.join('');
                    if (valueInputArray.join('') === itemDelete) {
                        let indexArray = this.props.data.items.map((item, index) => {
                            if (itemDelete === item) {
                                return index
                            }
                        })
                        let indexDelete = parseInt(indexArray.join(''));
                        let arrayDelete = this.props.data.items;
                        arrayDelete.splice(indexDelete, 1)
                        //обновляем состояние, если в массиве значение имеется
                        this.setState({
                            items: arrayDelete
                        })
                    }

                   //добавляем введённое значение в массив selection
                  let arraySelect = this.state.selection;
                  if(arraySelect.includes(valueInputArray.join(''))) {
                      alert('Данное значение уже есть')
                  }
                  else {
                    let deleteQuotes = valueInputArray.map((item) => {
                        return item.replace(/['"«»]/g, '')
                    })
                    console.log(deleteQuotes)
                    arraySelect.push(deleteQuotes.join(''))
                    this.setState({
                        selection: arraySelect,
                        widthInput: 20,
                        items: this.props.data.items
                    })
                  }
                  this.refs.selection.appendChild(this.refs.input);
                  //обновляем состояние
                  
                  console.log(this.state.selection)
                  this.refs.input.focus();
                  this.refs.input.value = '';
                }

                else if(valueInputArray.length > 0) {
                  let arraySelect = this.state.selection;
                  let addSelectionArray = arraySelect.concat(valueInputArray)
                  this.refs.selection.appendChild(this.refs.input);
                  let deleteQuotes = addSelectionArray.map((item) => {
                      let a = item.replace(/['"«»]/g, '')
                      return  a.replace(',', ' ')
                  })
                                   console.log(deleteQuotes)
                  for(let i = 0; i < deleteQuotes.length; i++) {
                    this.props.data.items.map((item,index) => {
                        if(deleteQuotes[i] === item) {
                            this.props.data.items.splice(index, 1)
                        }
                    })
                  }
                 
                  this.setState({
                    selection: deleteQuotes,
                    widthInput: 20,
                    items: this.props.data.items
                },function() {
                    //фильтруем дулбикаты элементов в selection
                    let arr = [...this.state.selection, ...deleteQuotes];
                    let filterStateSelection = [...new Set(arr)];
                    
                    // обновляем состояние
                    this.setState({
                         selection:filterStateSelection
                     })
                })
                  this.refs.input.focus();
                  this.refs.input.value = '';
                }
                let hideList = this.state.show;
                hideList = 'none';
    
                this.setState({
                    show: hideList
                })
            }         
        }
              //удаляем пункт при нажатии на backspace
              if (this.refs.input.value.length < 1 && e.keyCode === 8 && this.state.selection.length !== 0) {
                  let deleteItemSelection = this.state.selection;
                  let lastItemSelection = this.state.selection[this.state.selection.length - 1];
                  let arrayDelete = this.props.data.items;
                  arrayDelete.push(lastItemSelection)
                  deleteItemSelection.pop();
                  let hideList = this.state.show;
                  hideList = 'none';

                  this.setState({
                      selection: deleteItemSelection,
                      items: arrayDelete,
                      show: hideList
                  })
                  this.refs.input.value = ' ';
                }              
            }
        
          deleteItem(e) {
              let arrayIndexDelete = this.state.selection.map((item, index) => {
                  if (e.target.value === item) {
                      return index;
                  };
              })
              let deleteItem = this.state.selection.map((item, index) => {
                  if (e.target.value === item) {
                      return item;
                  };
              });
              let panelArray = this.props.data.items;
              let itemDelete = deleteItem.join('').trim();             
              panelArray.push(itemDelete);
              let indexDelete = parseInt(arrayIndexDelete.join(''));
              let arrayDelete = this.state.selection;
              arrayDelete.splice(indexDelete, 1);

              let hideList = this.state.show;
                hideList = 'none';
    
              this.setState({
                  items: panelArray,
                  selection: arrayDelete,
                  show: hideList
              });
          }
         

  render() {
      return(
          <div className='select'>         
              <h2>{this.props.data.title}</h2>
              <div onClick={this.focusInput} className="input__wrapper">
              <div className="input__selection" ref='selection'>
                  {
                      this.state.selection.map((item, index) => {
                        return <div className="item__selection"  key={index}><button onClick={this.deleteItem} value={item}>X</button>{item}</div>
                    }) 
                  }
              <input  placeholder="Select your favourites" onKeyDown={this.addItem} style={{width:this.state.widthInput + 'px'}} onKeyUp={this.retinaInput} ref='input' onChange={this.filterList} />
              </div>
              </div>
              <ul ref='list' style={{display:this.state.show}}>
                  {
                      this.state.items.map((item) => {
                          return <li onClick={this.addItemList} key={item}>{item}</li>
                      })
                  }
              </ul>
          </div>);
  }
}

export default Input;
