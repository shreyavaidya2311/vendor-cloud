import React from "react";
import Header from "./Header";
import UserMap from "./Map/UserMap";

class User extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div>
          <UserMap />
        </div>
      </div>
    );
  }
}

export default User;
