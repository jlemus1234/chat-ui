
import React from 'react';
import io from "socket.io-client";
var $ = require('jquery');

const socket = io("https://spotim-demo-chat-server.herokuapp.com");

class MessageCreation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      message : ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMsgChange = this.handleMsgChange.bind(this);

  }

  message(){
    socket.emit('spotim/chat', {avatar: "default", username: this.state.username,
    message: this.state.messsage})
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


    handleMsgChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event){
    event.preventDefault();
    socket.emit('spotim/chat', {avatar: "Portrait", username: this.state.username,
    text: this.state.message})
    $('#txta').val('');


  }

  render() {
    return (
      <div id = "input">
      <form onSubmit={this.handleSubmit}>
        <label>
          <input
            name="username"
            type="text"
            placeholder="Username"
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          <textarea id = "txta" rows = "4" cols = "50"
            name="message"
            type="textarea"
            placeholder = "Message"
            onChange={this.handleMsgChange} required>
            </textarea>
        </label>
        <button id = "submit" type="submit" value="Submit">
        Send
        </button>
      </form>
      </div>
    );
  }
}

export default MessageCreation;


