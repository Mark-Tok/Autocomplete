import React from 'react';
import ReactDOM from 'react-dom';
import Input from './components/index';
import * as serviceWorker from './serviceWorker';
import propsValues from './array'

ReactDOM.render(<Input data={propsValues} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
