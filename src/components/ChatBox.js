import React from "react";
import textSound from "../sounds/text.mp3";
import Draggable from "react-draggable";
import adapter from "../services/adapter";
import { ActionCableConsumer } from "react-actioncable-provider";
import { ThemeProvider } from "styled-components";
import {
  themes,
  Button,
  Window,
  WindowContent,
  WindowHeader,
  TextField
} from "react95";

import Text from "./Text";

class ChatBox extends React.Component {
  state = {
    chat: {},
    textarea: "",
    texts: []
  };

  sentText = new Audio(textSound);

  componentDidMount() {
    this.props.adapter.getChat(this.props.chat.id)
    .then(chat => {
      this.setState({ chat });
    });
  }

  renderTexts = () => {
    const texts = this.state.texts.map(text => {
      return <Text sender={text.sender} text={text} />;
    });
    return texts;
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSend = e => {
    e.preventDefault();
    let userId = this.props.user.id;
    let chatId = this.state.chat.id;
    let content = this.state.textarea;
    adapter.sendText(userId, chatId, content).then(data => {
      this.setState({ textarea: "" });
    });
  };

  render() {
    return (
      <ThemeProvider theme={themes.default}>
        <Draggable cancel=".no-drag">
          <Window
            className="not-draggable"
            style={{
              width: 300,
              height: 345,
              position: "absolute",
              top: "0%",
              right: "101%"
            }}
          >
            <WindowHeader>
              <h3
                style={{
                  float: "left",
                  display: "inline",
                  marginTop: 5,
                  marginLeft: -10
                }}
              >
                VidNet.exe
              </h3>
            </WindowHeader>
            <WindowContent>
              {this.state.chat.id ? 
                <ActionCableConsumer
                  channel={{
                    channel: "ChatChannel",
                    chat_id: this.state.chat.id
                  }}
                  onReceived={text => {
                    this.setState({ texts: [...this.state.texts, text] });
                    this.props.updateScroll();
                    this.sentText.load();
                    this.sentText.play();
                  }}
                />
              : null
              }
              <div id="chat-box" className="chat-container">
                {this.renderTexts()}
              </div>
              <form className="chat">
                <TextField
                  className="no-drag"
                  shadow={false}
                  onChange={this.handleChange}
                  name="textarea"
                  type="text"
                  value={this.state.textarea}
                />
                <Button
                  style={{ marginTop: "1%" }}
                  type="submit"
                  onClick={this.handleSend}
                >
                  Send
                </Button>
              </form>
            </WindowContent>
          </Window>
        </Draggable>
      </ThemeProvider>
    );
  }
}

export default ChatBox;
