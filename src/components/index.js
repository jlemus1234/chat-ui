//This is your top level React component, you may change everything

import React, { Component } from 'react';
import logo from '../assets/spotim-logo.jpg';
import {Container, Image} from 'semantic-ui-react';
import styled from 'styled-components';
import MessageCreation from './parts/MessageCreation';
import io from "socket.io-client";


var allMsgs = [];


const Logo = styled.div`
      img{
        margin-left: auto;
        margin-right: auto;
        margin-top: 15px;      
      }
      
`;


class App extends Component {
  constructor() {
    super();
    this.state = {
    messages: [],
    endpoint: "spotim-demo-chat-server.herokuapp.com"
    };
  }


  componentDidMount() {
    const {endpoint } = this.state;
    const socket = io(endpoint);

    socket.on("spotim/chat", msg => 
      this.setState({messages: msg}));
  }

  render() {
    const {messages} = this.state;
    allMsgs.push(messages);
    const namesList = allMsgs.map(msg=> {
    return(
    <div id = "msgDisplay">
      <ul>
        <li class = "portrait"> {msg.avatar} </li>
        <li>  {msg.username} </li>
        <li> {msg.text} </li>
      </ul>
      <br></br>
    </div>
    )
  })

    return (
    <div className="App">
      <Container className={'spotim-header'}>
        <div className={'spotim-title'}>
          Welcome to the Spot.IM Chat app
        </div>
        <div>
          <Logo>
            <Image size={'tiny'} src={logo}/>
          </Logo>
        </div>
      </Container>
      <div id = "chatWindow">
        <ul id = "row">
          {namesList}
        </ul>
      </div>
      <div id = "write">
        <MessageCreation/>
      </div>
            
    </div>
    );
  }
}

export default App;


