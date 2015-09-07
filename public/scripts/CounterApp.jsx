
/** @jsx React.DOM */

'use strict';

var CounterApp = React.createClass({
    statics : {
    customMethod :function(foo){
        return foo == 'bar';
    }
    },
    componentDidMount : function(){
    this.timer = setInterval(this.tick, 600);
    },

    tick: function (){
    this.setState({initialValue: this.state.initialValue + 1});
    },

    getInitialState : function(){
         return {elapsed : 100, initialValue: this.props.initialValue};
    },
    getDefaultProps: function(){
        return {
             currentValue : 200,
             newValue:300
            }
    },
    render: function() {
         var initialValue = this.state.initialValue
    return (
         <p>This is an example for Timer. <br/>
         From the getDefaultProps method currentValue :{this.props.currentValue} , new Value : {this.props.newValue}<br/>
         Counter : {this.state.initialValue}
        </p>
        );
    }
});

module.exports = CounterApp;
