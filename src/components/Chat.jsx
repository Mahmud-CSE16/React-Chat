import React from "react";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import Add from "../imgs/add.png";
import Cam from "../imgs/cam.png";
import More from "../imgs/more.png";
import Input from "./Input";
import Messages from "./Messages";

function Chat() {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user.displayName}</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>

      <Messages />

      <Input />
    </div>
  );
}

export default Chat;
