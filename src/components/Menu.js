import React from "react";
import { withRouter } from "react-router-dom";
import { List, ListItem, Divider, Button } from "react95";

const Menu = props => {
  const [open, setOpen] = React.useState(false);

  function handleClick() {
    setOpen(!open);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {open && (
        <List
          horizontalAlign="right"
          verticalAlign="top"
          open={open}
          onClick={handleClose}
        >
          {props.loggedIn ? (
            <ListItem onClick={props.handleLogout}>Logout</ListItem>
          ) : (
            <ListItem onClick={() => props.history.push("/signin")}>
              Login
            </ListItem>
          )}
          <Divider />
          <ListItem>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/sotek222/VidNet_Frontend"
            >
              Github
            </a>
          </ListItem>
        </List>
      )}
      <Button
        onClick={handleClick}
        active={open}
        style={{ fontWeight: "bold" }}
      >
        Start
      </Button>
    </div>
  );
};

export default withRouter(Menu);
