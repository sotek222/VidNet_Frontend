import React from "react";
import adapter from "../services/adapter";
import { ActionCableConsumer } from "react-actioncable-provider";

class ChatBox extends React.Component {
  state = {
    chat: {},
    textarea: "",
    texts: []
  };

  componentDidMount() {
    adapter.getChat(this.props.chat.id).then(chat => {
      this.setState({ chat });
    });
  }

  renderTexts = () => {
    const texts = this.state.texts.map(text => {
      return (
        <p>
          {text.sender.username}: {text.content}
        </p>
      );
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
      <div>
        <ActionCableConsumer
          channel={{
            channel: "ChatChannel",
            chat_id: this.state.chat.id
          }}
          onReceived={text => {
            this.setState({ texts: [...this.state.texts, text] });
          }}
        />
        <h2>Chat:</h2>
        <div>{this.renderTexts()}</div>
        <form>
          <textarea
            onChange={this.handleChange}
            name="textarea"
            value={this.state.textarea}
          />
          <button type="submit" onClick={this.handleSend}>
            Send
          </button>
        </form>
      </div>
    );
  }
}

export default ChatBox;
