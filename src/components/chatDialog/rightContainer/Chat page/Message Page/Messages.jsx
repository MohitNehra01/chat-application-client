import { Box, styled } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { getAllMessages, newMessage } from "../../../../../api/user.api";
import { AuthContext } from "../../../../../context/AccountProvider";
import Chats from "./chats/Chats";
import ChatFooter from "./footer/ChatFooter";
import { SocketContext } from "../../../../../context/SocketContext";

const Wrapper = styled(Box)`
  background-image: url(${"https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png"});

  background-size: 50%;
`;
const Component = styled(Box)`
  // height: 80vh;
  overflow-y: scroll;
`;

function Messages({ conversation }) {
  const scrollRef = useRef();
  const [file, setFile] = useState("");
  const [allMessages, setAllMessages] = useState();
  const [value, setValue] = useState("");
  const [newMessageFlag, setNewMessageFlag] = useState(false);
  const [incomingMessage, setIncomingMessage] = useState(null);

  const { socket } = useContext(SocketContext);
  const { account, userChatOpen } = useContext(AuthContext);

  // socket
  useEffect(() => {
    socket.current.on("getMessage", (data) => {

      console.log('data' , data);
      console.log('type' , data.type)
      if (data.type === "file" || data.type === 'image' || data.type === 'vedio' || data.type === 'music') {
        setNewMessageFlag(!newMessageFlag);
      } else {
        setIncomingMessage({
          ...data,
          createdAt: Date.now(),
        });
      }
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    incomingMessage &&
      conversation?.members?.includes(incomingMessage.senderId) &&
      setAllMessages((prev) => [...prev, incomingMessage]);
  }, [incomingMessage, conversation]);

  // get all messages
  useEffect(() => {
    const getMessage = async () => {
      const data = await getAllMessages(conversation?._id);
      setAllMessages(data?.msg);
    };

    conversation && conversation._id && getMessage();
    // eslint-disable-next-line
  }, [userChatOpen, conversation?._id, newMessageFlag]);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [allMessages]);

  const sendText = async (e) => {
    const code = e.keyCode || e.which;
    if (code === 13) {
      // let message = {
      //   senderId: account._id,
      //   receiverId: userChatOpen._id,
      //   conversationId: conversation._id,
      //   type: "text",
      //   text: value,
      // };

      const formData = new FormData();
      formData.append("senderId", account?._id);
      formData.append("receiverId", userChatOpen?._id);
      formData.append("conversationId", conversation?._id);
      if (file) {
        formData.append("type", "file");
        formData.append("text", "file Uplaod");
        formData.append("file", file);
      } else {
        formData.append("type", "text");
        formData.append("text", value);
      }

      const formDataObj = Object.fromEntries(formData.entries());
      await newMessage(formData);
      console.log(formDataObj)
      socket.current.emit("sendMessage", formDataObj);
      setValue("");
      setFile("");
      setNewMessageFlag(!newMessageFlag);
    }
  };

  return (
    <Wrapper>
      <Component className="h-[60vh] md:h-[70vh] lg:h-[80vh]">
        {allMessages &&
          allMessages.map((msg) => {
            return (
              <div className="py-[1px] px-[40px]" key={msg._id} ref={scrollRef}>
                <Chats msg={msg} />
              </div>
            );
          })}
      </Component>
      <ChatFooter
        className="h-[20vh]"
        sendText={sendText}
        setValue={setValue}
        value={value}
        file={file}
        setFile={setFile}
      />
    </Wrapper>
  );
}

export default Messages;
