
import React, { Component } from 'react';
import io from "socket.io-client";


var usernameSubmit = "";
var messageSubmit = "";


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
    //const value = target.type === 'checkbox' ? target.checked : target.value;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    console.log(this.state.username);
    console.log(this.state.message);
    console.log(value);

    //usernameSubmit = value;

  }


    handleMsgChange(event) {
    const target = event.target;
    //const value = target.type === 'checkbox' ? target.checked : target.value;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    console.log(this.state.username);
    console.log(this.state.message);
    console.log(value);

    //usernameSubmit = value;

  }

  handleSubmit(event){
        event.preventDefault();

    console.log(this.state.username);
    console.log(this.state.message);
    alert("it works");
    socket.emit('spotim/chat', {avatar: "default", username: this.state.username,
    message: this.state.message})
    event.preventDefault();

  }

  render() {
    return (
      <div id = "input">
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input
            name="username"
            type="text"
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Message:
          <input
            name="message"
            type="textarea"
            onChange={this.handleMsgChange} />
        </label>
        <button type="submit" value="Submit" />

      </form>
      </div>
    );
  }
}

export default MessageCreation;