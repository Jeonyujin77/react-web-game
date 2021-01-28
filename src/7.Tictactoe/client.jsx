const React = require('react');
const ReactDom = require('react-dom');

const TicTacToe = require('./TicTacToe');

ReactDom.render(<TicTacToe />, document.querySelector('#root'));