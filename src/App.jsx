import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Nic"},
      messages: []
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

    const text = messageText;
    const user = this.state.currentUser.name;

    const newMessageObject = {
      //id: Math.random(),
      type: "user",
      text: text,
      user: user
    };

    this.socket.send(JSON.stringify(newMessageObject));

    this.socket.onmessage = (event) => {

      const newMessage = this.state.messages.concat(JSON.parse(event.data));
      this.setState({messages: newMessage});
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
