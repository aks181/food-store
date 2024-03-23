import React from "react";
import UserContext from "../../src/utils/UserContext";

class User extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      count: 0,
      text: "",
    };
  }

  render() {
    const { name, location } = this.props;
    return (
      <div className="user-card">
        <p
          onClick={() => {
            this.setState({ count: this.state.count + 2 });
          }}
        >
          Name: {name}
        </p>
        <p>Location: {location}</p>
        <p>Count: {this.state.count}</p>
        <UserContext.Consumer>
          {(data) => <p>Logged In User: {data.loggedInUser}</p>}
        </UserContext.Consumer>
      </div>
    );
  }
}

export default User;
