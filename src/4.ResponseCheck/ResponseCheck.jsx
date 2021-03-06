const React = require('react');
const { Component } = React;
const { useState } = React;
const { useRef } = React;

// Function Type
const ResponseCheck = () => {
    
    // state
    const [state, setState] = useState('waiting'); // 배경색
    const [message, setMessage] = useState('클릭해서 시작하세요.') // 메시지
    const [result, setResult] = useState([]); // 평균시간
    const timeout = useRef(null); // useRef() -> 렌더링에서 제외됨
    const startTime = useRef();
    const endTime = useRef();

    // 화면 클릭
    const onClickScreen = () => {
        if(state === 'waiting') {
            setState('ready');
            setMessage('초록색이 되면 클릭하세요.');
            timeout.current = setTimeout(() => {
                setState('now');
                setMessage('지금 클릭!');
            }, Math.floor(Math.random() * 1000) + 2000); //2-3초 랜덤
            startTime.current = new Date();
        } else if(state === 'ready') { // 성급하게 클릭
            clearTimeout(timeout.current); // setTimeOut 초기화
            setState('waiting');
            setMessage('이런, 성급하시군요! 초록색이 된 후에 클릭하세요.');
        } else if(state === 'now') { // 반응속도 체크
            endTime.current = new Date();
            setState('waiting');
            setMessage('클릭해서 시작하세요.');
            setResult((prevResult) => {
                return [...prevResult, endTime.current - startTime.current];
            });
        }
    };


    // 평균시간 계산
    const renderAverage = () => {
        return result.length === 0 
        ? null 
        : <> 
            <div>평균 시간: { result.reduce((a, c) => a + c) / result.length }ms</div>
            <button onClick={ onReset }>초기화</button>
        </>
    };


    // 결과 초기화
    const onReset = () => {
        setResult([]);
    };


    return (
        <>
            <div id='screen' className={state} onClick={onClickScreen}>
                {message}
            </div>
            { renderAverage() } 
        </>
    )
};


// Class Type
// class ResponseCheck extends Component {
//     state = {
//         state: 'waiting', // 배경색
//         message: '클릭해서 시작하세요.', // 메시지
//         result: [] // 평균시간
//     };

//     timeout; // setTimeOut
//     startTime; // 반응속도-시작
//     endTime; // 반응속도-끝

//     // 화면 클릭 시 
//     onClickScreen = () => {
//         const { state, message, result } = this.state;
//         if(state === 'waiting') {
//             this.setState({
//                 state: 'ready',
//                 message: '초록색이 되면 클릭하세요.'
//             });
//             this.timeout = setTimeout(() => {
//                 this.setState({
//                     state: 'now',
//                     message: '지금 클릭!'
//                 })
//             }, Math.floor(Math.random() * 1000) + 2000); //2-3초 랜덤
//             this.startTime = new Date();
//         } else if(state === 'ready') { // 성급하게 클릭
//             clearTimeout(this.timeout); // setTimeOut 초기화
//             this.setState({
//                 state: 'waiting',
//                 message: '이런, 성급하시군요! 초록색이 된 후에 클릭하세요.'
//             });
//         } else if(state === 'now') { // 반응속도 체크
//             this.endTime = new Date();
//             this.setState((prevState) => {
//                 return {
//                     state: 'waiting',
//                     message: '클릭해서 시작하세요.',
//                     result: [...prevState.result, this.endTime - this.startTime]
//                 }
//             })
//         }
//     };

//     // 초기화버튼 클릭
//     onReset = () => {
//         this.setState({
//             result: []
//         })
//     };

//     // 새로운 컴포넌트로 만드는 방법이 더 좋음 => 불필요한 렌더링 해결
//     renderAverage = () => {
//         /* 조건문 -> 삼항연산자 */
//         const { result } = this.state; // 구조분해
//         return result.length === 0 
//         ? null 
//         : <> 
//             <div>평균 시간: { result.reduce((a, c) => a + c) / result.length }ms</div>
//             <button onClick={this.onReset}>초기화</button>
//         </>
//     }

//     render() {
//         const {state, message} = this.state;
//         return (
//             // JSX 내에서 for, if 사용 불가
//             <>
//                 <div id='screen' className={state} onClick={this.onClickScreen}>
//                     {message}
//                 </div>
//                 { this.renderAverage() }    
//             </>
//         )
//     }
// }

module.exports =  ResponseCheck;
