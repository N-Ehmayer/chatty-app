import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Nic"},
      messages: [{
        id: 1,
        type: "user",
        text: "I won't be impressed with technology until I can download food.",
        user: "Anonymous1"
      }, {
        id: 3,
        type: "system",
        text: "Anonymous1 changed their name to nomnom."
      }, {
        id: 2,
        type: "user",
        text: "hey",
        user: "TheLegend27"
      }]
    };

    this.renderNewMessage = this.renderNewMessage.bind(this);

  }


  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket = new WebSocket("ws://localhost:3001");
    console.log("Connected to server");

    // this.socket.onopen = (event) => {
    //   this.socket.send("some data");
    // };

    // this.socket.onmessage = (event) => {
    //   console.log(event.data);
    // };
  }

  renderNewMessage(messageText) {



    const newMessageObject = {
      id: Math.random(),
      type: "user",
      text: messageText,
      user: this.state.currentUser.name
    };

    this.socket.send(`User ${newMessageObject.user} said ${newMessageObject.text}`);
    this.socket.onmessage = (event) => {
      console.log(event.data);
    };

    const newMessage = this.state.messages.concat(newMessageObject);
    this.setState({messages: newMessage});

  }


  render() {
    console.log("Rendering <App/>");

    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList messages={this.state.messages} />
      <ChatBar
        currentUser={this.state.currentUser.name}
        newMessage={this.renderNewMessage} />
      </div>
    );
  }
}

export default App;
