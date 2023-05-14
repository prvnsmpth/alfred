import { Badge } from "@nextui-org/react";
import React, { useEffect } from "react";

export interface Message {
  id: string;
  text: string;
  sender: string;
  type?: string;
  tags?: string[];
  caller?: string;
}

interface Props {
  message: Message;
  chatSelfThemeBetween1to5: number;
}

export const ChatMessage: React.FC<Props> = ({
  message,
  chatSelfThemeBetween1to5,
}) => {
  const [loaded, setLoaded] = React.useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 400);
  }, []);
  return (
    <div
      key={message.id}
      className={`chat-message chat-message-${
        message.sender === "Me"
          ? message.type === "summary"
            ? `self chat-message-color-3 full-width`
            : `self chat-message-color-${chatSelfThemeBetween1to5}`
          : "other"
      }`}
    >
      <>
        <div className="chat-message-sender">
          {message.sender}{" "}
          <span className="timestamp">&nbsp;&nbsp;12:25PM</span>
        </div>
        <div className="chat-message-text">
          <span className={loaded ? "loaded" : ""}>
            {message.type === "summary" ? (
              <>
                <h5>Caller:</h5>
                {message.caller}
                <br /><br />
                <h5>Summary:</h5>
              </>
            ) : (
              ""
            )}
            {message.text} {message.text.length <= 3 ? "\u00A0" : ""}
            {message.type === "summary" ? (
              <>
                <br /><br />
                <h5>Tags:{" "}</h5>
                <br />
                {message.tags?.map((tag) => (
                  <Badge color="primary" disableOutline className="message-tag">{tag}</Badge>
                ))}
                <br /><br />
              </>
            ) : (
              ""
            )}
          </span>
          <div className="chat-message-backdrop"></div>
        </div>
      </>
    </div>
  );
};
