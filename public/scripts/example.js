
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
var RoleBox = React.createClass({
    loadRolesFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(roleData) {
                this.setState({
                    roleData: roleData
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    handleRoleSubmit: function(role) {
        var roleData = this.state.roleData;
        var newRoleData = roleData.concat([role]);
        this.setState({
            roleData: newRoleData
        });
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: role,
            success: function(roleData) {
                this.setState({
                    roleData: roleData
                })
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
        this.loadRolesFromServer();
        setInterval(this.loadRolesFromServer, '2000');
    },
    render: function() {
        return ( <div className = "roleBox" >
            <h1> Roles: < /h1> < RoleForm onRoleSubmit = {this.handleRoleSubmit}/>
            </div>
        );
    }
});

var RoleForm = React.createClass({
      handleRolesSubmit:function(e){
        e.preventDefault();
        var roleName = React.findDOMNode(this.refs.roleName).value.trim();
        var roleDescription = React.findDOMNode(this.refs.roleDescription).value.trim();
        if(!roleName || !roleDescription){
          alert("Please role name/description");
          return;
        }
      this.props.onRoleSubmit({roleName: roleName, roleDescription:roleDescription});
      React.findDOMNode(this.refs.roleName).value = '';
      React.findDOMNode(this.refs.roleDescription).value = '';
  },
  render: function() {
      return (
        <form className="roleForm" onSubmit={this.handleRolesSubmit}>
          <div className="form-group">

            <label for="roleName">Role Name :</label>
            <input type="text" className="form-control" placeholder="Role name" ref="roleName" />
           </div>
           <div className="form-group">

            <label for="role_desc">Role Description :</label>
            <input id="role_desc" className="form-control" type="text" placeholder="Role Description" ref="roleDescription" /> 
         </div>
         <input type="submit" value="Submit Role" className="btn" />
        </form>
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
            <h1> Users List </h1>
            <UsersList data = {this.state.data}/>
             <UserForm onUserSubmit = {this.handleUsersSubmit}/>
             <RoleBox url = "roles.json" pollInterval = {2000}/>
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
      <form className="userForm" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label for="first_name">First Name :</label>
          <input id="first_name" className="form-control" type="text" placeholder="First name" ref="firstName" />
       </div> 
        <div className="form-group">
          <label for="last_name">Last Name :</label>
          <input id="last_name" className="form-control" type="text" placeholder="Last name" ref="lastName" /> 
         </div>
        <div className="form-group">
           <label for="user_id">User Id :</label>
          <input id="user_id" type="text" className="form-control" placeholder="User Id" ref="userId" /> 
        </div>
      
        <div className="form-group">
            <label for="password">Password : </label>
          <input id="password" type="password" className="form-control" placeholder="Password" ref="password" /> 
       </div>
       <input type="submit" value="Submit User" className="btn btn-default"/>
        
      </form>
    );
  }
});

React.render(
  <UserBox url="users.json" pollInterval={2000} />,
  document.getElementById('content')
);





