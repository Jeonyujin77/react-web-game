const React = require('react');
const ReactDom = require('react-dom');

const Tictactoe = require('./Tictactoe');

ReactDom.render(<Tictactoe />, document.querySelector('#root'));