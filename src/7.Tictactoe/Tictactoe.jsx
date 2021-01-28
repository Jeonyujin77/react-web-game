const React = require('react');
const { useState } = React;
const { useReducer } = React;
const { useCallback } = React;
const Table = require('./Table');

const initialState = {
    winner: '',
    turn: 'O',
    tableData: [['','',''], ['','',''], ['','','']],
};

/**Action 정의 */
const SET_WINNER = 'SET_WINNER';
// action을 dispatch해서 state 변경(어떻게 변경하지 정의)
const reducer = (state, action) => {
    switch (action.type) {
        case SET_WINNER:
            // state.winner = action.winner; 이렇게 하면 안 됨
            return {
                ...state,
                winner: action.winner,
            }
    }
};

const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer,initialState);

    // const [winner, setWinner] = useState(''); // 승자
    // const [turn, setTurn] = useState('O'); // 차례
    // const [tableData, setTableData] = useState([['','',''], ['','',''], ['','','']]);

    const onClickTable = useCallback(() => {
        dispatch({ type: SET_WINNER, winner: 'O'}); // action 실행
    },[]);

    return (
        <>
            <Table onClick={onClickTable} tableData={state.tableData} />
            {state.winner && <div>{state.winner}님의 승리</div>}
        </>
    );

}

module.exports = TicTacToe;