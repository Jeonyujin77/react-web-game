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

    // 입력버튼 클릭 시
    onSubmit = (e) => {
        e.preventDefault();

        if(parseInt(this.state.value) === parseInt(this.state.first) * parseInt(this.state.second)) {
            this.setState({
                result: `${this.state.first} X ${this.state.second} = ${this.state.value} ✔정답!`,
                first: Math.ceil(Math.random() * 9),
                second: Math.ceil(Math.random() * 9),
                value: ''
            });
        } else {
            this.setState({
                result: '땡',
                value: ''
            })
        }
    }
    
    // 사용자가 값 입력 시
    onChange = (e) => this.setState({value: e.target.value})

    render() {
        return (
            //<div></div> 생략 =><></> or <React.Fragment></React.Fragment>
            <> 
                <div>{this.state.first} 곱하기 {this.state.second}는?</div>
                <form onSubmit={this.onSubmit}>
                    <input type="number" value={this.state.value} onChange={this.onChange}/>
                    <button>입력!</button>    
                </form>
                <div>{this.state.result}</div>
            </>
        );
    }
}

export default GuGudan;