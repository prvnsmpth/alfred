import { Input, Spacer } from "@nextui-org/react";
import React, { useEffect, useLayoutEffect } from "react";
import { ChatMessage, Message } from "./ChatMessage";
// const chatSelfThemeBetween1to5 = Math.floor(Math.random() * 5 + 1);
const chatSelfThemeBetween1to5 = 1;
const lorem100 =
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi at laudantium pariatur omnis aperiam est neque eius saepe nam accusantium facilis, vero ut animi maxime magnam nemo doloremque inventore. Molestiae harum eum quisquam? Ad, commodi. Rerum nemo asperiores, magni nobis eius voluptas quo aperiam suscipit, dolor labore at qui veniam, voluptatibus earum quibusdam laboriosam culpa totam quia. Molestiae odit quo obcaecati, doloribus blanditiis quibusdam dolor a consequatur molestias rerum itaque, officia fuga sed beatae temporibus error illo, adipisci ipsam expedita quaerat? Necessitatibus sit alias quae ratione voluptate minima iure, deserunt veritatis sed impedit recusandae rerum, labore vero architecto, expedita est!";

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
];

export const Chat = () => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [newMessage, setNewMessage] = React.useState<string>("");
  useLayoutEffect(() => {
    setTimeout(() => {
      setMessages(mockMessages);
    }, 400);
  }, []);
  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message: Message) => (
          <ChatMessage
            key={message.id}
            chatSelfThemeBetween1to5={chatSelfThemeBetween1to5}
            message={message}
          />
        ))}
      </div>
      <Spacer y={2} />
      <div className="chat-input">
        <Input
          color="default"
          helperColor="default"
          width="100%"
          clearable
          underlined
          initialValue="NextUI"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setMessages((prevMessages) => {
                return [
                  ...prevMessages,
                  {
                    id: Math.random().toString(),
                    text: newMessage,
                    sender: "Me",
                  },
                ];
              });

              setTimeout(() => {
                setMessages((prevMessages) => {
                  const startIndex = Math.floor(Math.random() * 20);
                  let endIndex = startIndex + Math.floor(Math.random() * 100);
                  endIndex = endIndex > 100 ? 100 : endIndex;
                  return [
                    ...prevMessages,
                    {
                      id: Math.random().toString(),
                      text: lorem100.substring(startIndex, endIndex),
                      sender: "Caller",
                    },
                  ];
                });
              }, Math.random() * 1000);

              setNewMessage("");
            }
          }}
        />
      </div>
      <Spacer y={1} />
      <div className="chat-suggestions">
        {["Ask to repeat", "Wrap up the call", "Get more info"].map(
          (suggestion) => (
            <div className="chat-suggestion" key={suggestion}>
              {suggestion}
            </div>
          )
        )}
      </div>
    </div>
  );
};
