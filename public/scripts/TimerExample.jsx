
/** @jsx React.DOM */

'use strict';

var TimerExample = React.createClass({
    statics : {
    customMethod :function(foo){
        return foo == 'bar';
    }
    },
    componentDidMount : function(){
    this.timer = setInterval(this.tick, 600);
    },

    tick: function (){
    this.setState({tempCount: this.state.tempCount + 2});
    },

    getInitialState : function(){
         return {elapsed : 100, tempCount: this.props.tempCount};
    },
    getDefaultProps: function(){
        return {
             currentValue : 200,
             newValue:300
            }
    },
    render: function() {
         var tempCount = this.state.tempCount
    return (
         <p>This is an example for Timer. <br/>
         From the getDefaultProps method currentValue :{this.props.currentValue} , new Value : {this.props.newValue}<br/>
         Counter : {this.state.tempCount}
        </p>
        );
    }
});

module.exports = TimerExample;
