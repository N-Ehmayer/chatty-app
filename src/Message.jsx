import React, {Component} from 'react';

class Message extends Component {

  render() {
    console.log("Rendering <Message/>");

    const messages = this.props.messages.map((message) => {
      if (message.type === 'user') {
        return (
          <div key={message.id} className="message">
            <span className="message-username">{message.user}</span>
            <span className="message-content">{message.text}</span>
        </div>
        );
      } else if (message.type === 'system') {
        return (
          <div key={message.id} className="message system">
            {message.text}
          </div>
        );
      };
    });


    return (
      <div>
        {messages}
      </div>
    );
  }
}

export default Message;