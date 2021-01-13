import React, { useRef, useState } from "react";

/** Function Type */
const GuGudan = () => {

    /** state 선언 */
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null); // ref

    const onChangeInput = (e) => {
        setValue(e.target.value);
    }

    const onSubmitForm = (e) => {
        e.preventDefault();

        if(parseInt(value) === parseInt(first) * parseInt(second)) {
            setResult(`${first} X ${second} = ${value} ✔정답!`);
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setValue('');
            inputRef.current.focus();
        } else {
            setResult('땡');
            setValue('');
            inputRef.current.focus();
        }
    }

    return (
        <>
            <div> {first} 곱하기 {second}는(은)?</div>
            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} type="number" onChange={onChangeInput} value={value}/>
                <button>입력!</button>    
            </form>                 
            <div>{result}</div>
        </>
    )
}


/** Class Type */
// class GuGudan extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             first: Math.ceil(Math.random() * 9), // 첫번째 숫자
//             second: Math.ceil(Math.random() * 9), // 두번째 숫자
//             value: '', // 사용자 입력 
//             result: '' // 결과
//         }
//     }

//     /** 함수를 외부로 빼는 이유: 렌더링 시 매번 실행되어 성능이 저하되는 것을 방지하기 위함 */
//     // 입력버튼 클릭 시
//     onSubmit = (e) => {
//         e.preventDefault();

//         if(parseInt(this.state.value) === parseInt(this.state.first) * parseInt(this.state.second)) {
//             this.setState((prevState) => { // 이전 값을 인자로 받아서 사용 가능하다.
//                return {
//                 result: `${prevState.first} X ${prevState.second} = ${prevState.value} ✔정답!`,
//                 first: Math.ceil(Math.random() * 9),
//                 second: Math.ceil(Math.random() * 9),
//                 value: ''
//                };
//             });

//             this.input.focus();
//         } else {
//             this.setState({
//                 result: '땡',
//                 value: ''
//             })
//         }
//     }
    
//     // 사용자가 값 입력 시
//     onChange = (e) => this.setState({value: e.target.value})

//     // input focus event: DOM에 직접 접근
//     input; 
//     onRefInput = (c) => { this.input = c; }


//     render() {
//         return (
//             //<div></div> 생략 =><></> or <React.Fragment></React.Fragment>
//             <> 
//                 <div>{this.state.first} 곱하기 {this.state.second}는?</div>
//                 <form onSubmit={this.onSubmit}>
//                     <input ref={this.onRefInput} type="number" value={this.state.value} onChange={this.onChange}/>
//                     <button>입력!</button>    
//                 </form>
//                 <div>{this.state.result}</div>
//             </>
//         );
//     }
// }

export default GuGudan;