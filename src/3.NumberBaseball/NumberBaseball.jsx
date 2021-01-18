import React, {Component} from 'react';
const { Component } = React;

function getNumbers() {

}
class NumberBaseball extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(),
        tries: []
    };

    onSubmitForm = () => {

    };

    onChangeInput = () => {

    };

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
                    {[].map((v) => {
                        return (
                            <li>{v}</li>
                        );
                    })}
                </ul>
            </>
        );
    }
}

module.exports = NumberBaseball;