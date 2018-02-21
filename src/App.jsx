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
  }


  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 4, type: "user", text: "Hello there!", user: "Michelle"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  renderNewMessage(messageText) {
    const newMessageObject = {
      id: Math.random(),
      type: "user",
      text: messageText,
      user: this.state.currentUser.name
    };
    const newMessages = this.state.messages.concat(newMessageObject);
    this.setState({messages: newMessages});
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
