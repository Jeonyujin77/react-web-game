const React = require('react');
const { Component } = React;
const Try = require('./Try');

function getNumbers() {

}
class NumberBaseball extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(),
        tries: []
    };

    onSubmitForm = (e) => {
        e.preventDefault();
        console.log(this.state.value);
    };

    onChangeInput = (e) => {
        this.setState({
            value: e.target.value
        });
    };

    fruits = [
        {fruit: '포도', taste: '맛있다'},
        {fruit: '사과', taste: '맛있다'},
        {fruit: '배', taste: '맛있다'}
    ];

    render() {
        return (
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input maxLength={4} value={this.state.value} onChange={this.onChangeInput}/>
                    <button>입력!</button>
                </form>
                <div>시도: {this.state.tries.length}</div>
                <ul>
                    {this.fruits.map((v, i) => {
                        return (
                            <Try key={v.fruit + v.taste} value={v} index={i} />
                        );
                    })}
                </ul>
            </>
        );
    }
}

module.exports = NumberBaseball;