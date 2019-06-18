import React from 'react';
import '../select.scss';

class Input extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                items: this.props.data.items,
                widthInput: 120,
                selection: [],
                show: 'none'
            };
            this.filterList = this.filterList.bind(this);
            this.adaptiveInput = this.adaptiveInput.bind(this);
            this.focusInput = this.focusInput.bind(this);
            this.addItem = this.addItem.bind(this);
            this.deleteItem = this.deleteItem.bind(this);
            this.addItemList = this.addItemList.bind(this);
        }

        filterList(e) {
            //фильтруем введённое значение  
            let filterList = this.props.data.items.filter(function (item) {
                return item.toLowerCase().search(e.target.value.replace(/[/\\/]/g, '').trim().toLowerCase()) !== -1;
            });
            //обновляем сосотояние массива
            this.setState({
                items: filterList,
            });
            // cкрываем панель автодополнения если совпадений не найдено
            if (filterList.length === 0) {
                let hideList = this.state.show;
                hideList = 'none';
                this.setState({
                    show: hideList
                });
            }
        }

        addItemList(e) {
            //добавляем элемент по клику с панели автодополнения
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
            let indexDelete = parseInt(arrayIndexDelete.join(''));
            let deleteItemSelection = this.props.data.items;
            let hideList = this.state.show;
            hideList = 'none';

            arrayDelete.push(itemDelete)
            deleteItemSelection.splice(indexDelete, 1);

            this.setState({
                items: deleteItemSelection,
                selection: arrayDelete,
                show: hideList
            });

            this.refs.input.value = ' '
            this.refs.input.focus();
        }

        adaptiveInput(e) {
            if(e.target.value != '') {
            let changeWidthInput = +e.target.value.length * 10;
            this.setState({
                widthInput: changeWidthInput
            });
            if (changeWidthInput >= 500) {
                this.setState({
                    widthInput: 500
                });
            }
            if(this.state.selection.length === 0) {
                e.target.placeholder = 'Select your favourites'
            }
        }
    }

        focusInput() {
            //устанавливаем фокус на input при клике на обертку 
            this.refs.input.focus();
        }

        addItem(e) {
            //добавляем введенные пункты из строки
            if (e.keyCode !== 8) {
                let showList = this.state.show;
                showList = 'block';
                this.setState({
                    show: showList
                });
            }
            if (e.keyCode === 13) {
                if (this.refs.input.value.trim() === '') {
                    alert('Введите значение')
                    let List = this.state.show;
                    List = 'none';
                    this.setState({
                        show: List
                    });
                } else {
                    const valueInput = this.refs.input.value.trim();
                    const valueInputArray = valueInput.match(/"[^"]*"|'[^']*'|[^,]+/g);
                    if (valueInputArray.length === 1) {
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
                        if (arraySelect.includes(valueInputArray.join(''))) {
                            alert('Данное значение уже есть')
                        } else {
                            let deleteQuotes = valueInputArray.map((item) => {
                                return item.replace(/['"«»]/g, '')
                            })
                            arraySelect.push(deleteQuotes.join(''))
                            this.setState({
                                selection: arraySelect,
                                items: this.props.data.items
                            })
                        
                        }
                        this.refs.selection.appendChild(this.refs.input);
                        this.refs.input.focus();
                        this.refs.input.value = '';

                    } 
                    else if (valueInputArray.length > 0) {
                        //обрабатывание для двух и более значений
                        let arraySelect = this.state.selection;
                        let addSelectionArray = arraySelect.concat(valueInputArray)
                        this.refs.selection.appendChild(this.refs.input);
                        let deleteQuotes = addSelectionArray.map((item) => {
                            let a = item.replace(/['"«»]/g, '')
                            return a.replace(',', ' ')
                        })
                        for (let i = 0; i < deleteQuotes.length; i++) {
                            this.props.data.items.map((item, index) => {
                                if (deleteQuotes[i] === item) {
                                    this.props.data.items.splice(index, 1)
                                }
                            })
                        }

                        this.setState({
                            selection: deleteQuotes,
                            items: this.props.data.items
                        }, function () {
                            //фильтруем дулбикаты элементов в selection
                            let arr = [...this.state.selection, ...deleteQuotes];
                            let filterStateSelection = [...new Set(arr)];
                            // обновляем состояние
                            this.setState({
                                selection: filterStateSelection
                            })
                        })
                        this.refs.input.focus();
                        this.refs.input.value = '';
                    }
                    //скрываем панель автодополения
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
                if(this.state.selection.length === 0) {
                    e.target.placeholder = 'Select your favourites'
                }
            }
            if(this.state.selection.length !== 0)  {
                e.target.placeholder = ''
            }
        }

        deleteItem(e) {
            //удаляем пункт при клике 
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
            //добавляем удалённое значение в панель автодополнения
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
              <div onClick={this.focusInput} className="select__wrapper">
              <div className="select__selection" ref='selection'>
                  {
                      this.state.selection.map((item, index) => {
                        return <div className="select__selection"  key={index}><button onClick={this.deleteItem} value={item}>X</button>{item}</div>
                    }) 
                  }
              <input  placeholder="Select your favourites" onKeyDown={this.addItem} style={{width:this.state.widthInput + 'px'}} onKeyUp={this.adaptiveInput} ref='input' onChange={this.filterList} />
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
