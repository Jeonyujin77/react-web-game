import React, {useCallback} from 'react';
import { CLICK_CELL } from './TicTacToe';

// parent에서 child로 dispatch를 내려주는 과정이 번거로우므로 contextApi를 사용하여 줄일 수 있다.
const Td = ({ rowIndex, cellIndex, cellData, dispatch }) => {
    const onClickTd = useCallback(() => {
        console.log(rowIndex, cellIndex);
        if(cellData) { // 데이터 존재 시 클릭 안됨
            return;
        }
        dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
    }, [cellData]);

    return (
        <td onClick={onClickTd}>{cellData}</td>
    )
};

export default Td;