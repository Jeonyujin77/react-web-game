const { memo } = require('react');
const React = require('react');
// const { Component } = React;
const Try = require('./Try');
const { useState } = React;

// 숫자 4개를 랜덤하게 뽑는 함수
// this를 안 쓸 경우 밖으로 뺄수 있음, hooks로 변경 시 영향 없음
function getNumbers() {
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for(let i = 0; i < 4; i++) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

const NumberBaseball = memo(() => {
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers());
    const [tries, setTries] = useState([]);


    const onSubmitForm = (e) => {
        e.preventDefault();
        if(value === answer.join('')) {
            setResult('홈런!');
            setTries((prevTries)=> {
                return [...prevTries, {try: value, result: '홈런!'}] // 불변성(immutable)의 법칙 -> deep copy
            });
            alert('게임을 다시 시작합니다!');
            setValue('');
            setAnswer(getNumbers());
            setTries([]);
        } else {
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if(tries.length >= 9) {
                setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`)
                alert('게임을 다시 시작합니다!');
                setValue('');
                setAnswer(getNumbers());
                setTries([]);
            } else {
                for(let i = 0; i < 4; i++) {
                    if(answerArray[i] === answer[i]) {
                        strike++;
                    } else if(answer.includes(answerArray[i])) {
                        ball++;
                    }
                }
                setTries((prevTries) => {
                    return [...prevTries, {try: value, result: `${strike} 스트라이크 ${ball} 볼입니다.`}]
                });
            }
        }
    };

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };



    return (
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input maxLength={4} value={value} onChange={onChangeInput}/>
                <button>입력!</button>
            </form>
            <div>시도: {tries.length}</div>
            <ul>
                {tries.map((v, i) => {
                    return (
                        <Try key={`${ i + 1 }차 시도: `} tryInfo={v} index={i} />
                    );
                })}
            </ul>
        </>
    );
    
})

module.exports = NumberBaseball;