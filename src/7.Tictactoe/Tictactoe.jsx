const React = require('react');
const { Component } = React;
const { useState } = React;
const { useReducer } = React;
const Table = require('./Table');

const initialState = {
    winner: '',
    turn: 'O',
    tableData: [['','',''], ['','',''], ['','','']],
};

const reducer = (state, action) => {
    
};

const Tictactoe = () => {
    const [state, dispatch] = useReducer(reducer,initialState);

    // const [winner, setWinner] = useState(''); // 승자
    // const [turn, setTurn] = useState('O'); // 차례
    // const [tableData, setTableData] = useState([['','',''], ['','',''], ['','','']]);

    return (
        <>
            <Table/>
            {winner && <div>{winner}님의 승리</div>}
        </>
    );

}

module.exports = Tictactoe;