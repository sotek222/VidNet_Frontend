import React from "react";
import { withRouter } from "react-router-dom";
import AccountIcon from "../icons/AccountIcon.png";
import VideoRoomIcon from "../icons/VideoRoomIcon.png";
import UserSearchIcon from "../icons/UserSearchIcon.png";
import FriendsIcon from "../icons/FriendsIcon.png";
import MailIcon from "../icons/MailIcon.png";
import TheatreSearchIcon from "../icons/TheatreSearchIcon.png";

const IconsContainer = props => {
  return (
    <div id="desktop-grid">
      <img
        onClick={() => props.history.push("/theatre")}
        src={VideoRoomIcon}
        alt=""
      />
      <img
        onClick={() => props.history.push("/search")}
        src={UserSearchIcon}
        alt=""
      />
      <img
        className="account-icon"
        onClick={() => props.history.push("/user")}
        src={AccountIcon}
        alt=""
      />
      <img
        onClick={() => props.history.push("/friends")}
        src={FriendsIcon}
        alt=""
      />
      <img
        onClick={() => {
          props.loggedIn
            ? props.history.push(`/user/inbox/${props.user.inbox.id}`)
            : props.history.push("/signin");
        }}
        src={MailIcon}
        alt=""
      />
      <img
        className="theatre-icon"
        src={TheatreSearchIcon}
        alt=""
        onClick={() => {
          props.loggedIn
            ? props.history.push("/theatre/search")
            : props.history.push("/signin");
        }}
      />
    </div>
  );
};

export default withRouter(IconsContainer);
