
'use strict';

var Dropdown = require('../../node_modules/react-dropdown/dist/index');

var DropDown = React.createClass({
  _onSelect: function(option) {
    console.log('You selected ', option.label)
  },
  render: function() {
    var options = [
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' },
      {
        type: 'group', name: 'group1', items: [
          { value: 'three', label: 'Three' },
          { value: 'four', label: 'Four' }
        ]
      },
      {
        type: 'group', name: 'group2', items: [
          { value: 'five', label: 'Five' },
          { value: 'six', label: 'Six' }
        ]
      }
    ];
    var defaultOption = { value: 'two', label: 'Two' };
    return (
          <Dropdown options={options} onChange={this._onSelect} value={defaultOption} />
    );
  }
});

var DropDownApp = React.createClass({
    render: function() {
        return ( <div>
            This is the Dropdown component(API) <DropDown />
            </div>
        );
    }
});

module.exports = DropDownApp;