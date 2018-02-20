import React, {Component} from 'react';
import Message from './Message.jsx';


class Messages extends Component {

  render() {
    console.log("Rendering <Messages/>");


    return (
      <main className="messages">
        <Message messages={this.props.messages} />
      </main>
    );
  }
}

export default Messages;