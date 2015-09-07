
'use strict';

var React = require('react');
var unique = require('uniq');
var TimerExample = require('./TimerExample.jsx');
var RoleBox = require('./RoleBox.jsx');
var DropDownApp = require('./DropDownApp.jsx');
var RadioGroupApp = require('./RadioGroupApp.jsx');

var User = React.createClass({
  render: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return (
      <div className="user">
        <h2 className="test">
          {this.props.firstName} {this.props.lastName} {this.props.userId} {this.props.password}
        </h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
});

var UserBox = React.createClass({
    loadUsersFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({
                    data: data
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleUsersSubmit: function(user) {
        var userData = this.state.data;
        var newUserData = userData.concat([user]);
        this.setState({
            data: newUserData
        });
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: user,
            success: function(data) {
                this.setState({
                    data: data
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {
            data: []
        };
    },
    componentDidMount: function() {
        this.loadUsersFromServer();
        setInterval(this.loadUsersFromServer, this.props.pollInterval);
    },
    render: function() {
        return (
        <div className = "userBox" >
            <h3> Users List </h3>
            <div className="user-list">
            <UsersList data = {this.state.data}/>

             <UserForm onUserSubmit = {this.handleUsersSubmit}/><br/>
             <DropDownApp/><br/>
             </div>
             <div className="mySelect">
                  <MySelect url="roles.json"/>
             </div><br/>
             <RoleBox url = "roles.json" pollInterval = {2000}/><br/>
             < /div>
        );
    }
});

var UsersList = React.createClass({
  render: function() {
    var userNodes = this.props.data.map(function(user, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <div className="users-list">
        <User author={user.firstName} key={index}>
          {user.firstName}
          {user.lastName}
          {user.userId}
          {user.password}
        </User>
        </div>
      );
    });
    return (
      <div className="usersList">
        {userNodes}
      </div>
    );
  }
});

var UserForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var firstName = React.findDOMNode(this.refs.firstName).value.trim();
    var lastName = React.findDOMNode(this.refs.lastName).value.trim();
    var userId = React.findDOMNode(this.refs.userId).value.trim();
    var password = React.findDOMNode(this.refs.password).value.trim();

    if (!firstName || !lastName || !userId || !password) {
        alert('Please enter all the input fields');
      return;
    }
    this.props.onUserSubmit({firstName: firstName, lastName: lastName, userId:userId, password:password });
    React.findDOMNode(this.refs.firstName).value = '';
    React.findDOMNode(this.refs.lastName).value = '';
    React.findDOMNode(this.refs.userId).value = '';
    React.findDOMNode(this.refs.password).value = '';
  },

  render: function() {
    return (
      <form ref="form" className="userForm" onSubmit={this.handleSubmit}>
      <div class="col-md-12">
        <div className="form-group" class="row">
          <label for="first_name">First Name :</label>
          <input id="first_name" className="form-control" type="text" placeholder="First name" ref="firstName" />
       </div> 
        <div className="form-group" class="row">
          <label for="last_name">Last Name :</label>
          <input id="last_name" className="form-control" type="text" placeholder="Last name" ref="lastName" /> 
         </div>

        <div className="form-group" class="row">
           <label for="user_id">User Id :</label>
          <input id="user_id" type="text" className="form-control" placeholder="User Id" ref="userId" /> 
        </div>
      
        <div className="form-group" class="row">
            <label for="password">Password : </label>
          <input id="password" type="password" className="form-control" placeholder="Password" ref="password" /> 
       </div>

       <div className="form-group" class="row">
            <RadioGroupApp/>
       </div>

       <input type="submit" value="Submit User" className="btn btn-default"/>
        </div>
      </form>
    );
  }
});


var MySelect = React.createClass({
     getInitialState: function() {
         return {
             value: 'select'
         }
     },
     change: function(event){
         this.setState({value: event.target.value});
     },
     render: function(){
        return(
           <div>
                 Static Roles : <select id="role" onChange={this.change} value={this.state.value} className="form-control">
                  <option value="select">Select</option>
                  <option value="Developer">Developer</option>
                  <option value="Manager">Manager</option>
               </select>

           </div>
        );
     }
});

var MainBox = React.createClass({
    render: function() {
        return ( <div className = "mainBox" >
                    <div className = "timerExample" >
                        <TimerExample start = {Date.now()} tempCount = {20}/>
                    </div>
                    <div className = "userBox" >
                        <UserBox url = "users.json" pollInterval = {2000}/>
                    </div>
                </div>
        );
    }
});

React.render(
  <MainBox />,
  document.getElementById('content')
);

