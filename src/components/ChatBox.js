import React from "react";
import sentTextSound from "../sounds/sent_text.wav";
import receiveTextSound from "../sounds/receive_text.mp3"
import Draggable from "react-draggable";
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

  receivedText = new Audio(receiveTextSound);
  sentText = new Audio(sentTextSound);

  componentDidMount() {
    this.props.adapter.getChat(this.props.chat.id)
    .then(chat => {
      this.setState({ chat });
    });
  }

  renderTexts = () => {
    const texts = this.state.texts.map((text, idx) => {
      return <Text key={idx} sender={text.sender} text={text} />;
    });
    return texts;
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSend = e => {
    e.preventDefault();
    const newText = {
      user_id: this.props.user.id,
      chat_id: this.state.chat.id,
      content: this.state.textarea
    };

    this.props.adapter.sendText(newText)
    .then(data => {
      this.setState({ textarea: "" });
    })
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

                    if(text.sender.id === this.props.user.id){
                      this.sentText.load();
                      this.sentText.play();
                    } else {
                      this.receivedText.load();
                      this.receivedText.play();
                    }
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
