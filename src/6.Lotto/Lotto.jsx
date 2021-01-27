const React = require('react');
const { Component } = React;
const { useState } = React;
const { useRef } = React;
const { useEffect } = React;
const { useMemo } = React;
const { useCallback } = React;
const Ball = require('./Ball');



function getWinNumbers() {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while(candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}

const Lotto = () => {
    // Hooks의 순서 중요 (최상위)
    // 조건문안에 절대 넣으면 안되고 함수나 반복문 안에도 웬만하면 넣으면 안됨 
    const lottoNumbers = useMemo(() => getWinNumbers(), []); // 함수결과값들을 기억해둔다. => 중복 실행 방지
    const [winNumbers, SetWinNumbers] = useState(lottoNumbers); // 당첨숫자들
    const [winBalls, setWinBalls] = useState([]); // 당첨공들
    const [bonus, setBonus] = useState(null); // 보너스공
    const [redo, setRedo] = useState(false); // 재시작여부

    const timeouts = useRef([]); 

    const runTimesouts = () => {
        for (let i = 0; i < winNumbers.length - 1; i++) {
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prevWinBalls) => [...prevWinBalls, winNumbers[i]]);
            }, (i + 1) * 1000);
        }

        timeouts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000);
    }

    // useCallback => 함수 자체를 기억. 새로 생성 안 함.
    const onClickRedo = useCallback(() => {
        console.log(winNumbers);    
        SetWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    },[winNumbers]);


    useEffect(() => {
        runTimesouts();

        return () => { 
            timeouts.current.forEach(v => {
                clearTimeout(v);
            });
        }
    },[winNumbers]);


    // ComponentDidUpdate만 실행, ComponentDidMount에서는 아무것도 안함.
    // const mounted = useRef(false);
    // useEffect(() => {
    //     if(!mounted.current) {
    //         mounted.current = true;
    //     } else {
    //         // To Do
    //     }
    // });

    return (
        <>
            <div>당첨 숫자</div>
            <div id='결과창'>
                {winBalls.map((v) => <Ball key={v} number={v} />)}    
            </div>
            <div>보너스!</div>
            {bonus &&  <Ball number={bonus} />}
            {redo && <button onClick={redo ? onClickRedo: () => {}}>한 번 더!</button>}
        </>
    );
};

// class Lotto extends Component {
//     state = {
//         winNumbers: getWinNumbers(), //당첨숫자들
//         winBalls: [], // 당첨공들
//         bonus: null, // 보너스공
//         redo: false,
//     };

//     timeouts = [];

//     runTimesouts = () => {
//         const { winNumbers } = this.state;
//         for (let i = 0; i < winNumbers.length - 1; i++) {
//             this.timeouts = setTimeout(() => {
//                 this.setState((prevState) => {
//                     return {
//                         winBalls: [...prevState.winBalls, winNumbers[i]]
//                     }
//                 })
//             }, (i + 1) * 1000);
//         }

//         this.timeouts = setTimeout(() => {
//            this.setState({
//                bonus: winNumbers[6],
//                redo: true
//            });
//         }, 7000);
//     };

//     componentDidMount() {
//         this.runTimesouts();
//     };

//     componentDidUpdate(prevProps, prevState) {
//         const { winBalls } = this.state;
//         if(winBalls.length === 0) {
//             this.runTimesouts();
//         }
//     };

//     componentWillUnmount() {
//         this.timeouts.forEach((v) => {
//             clearTimeout(v);
//         });
//     };

//     onClickRedo = () => {
//         this.setState({
//             winNumbers: getWinNumbers(), //당첨숫자들
//             winBalls: [], // 당첨공들
//             bonus: null, // 보너스공
//             redo: false,
//         });
//         this.timeouts = [];
//     };

//     render() {
//         const { winBalls, bonus, redo } = this.state;
//         return (
//             <>
//                 <div>당첨 숫자</div>
//                 <div id='결과창'>
//                     {winBalls.map((v) => <Ball key={v} number={v} />)}    
//                 </div>
//                 <div>보너스!</div>
//                 {bonus &&  <Ball number={bonus} />}
//                 {redo && <button onClick={redo ? this.onClickRedo: () => {}}>한 번 더!</button>}
//             </>
//         );
//     }
// };

module.exports = Lotto;