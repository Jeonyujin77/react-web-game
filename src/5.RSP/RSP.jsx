const React = require('react');
const { Component } = React;
const { useState } = React;
const { useRef } = React;
const { useEffect } = React;
/*
* [Life Cycle]
* - 클래스
*   constructor -> render -> ref -> componentDidMount
*   (setState/props 바뀔 때) -> shouldComponentUpdate(true) -> render -> componentDidUpdate
*   부모가 나를 없앴을 때 -> componentWillUnmount -> Destroy
*/
// 이미지 좌표값
const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px'
};

// 점수
const scores = {
    가위: 1,
    바위: 0,
    보: -1
};

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v) {
        return v[1] === imgCoord;
    })[0];
};


const RSP = () => {
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(rspCoords.바위);
    const [score, setScore] = useState(0);
    const interval = useRef();

    useEffect(() => { // componentDidMount, componentDidUpdate 역할 / 1:1은 아님
        interval.current = setInterval(changeHand, 100);
        return () => { // componentWillUnmount
            clearInterval(interval.current)
        }
    }, [imgCoord]); // imgCoord가 변경될때마다 실행, 빈 값일 경우 한번만 실행됨

    const changeHand = () => {
        if(imgCoord === rspCoords.바위) {
            setImgCoord(rspCoords.가위);
        } else if(imgCoord === rspCoords.가위) {
            setImgCoord(rspCoords.보);
        } else if(imgCoord === rspCoords.보) {
            setImgCoord(rspCoords.바위);
        }
    };

    const onClickBtn = (choice) => () => {
        // 가위바위보 실행 중단
        clearInterval(interval.current);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        // 점수 계산
        const diff = myScore - cpuScore;
        if(diff === 0) {
            setResult('비겼습니다!');
        } else if([-1, 2].includes(diff)) {
            setResult('이겼습니다!');
            setScore((prevScore) => prevScore + 1);
        } else {
            setResult('졌습니다!');
            setScore((prevScore) => prevScore - 1);
        }

        // 가위바위보 재실행
        setTimeout(() => {
            interval.current = setInterval(changeHand, 100);
        }, 2000);
    };

    return (
        <>
            <div id='computer' style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}/>
            <div>
                <button id='rock' className='btn' onClick={ onClickBtn('바위') }>바위</button>
                <button id='scissor' className='btn' onClick={ onClickBtn('가위') }>가위</button>
                <button id='paper' className='btn' onClick={ onClickBtn('보') }>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
        </>
    );
};

// class RSP extends Component {
//     state = {
//         result: '',
//         imgCoord: '0',
//         score: 0
//     };

//     interval; 

//     // 컴포넌트가 처음 렌더링 된 후 ex) 비동기 요청(setInterval)
//     componentDidMount() {
//         this.interval = setInterval(this.changeHand, 100);
//     };

//     // 리렌더링 후
//     // componentDidUpdate() {};

//     // 컴포넌트가 제거되기 전 ex) 비동기 요청 정리(clearInterval)
//     componentWillUnmount() {
//         clearInterval(this.interval);
//     };

//     // 가위바위보 1초마다 실행
//     changeHand = () => {
//         const {imgCoord} = this.state;
//         if(imgCoord === rspCoords.바위) {
//             this.setState({
//                 imgCoord: rspCoords.가위
//             });
//         } else if(imgCoord === rspCoords.가위) {
//             this.setState({
//                 imgCoord: rspCoords.보
//             });
//         } else if(imgCoord === rspCoords.보) {
//             this.setState({
//                 imgCoord: rspCoords.바위
//             });
//         }
//     };

//     // 버튼 클릭
//     onClickBtn = (choice) => () => {
//         const {imgCoord} = this.state;
//         // 가위바위보 실행 중단
//         clearInterval(this.interval);
//         const myScore = scores[choice];
//         const cpuScore = scores[computerChoice(imgCoord)];
//         // 점수 계산
//         const diff = myScore - cpuScore;
//         if(diff === 0) {
//             this.setState({
//                 result: '비겼습니다!'
//             });
//         } else if([-1, 2].includes(diff)) {
//             this.setState((prevState) => {
//                 return {
//                     result: '이겼습니다!',
//                     score: prevState.score+1
//                 };
//             });
//         } else {
//             this.setState((prevState) => {
//                 return {
//                     result: '졌습니다!',
//                     score: prevState.score-1
//                 };
//             });
//         }

//         // 가위바위보 재실행
//         setTimeout(() => {
//             this.interval = setInterval(this.changeHand, 100);
//         }, 2000);
//     };

//     render() {
//         const { result, score, imgCoord } = this.state;
//         return (
//             <>
//                 <div id='computer' style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}/>
//                 <div>
//                     <button id='rock' className='btn' onClick={ this.onClickBtn('바위') }>바위</button>
//                     <button id='scissor' className='btn' onClick={ this.onClickBtn('가위') }>가위</button>
//                     <button id='paper' className='btn' onClick={ this.onClickBtn('보') }>보</button>
//                 </div>
//                 <div>{result}</div>
//                 <div>현재 {score}점</div>
//             </>
//         )
//     }
// };

module.exports = RSP;