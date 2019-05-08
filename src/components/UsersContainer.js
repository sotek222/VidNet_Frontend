import React from "react";
import UserCard from "./UserCard";
import HourGlassIcon from "../icons/HourGlassIcon.gif";
import { Table, TableBody } from "react95";

const UsersContainer = props => {
  const users = props.users.map(userObj => {
    return (
      <UserCard
        key={userObj.id}
        user={userObj}
        currentUser={props.currentUser}
        isInFriends={props.isInFriends}
      />
    );
  });

  return (
    <div className="container">
      <Table style={{ marginTop: 6 }}>
        {users.length > 0 ? (
          <TableBody>{users}</TableBody>
        ) : (
          <img className="hour-glass" src={HourGlassIcon} alt="" />
        )}
      </Table>
    </div>
  );
};

export default UsersContainer;
