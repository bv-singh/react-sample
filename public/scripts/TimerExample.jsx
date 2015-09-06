
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
    this.setState({elapsed: new Date() - this.props.start});
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

         var elapsed = Math.round(this.state.elapsed / 100);
         var tempCount = this.state.tempCount
         // This will give a number with one digit after the decimal dot (xx.x):
         var seconds = (elapsed / 10).toFixed(1);
    return (
         <p>This is an example for Timer. Initial Value is {seconds} <br/>
         After calculations value is {this.state.elapsed} <br/>
         From the getDefaultProps method currentValue :{this.props.currentValue} , new Value : {this.props.newValue}<br/>
         Counter : {this.state.tempCount}
        </p>
        );
    }
});

module.exports = TimerExample;
