import React from 'react';

class GuGudan extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            first: Math.ceil(Math.random() * 9), // 첫번째 숫자
            second: Math.ceil(Math.random() * 9), // 두번째 숫자
            value: '', // 사용자 입력 
            result: '' // 결과
        }
    }

    /** 함수를 외부로 빼는 이유: 렌더링 시 매번 실행되어 성능이 저하되는 것을 방지하기 위함 */
    // 입력버튼 클릭 시
    onSubmit = (e) => {
        e.preventDefault();

        if(parseInt(this.state.value) === parseInt(this.state.first) * parseInt(this.state.second)) {
            this.setState((prevState) => { // 이전 값을 인자로 받아서 사용 가능하다.
               return {
                result: `${prevState.first} X ${prevState.second} = ${prevState.value} ✔정답!`,
                first: Math.ceil(Math.random() * 9),
                second: Math.ceil(Math.random() * 9),
                value: ''
               };
            });

            this.input.focus();
        } else {
            this.setState({
                result: '땡',
                value: ''
            })
        }
    }
    
    // 사용자가 값 입력 시
    onChange = (e) => this.setState({value: e.target.value})

    // input focus event: DOM에 직접 접근
    input; 
    onRefInput = (c) => { this.input = c; }

    
    render() {
        return (
            //<div></div> 생략 =><></> or <React.Fragment></React.Fragment>
            <> 
                <div>{this.state.first} 곱하기 {this.state.second}는?</div>
                <form onSubmit={this.onSubmit}>
                    <input ref={this.onRefInput} type="number" value={this.state.value} onChange={this.onChange}/>
                    <button>입력!</button>    
                </form>
                <div>{this.state.result}</div>
            </>
        );
    }
}

export default GuGudan;