
'use strict';

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
            <h3> Roles: < /h3> < RoleForm onRoleSubmit = {this.handleRoleSubmit}/>
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
         <input type="submit" value="Submit Role" className="btn btn-default"/>
        </form>
      );
    }
});


module.exports = RoleBox;