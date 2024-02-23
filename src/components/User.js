import React from "react";

class User extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      count: 0,
      text: "",
    };
  }

  render() {
    const { name, location } = this.props;
    return (
      <div className="user-card">
        <span
          onClick={() => {
            this.setState({ count: this.state.count + 2 });
          }}
        >
          Name: {name}
        </span>
        <span>Location: {location}</span>
        <span>Count: {this.state.count}</span>
      </div>
    );
  }
}

export default User;
