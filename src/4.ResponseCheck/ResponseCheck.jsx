const React = require('react');
const { Component } = React;

class ResponseCheck extends Component {
    state = {
        state: 'waiting', // 배경색
        message: '클릭해서 시작하세요.', // 메시지
        result: [] // 평균시간
    };

    // 화면 클릭 시 
    onClickScreen = () => {

    }

    renderAverage = () => {
        /* 조건문 -> 삼항연산자 */
        const { result } = this.state; // 구조분해
        return result.length === 0 
        ? null 
        : <div>평균 시간: { result.reduce((a, c) => a + c) / result.length }ms</div>
    }

    render() {
        const {state, message} = this.state;
        return (
            // JSX 내에서 for, if 사용 불가
            <>
                <div id='screen' className={state} onClick={this.onClickScreen}>
                    {message}
                </div>
                { this.renderAverage() }    
            </>
        )
    }
}

module.exports =  ResponseCheck;
