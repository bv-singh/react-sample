
'use strict';

var SelectPopover   = require('../../node_modules/react-select-popover')

// These are the props that you can pass to the component
// options is a required prop, rest of them are optional
var options = [
    { label: "CSS", value: "css" },
    { label: "HTML", value: "html" },
    { label: "JavaScript", value: "js" },
    { label: "Ruby on Rails", value: "ror" },
];
    var selectFieldName = "my-select";
var selectPlaceholder = "Choose some options...";
var onChange = function(obj) {
    console.log("EVENT", obj.event); // "added" or "removed"
    console.log("ITEM", obj.item);   // item that has been added/removed { label: '...', value: '...' }
    console.log("VALUE", obj.value); // [{label: '...', value: '...'}, {label: '...', value: '...'}]
}

var SelectPopoverApp = React.createClass({
    render : function(){
        return (
            <SelectPopover
                    options={options}
                    name={selectFieldName}
                    selectPlaceholder={selectPlaceholder}
                    onChange={ onChange }
                />
        );
    }
});


module.exports  = SelectPopoverApp;