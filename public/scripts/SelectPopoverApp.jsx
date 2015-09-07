
'use strict';

var SelectPopover   = require('../../node_modules/react-select-popover')

// These are the props that you can pass to the component
// options is a required prop, rest of them are optional
//TODO - Passing static data to options would be removed and the data needs to retrieve from the json - This needs to work on.
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
//TODO - Below loadSelectPopupsFromServer method needs to check - WIP.
var SelectPopoverApp = React.createClass({
    loadSelectPopupsFromServer: function() {
    $.ajax({
        url : this.props.url,
        dataType :'json',
        cache : false,
        success: function(options){
        this.setState({
        options:options});
        }.bind(this),
        error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
         }.bind(this)
    });
    },
    getInitialState :function(){
        return {
        options : []
        };
    },
    componentDidMount : function(){
        this.loadSelectPopupsFromServer();
        setInterval(this.loadSelectPopupsFromServer, this.props.pollInterval);
    },
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