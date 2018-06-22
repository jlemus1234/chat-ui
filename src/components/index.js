//This is your top level React component, you may change everything

import React, { Component } from 'react';
import logo from '../assets/spotim-logo.jpg';
import {Container, Image} from 'semantic-ui-react';
import styled from 'styled-components';
import MessageCreation from './parts/MessageCreation';

import io from "socket.io-client";
//const socket = io("https://spotim-demo-chat-server.herokuapp.com");


//var user = "User"
//var prof = "Default"
//var data = {
 //   avatar: prof,
//    username: user,
//    message: 'test'
//}


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
//    socket.on("spotim/chat", function(msg){
//      console.log(msg);
//      this.setState({messages:msg})
//    }
//    )
//  }

    socket.on("spotim/chat", msg => 
      this.setState({messages: msg}));
  }

  render() {
    const {messages} = this.state;
    allMsgs.push(messages);
    console.log(allMsgs);
    const namesList = allMsgs.map(msg=> {
          console.log("In map: " + msg.username);
          console.log(msg.avatar);
          console.log(msg.message);

    return(
    <div id = "msgDisplay">
      <ul>
        <li> {msg.avatar} </li>
        <li>  {msg.username} </li>
        <li> {msg.message} </li>
      </ul>
      <br></br>
    </div>
    )
  })

//    const {namesList} = messages.map(name => {
//    return (
//      <li> {name.username} </li>
//    )
//  })


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


