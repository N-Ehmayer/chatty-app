import React, {Component} from 'react';

class ChatBar extends Component {
//----------------------------------------------------------------------------------//
  constructor(props) {
    super(props);
    this.state = {
      messageText: ''
    };

    this.onMessageTextChange = this.onMessageTextChange.bind(this);
    this.onMessageSubmit = this.onMessageSubmit.bind(this);
  }
//----------------------------------------------------------------------------------//
  onMessageTextChange(event) {
    this.setState({messageText: event.target.value});
  }

  onMessageSubmit(event) {
    if (event.key === 'Enter') {
      this.props.newMessage(this.state.messageText);
      this.setState({messageText: ''});
    };
  }
//----------------------------------------------------------------------------------//
  render() {
    console.log("Rendering <ChatBar/>");

    const currentUser = this.props.currentUser;
//----------------------------------------------------------------------------------//
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={currentUser} />
        <input
          value={this.state.messageText}
          onChange={this.onMessageTextChange}
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={this.onMessageSubmit} />
      </footer>
    );
  }
}

export default ChatBar;