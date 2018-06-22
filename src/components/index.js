
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
      <li> {msg.avatar} {msg.username} {msg.message} </li>
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
      <div style = {{textAlign:"center" }}>
        <ul>
          {namesList}
        </ul>
      </div>
      <div>
        <p> Message Creation</p>
        <MessageCreation/>

      </div>
            
    </div>
    );
  }
}

export default App;


//This is your top level React component, you may change everything
