import React from "react";

enum MessageType {
  USER,
  SYSTEM,
}

interface Message {
  type: MessageType;
  text: string;
  sender: string;
  id: string;
}

const initialMockMessages: Message[] = [
  {
    id: "1",
    text: "Hello, I am Jaideep speaking from HDFC bank, are you interested in a bank loan?",
    sender: "Jaideep",
    type: MessageType.USER,
  },
  {
    id: "2",
    text: "Yes, I am interested in a bank loan",
    sender: "me",
    type: MessageType.SYSTEM,
  },
];

export const Chat2 = () => {
  const [messages, setMessages] =
    React.useState<Message[]>(initialMockMessages);
  return (
    <div className="wrap">
      <div className="body">
        <div className="left">
            {/* {
                messages.map((message: Message) => (
                    <figure className={`s-message ${message.type === MessageType.USER ? "u-message" : "s-message"}`}>
                        <figcaption>
                            <span>{message.sender}</span>12:35
                            <div className="dot"></div>
                        </figcaption>
                        <p>{message.text}</p>
                    </figure>
                ))
            } */}
          <figure className="s-message">
            <figcaption>
              <span>Alexandr</span>12:35
              <div className="dot"></div>
            </figcaption>
            <p>Hi, dude! How are you?)</p>
          </figure>
          <figure className="left-message">
            <figcaption>
              <span>Alexandr</span>12:38
              <div className="dot"></div>
            </figcaption>
            <p>Alexandr left conversation</p>
          </figure>
        </div>

        <div className="right">
          <figure className="u-message">
            <figcaption>
              <div className="dot_green"></div>
              <span>Me</span>12:36
            </figcaption>
            <p>Where's my money?</p>
          </figure>
        </div>
      </div>
      <div className="footer">
        <div className="sending-message">
          <button>
            SEND
            <svg id="send-ico" viewBox="0 0 26.5 22.9">
              <polygon points="5.8,0 26.5,12.4 5.3,22.9 6.6,14.8 0,10.4 11.3,10.4 6.4,7.7 " />
            </svg>
          </button>
          <textarea
            // type="text"
            className="message-input"
            placeholder="Type message..."
          ></textarea>
        </div>
      </div>
      <div className="line"></div>
    </div>
  );
};
