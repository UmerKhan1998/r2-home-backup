import React, { useState, useEffect, useRef } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";

import { useDispatch, useSelector } from "react-redux";
import { notificationCounts } from "../../../redux/actions";
const Chat = ({ userMatchId }) => {
  const [connection, setConnection] = useState(null);
  const [chat, setChat] = useState([]);
  const latestChat = useRef(null);

  var count = 0;
  const dispatch = useDispatch();

  const userIdMatch = useSelector((state) => state?.userDataReducer.id);

  latestChat.current = chat;

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://stage-api.cyfersoft.com:267/notificationMessageHub")
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (userIdMatch) {
      if (connection) {
        connection
          .start()
          .then((result) => {
            //console.log("Connected!");

            connection.on(
              "ReceiveNotificationMessage",
              (topic, userid, message, category, msg) => {
                const updatedChat = [...latestChat.current];
                //console.log("message", message, userid, message, category, msg,userMatchId);
                //console.log('userId',userIdMatch,userid)

                if (userid === userIdMatch) {
                  count = count + 1;
                  dispatch(notificationCounts(count));
                }
              }
            );
          })
          .catch((e) => console.log("Connection failed: ", e));
      }
    }
  }, [connection, userIdMatch]);

  return <div></div>;
};

export default Chat;
