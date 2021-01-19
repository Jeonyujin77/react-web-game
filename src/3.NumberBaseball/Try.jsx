// const { PureComponent } = require('react');
const { memo } = require('react');
const React = require('react');

// Class Type
// class Try extends PureComponent {

//     /*shouldComponentUpdate: state, props 값 변경 시에만 새로 렌더링함 -> 성능 향상
//         shouldComponentUpdate(nextProps, nextState, nextContext) { 
//     }

//     PureComponent: state, props 값 변경 시에만 새로 렌더링함 -> 성능 향상*/
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