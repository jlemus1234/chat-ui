
//This is then entry point for your app. Do as you wish.


import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./components";
import io from "socket.io-client";

ReactDOM.render(<App />, document.getElementById("root"));

//connecting to Socket.IO chat server
const socket = io("https://spotim-demo-chat-server.herokuapp.com");
socket.on("connect", function() {
  console.log("connected to chat server!");
});

socket.on("disconnect", function() {
  console.log("disconnected from chat server!");
});


socket.on('spotim/chat', function(msg){
    console.log('message: ' + msg);
});

//socket.on('message', function(msg){
//    console.log('message: ' + msg);
//});

socket.emit('spotim/chat', 'test', console.log('sent it'));

socket.on('spotim/chat', function(msg){
	console.log("message:" + msg);

});
