import React, { useState, useRef, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import isNaN from "lodash/isNaN";
import PropTypes from "prop-types";
import "../select.scss";

function Autocomplete({ data, onChange }) {
  const [items, setItems] = useState(null);
  const [widthInput, setWidthInput] = useState(120);
  const [selection, setSelection] = useState([]);
  const [show, setShow] = useState(false);
  const input = useRef(null);
  const selectionWrapper = useRef(null);

  const filterList = (e) => {
    const filterList = data.filter(function (item) {
      return (
        item.toLowerCase().search(
          e.target.value
            .replace(/[/\\/^'[']/g, "")
            .trim()
            .toLowerCase()
        ) !== -1
      );
    });
    // cкрываем панель автодополнения если совпадений не найдено
    if (isEmpty(filterList)) {
      setShow(false);
    } else {
      //обновляем сосотояние массива
      setItems(filterList);
      setShow(true);
    }
    if (e.target.value === "") {
      setShow(false);
    }
  };

  const addItemList = (itemSelected) => {
    //добавляем элемент по клику с панели автодополнения
    const arrayIndexDelete = data.map((item, index) => {
      if (itemSelected === item) {
        return index;
      }
    });
    const deleteItem = data.map((item, index) => {
      if (itemSelected === item) {
        return item;
      }
    });
    const arrayDelete = selection;
    const itemDelete = deleteItem.join("").trim();
    const indexDelete = parseInt(arrayIndexDelete.join(""));
    const deleteItemSelection = data;

    arrayDelete.push(itemDelete);
    deleteItemSelection.splice(indexDelete, 1);

    setItems([...deleteItemSelection]);
    setSelection([...arrayDelete]);
    setShow(false);

    input.current.value = "";
    input.current.focus();
    if (!isEmpty(selection)) {
      input.current.placeholder = "";
    }
  };

  const adaptiveInput = (e) => {
    if (e.target.value !== "") {
      const changeWidthInput = +e.target.value.length * 10;
      setWidthInput(changeWidthInput);
      if (changeWidthInput >= 500) {
        setWidthInput(500);
      }
      if (isEmpty(selection)) {
        e.target.placeholder = "Select items";
      }
    }
  };

  const focusInput = () => {
    //устанавливаем фокус на input при клике на обертку
    input.current.focus();
  };

  const addItem = (e) => {
    //добавляем введенные пункты из строки
    if (e.keyCode !== 8) {
      setShow(true);
    }
    if (e.keyCode === 13) {
      if (input.current.value.trim() === "") {
        alert("Введите значение");
        setShow(false);
      } else {
        const valueInput = input.current.value.trim();
        const valueInputArray = valueInput.match(/"[^"]*"|'[^']*'|[^,]+/g);

        // обработка одного значения
        if (valueInputArray.length === 1) {
          //проверка введеного значения в исходном массиве
          const indexArray = data.map((item, index) => {
            if (valueInputArray.join("") === item) {
              return index;
            }
          });

          const indexDelete = parseInt(indexArray.join(""));

          if (!isNaN(indexDelete)) {
            data.splice(indexDelete, 1);
            //обновляем состояние, если в массиве значение имеется
            setItems([...data]);
          }

          //добавляем введённое значение в массив selection
          if (selection.includes(valueInputArray.join(""))) {
            alert("Данное значение уже есть");
          } else {
            const deleteQuotes = valueInputArray.map((item) => {
              return item.replace(/['"«»]/g, "");
            });
            selection.push(deleteQuotes.join(""));
            setSelection([...selection]);
          }

          selectionWrapper.current.appendChild(input.current);
          input.current.focus();
          input.current.value = "";
          if (!isEmpty(selection)) {
            input.current.placeholder = "";
          }
        } else if (valueInputArray.length > 0) {
          //обрабатывание для двух и более значений
          const addSelectionArray = selection.concat(valueInputArray);
          selectionWrapper.current.appendChild(input.current);
          const deleteQuotes = addSelectionArray.map((item) => {
            let a = item.replace(/['"«»]/g, "");
            return a.replace(",", " ");
          });

          for (let i = 0; i < deleteQuotes.length; i++) {
            data.map((item, index) => {
              if (deleteQuotes[i] === item) {
                data.splice(index, 1);
              }
            });
          }

          setSelection([...deleteQuotes]);
          setItems([...data]);
          input.current.focus();
          input.current.value = "";
          if (!isEmpty(selection)) {
            input.current.placeholder = "";
          }
        }
        //скрываем панель автодополения
        setShow(false);
      }
    }
    //удаляем пункт при нажатии на backspace
    if (
      input.current.value.length < 1 &&
      e.keyCode === 8 &&
      !isEmpty(selection)
    ) {
      data.push(selection[selection.length - 1]);
      selection.pop();
      setSelection([...selection]);
      setItems([...data]);
      setShow(false);

      input.current.value = " ";
      if (isEmpty(selection)) {
        e.target.placeholder = "Select items";
      }
    }
    if (!isEmpty(selection)) {
      e.target.placeholder = "";
    }
  };

  const deleteItem = (e) => {
    //удаляем пункт при клике
    const arrayIndexDelete = selection.map((item, index) => {
      if (e.target.value === item) {
        return index;
      }
    });
    const deleteItem = selection.map((item, index) => {
      if (e.target.value === item) {
        return item;
      }
    });
    const itemDelete = deleteItem.join("").trim();
    //добавляем удалённое значение в панель автодополнения
    data.push(itemDelete);
    const indexDelete = parseInt(arrayIndexDelete.join(""));
    const arrayDelete = selection;
    arrayDelete.splice(indexDelete, 1);
    setItems([...data]);
    setSelection([...arrayDelete]);
    setShow(false);
    if (isEmpty(arrayDelete)) {
      input.current.placeholder = "Select items";
    }
  };

  useEffect(() => {
    if (!items && !isEmpty(data)) {
      setItems(data);
    }
  }, []);

  useEffect(() => {
    onChange(selection)
  }, [selection])

  return (
    <div className="select">
      <h2>Autocomplete Select</h2>
      <div onClick={focusInput} className="select__wrapper">
        <div className="select__selection" ref={selectionWrapper}>
          {selection.length !== 0 &&
            selection.map((item) => {
              return (
                <div className="selection_item" key={item}>
                  <button onClick={deleteItem} value={item}></button>
                  {item}
                </div>
              );
            })}
          <input
            placeholder="Select items"
            onKeyDown={addItem}
            style={{ width: widthInput + "px" }}
            onKeyUp={adaptiveInput}
            ref={input}
            onChange={filterList}
          />
        </div>
      </div>
      {show && (
        <ul className="select_popup">
          {items.map((item) => {
            return (
              <li
                className="select_popup-item"
                onClick={() => {
                  addItemList(item);
                }}
                key={item}
              >
                {item}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

Autocomplete.propTypes = {
  /**
   * Массив данных
   */
  data: PropTypes.array,
};

Autocomplete.defaultProps = {
  onChange: () => {}
}

export default Autocomplete;
