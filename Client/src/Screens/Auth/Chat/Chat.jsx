import React, { useContext, useEffect, useRef, useState } from "react";
import ChatUserInfo from "./ChatUserInfo/ChatUserInfo";
import Body from "./Body/Body";
import Actions from "./Actions/Actions";
import "./Chat.css";
import { v4 as uuidv4 } from "uuid";
import { io } from "socket.io-client";
import { UserContext } from "../Auth";
import { useParams } from "react-router-dom";
import axios from "axios";
import Tost_Alert from "../../../Components/Tost_Alert/Tost_Alert";
const Socket = io.connect(process.env.REACT_APP_SOCKET);

function Chat() {
  const [MessageInput, SetMEssageInput] = useState("");
  const [UserInfo, SetUSerInfo] = useState({});
  const [Chat, SeChat] = useState([]);
  const [ArriveMessage, SeArriveMessage] = useState(null);
  const User = useContext(UserContext);
  const Params = useParams();
  const [Typing, SetTyping] = useState(false);
  const ScrollRef = useRef();

  useEffect(() => {
    Socket.emit("online_user", User._id);
  }, [User._id]);

  const HandleSendMessage = async () => {
    if (MessageInput !== "") {
      try {
        await axios
          .post(
            `${process.env.REACT_APP_API}/Message/SendMessages`,
            {
              From: User._id,
              To: Params.id,
              Message: MessageInput,
            },
            {
              headers: {
                Authorization: User.Token,
              },
            }
          )
          .then((res) => {
            if (res.data.Status === "Faild") {
              Tost_Alert("error", res.data.message);
            } else {
              Socket.emit("Send_Message", {
                From: User._id,
                To: Params.id,
                Message: MessageInput,
              });
              const NewChat = [...Chat];
              NewChat.push({
                Message: MessageInput,
                Sender: User._id,
                User,
                _id: uuidv4(),
              });
              SeChat(NewChat);
              SetMEssageInput("");
            }
          });
      } catch (err) {
        Tost_Alert("error", "Sorry , Can't get your data !");
      }
    }
  };

  useEffect(() => {
    const GEtMessages = async () => {
      try {
        await axios
          .post(
            `${process.env.REACT_APP_API}/Message/GetAllMessages`,
            { From: User._id, To: Params.id },
            {
              headers: {
                Authorization: User.Token,
              },
            }
          )
          .then((res) => {
            if (res.data.Status === "Faild") {
              Tost_Alert("error", res.data.message);
            } else {
              SeChat(res.data.data);
            }
          });
      } catch (err) {
        Tost_Alert("error", "Sorry , Can't get your data !");
      }
    };

    GEtMessages();
  }, [Params.id, User]);

  useEffect(() => {
    Socket.on("Recive_Message", (msg) => {
      SeArriveMessage({
        Message: msg,
        Sender: UserInfo._id,
        User: UserInfo,
        _id: uuidv4(),
      });
    });
  }, [UserInfo]);

  useEffect(() => {
    Socket.on("Show_Typing_Status", () => {
      ScrollRef.current.scrollTop = ScrollRef.current.scrollHeight;
      SetTyping(true);
    });
  }, []);

  useEffect(() => {
    Socket.on("Hide_Typing_Status", () => {
      ScrollRef.current.scrollTop = ScrollRef.current.scrollHeight;
      SetTyping(false);
    });
  }, []);

  useEffect(() => {
    ArriveMessage && SeChat((prev) => [...prev, ArriveMessage]);
  }, [ArriveMessage]);

  return (
    <React.Fragment>
      <div className="chat">
        {/*  Chat Head  */}
        <ChatUserInfo UserInfo={UserInfo} SetUSerInfo={SetUSerInfo} />
        {/*  Chat body  */}
        <Body
          Chat={Chat}
          SeChat={SeChat}
          Typing={Typing}
          SetTyping={SetTyping}
          UserInfo={UserInfo}
          ScrollRef={ScrollRef}
        />
        {/*  Chat action  */}
        <Actions
          HandleSendMessage={HandleSendMessage}
          MessageInput={MessageInput}
          SetMEssageInput={SetMEssageInput}
          Typing={Typing}
          SetTyping={SetTyping}
          UserInfo={UserInfo}
          Socket={Socket}
        />
      </div>
    </React.Fragment>
  );
}
export default Chat;
