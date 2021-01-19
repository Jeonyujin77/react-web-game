// const { PureComponent } = require('react');
const { memo } = require('react');
const React = require('react');

// Class Type
// PureComponent: state, props 값 변경 시에만 새로 렌더링함 -> 성능 향상
// class Try extends PureComponent {

//     // shouldComponentUpdate: state, props 값 변경 시에만 새로 렌더링함 -> 성능 향상
//     //  shouldComponentUpdate(nextProps, nextState, nextContext) { 
//     // }

//     constructor(props) {
//         super(props);
//         // 다른 동작
//         const filtered = this.props.filter(() => {

//         });

//         this.state = {
//             result: filtered,
//             try: this.props.try
//         }
//     }

//     render() {
//         const { tryInfo } = this.props;
//         return (
//             <li>
//              <div>{tryInfo.try}</div>
//              <div>{tryInfo.result}</div>
//          </li>
//         );
//     }
// }


// Function Type
// memo: state, props 값 변경 시에만 새로 렌더링함 -> 성능 향상
const Try = memo(({ tryInfo }) => {
    return (
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    )
});

module.exports = Try;