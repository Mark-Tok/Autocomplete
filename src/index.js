import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Input from './components/InputComponent';
import * as serviceWorker from './serviceWorker';

let propsValues = {
    title: "Multiselect",
    items: [
        'node.js',
        'javascript',
        'json',
        'react.js',
        'REST API',
        'electron.js',
        'jsx',
        'ajax',
        'html',
        'mongodb',
        'NOSQL',
        'sass',
        'less',
        'gulp',
        'webpack'
    ]
  };

ReactDOM.render(<Input data={propsValues} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
