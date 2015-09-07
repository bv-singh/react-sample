'use strict';


var RadioGroup = require('../../node_modules/react-radio-group/index');

var RadioGroupApp = React.createClass({
getInitialState : function (){
    return {
    selectedValue: 'orange'}
    },
     handleChange(value) {
        this.setState({selectedValue: value});
      },
    render : function(){
    return (
    <div >
    <RadioGroup name="fruit" selectedValue={this.state.selectedValue} onChange={this.handleChange}>
             {Radio => (
               <div> <label for="gender"> Gender :</label>
                 <Radio value="male" />Male
                 <Radio value="female" />Female
               </div>
             )}
           </RadioGroup>
           </div>
    )
    }
});

module.exports = RadioGroupApp;