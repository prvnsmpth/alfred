import React, { useEffect } from "react";
import { Chat } from "../Chat/Chat";
import { useParams } from "react-router-dom";

const mockMessages = [
  {
    id: "1",
    text: "Hello There",
    sender: "Caller",
  },
  {
    id: "2",
    text: "Hi There",
    sender: "Me",
  },
  {
    id: "1",
    text: "Hello, this is longer text Hello, this is longer text Hello, this is longer text Hello, this is longer text",
    sender: "Caller",
  },
  {
    id: "2",
    text: "Hello, this is longer text Hello, this is longer text Hello, this is longer text Hello, this is longer text",
    sender: "Me",
  },
  {
    id: "2",
    text: "Summary: This was a sales call aimed at selling insurance, The insurer is HDFC and the caller was offering a term plan. The caller was polite and well spoken.",
    sender: "Me",
  },
];

export const ChatDetails = () => {
  const [messages, setMessages] = React.useState([]);
  const { id } = useParams();
  useEffect(() => {
    try {
      const chats = JSON.parse(localStorage.getItem("chats") || "[]");
      const chat = chats.find((chat: any) => chat.id === id);
      setMessages(chat.messages || []);
    } catch (error) {
      setMessages([]);
    }
  }, []);
  return <Chat disableChat messagesList={messages} />;
};
