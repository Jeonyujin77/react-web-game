import React, { useContext, useCallback } from 'react';
import { TableContext, CODE, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL } from './MineSearch';

const getTdStyle = (code) => {
    switch (code) {
        case CODE.NORMAL:
        case CODE.MINE:
            return {
                background: '#444'
            };
        case CODE.CLICKED_MINE:
        case CODE.OPENED:
            return {
                background: '#fff'
            };
        case CODE.QUESTION.MINE:
        case CODE.QUESTION:
            return {
                background: 'yellow'
            };
        case CODE.FLAG_MINE:
        case CODE.FLAG: 
            return {
                background: 'red'
            };
        default:
            return {
                background: '#fff'
            }
    }
};

const getTdText = (code) => {
    switch (code) {
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return '💣';
        case CODE.CLICKED_MINE:
            return '💥';
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return '🎏';
        case CODE.QUESTION.MINE:
        case CODE.QUESTION:
            return '🤔';
        default:
            return '';
    }
};

const Td = ({ rowIndex, cellIndex }) => {
    const { tableData, dispatch, halted } = useContext(TableContext);

    const onClickTd = useCallback(() => {
        if(halted) {
            return;
        }
        switch (tableData[rowIndex][cellIndex]) {
            case CODE.OPENED:
            case CODE.FLAG_MINE:
            case CODE.FLAG:
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                return;
            case CODE.NORMAL:
                dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex })
                return;
            case CODE.MINE:
                dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex })
                return;
            default:
                return;
        }
    },[tableData[rowIndex][cellIndex], halted]);

    // 오른쪽 마우스 클릭
    const onRightClickTd = useCallback((e) => {
        e.preventDefault(); // 기본기능 막기

        if(halted) {
            return;
        }
        switch (tableData[rowIndex][cellIndex]) {
            case CODE.NORMAL:
            case CODE.MINE:
                dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex });
                return;
            case CODE.FLAG_MINE:
            case CODE.FLAG:
                dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex });
                return;
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex });
                return;
            default:
                return;
        }
    },[tableData[rowIndex][cellIndex], halted]);

    return (
        <td style={getTdStyle(tableData[rowIndex][cellIndex])} 
            onClick={onClickTd}
            onContextMenu={onRightClickTd}
        >
            {getTdText(tableData[rowIndex][cellIndex])}
        </td>
    );
};

export default Td;