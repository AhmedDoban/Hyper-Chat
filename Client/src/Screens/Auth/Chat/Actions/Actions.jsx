import React, { useState } from "react";
import "./Actions.css";
import EmojiPicker, { Emoji } from "emoji-picker-react";

function Actions(props) {
  const [EmojiShow, SetEmojiShow] = useState(false);

  return (
    <React.Fragment>
      <div className="chat-action">
        <div className="Emoji">
          {EmojiShow && (
            <div className="EmojiPicker">
              <EmojiPicker
                autoFocusSearch="false"
                emojiStyle="google"
                searchDisabled="true"
                width="100%"
                height="100%"
                onEmojiClick={(e) =>
                  props.SetMEssageInput((prev) => prev + e.emoji)
                }
              />
            </div>
          )}
          <div
            className="Emoji-show"
            onClick={() => SetEmojiShow((prev) => !prev)}
          >
            <Emoji unified="1f604" />
          </div>
        </div>
        <input
          type="text"
          placeholder="message...."
          value={props.MessageInput}
          onChange={(e) => props.SetMEssageInput(e.target.value)}
          onKeyDown={() => props.Socket.emit("Typing", props.UserInfo._id)}
          onBlur={() => props.Socket.emit("StopTyping", props.UserInfo._id)}
        />
        <button onClick={() => props.HandleSendMessage()}>
          <i className="fa-solid fa-paper-plane" />
        </button>
      </div>
    </React.Fragment>
  );
}
export default Actions;
