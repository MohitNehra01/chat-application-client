import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AccountProvider";
import ChatHeader from "./chatHeader/ChatHeader";
import Messages from "./Message Page/Messages";
import { getConversation } from "../../../../api/user.api";



function ChatBox() {
  const {account , userChatOpen} = useContext(AuthContext)
  const [conversation, setConversation] = useState({});


   useEffect(() => {
          const getConversationDetails = async ()=>{
            let data = await getConversation({
                senderId:account._id,
                receiverId: userChatOpen._id
            })

            setConversation(data.conversation);
          }

          getConversationDetails()
          // eslint-disable-next-line
   }, [userChatOpen])
  return (
    <Box style={{ width: "100%", height: "100%", overFlow: "hidden" }}>
    <ChatHeader personChatOpen={userChatOpen} />
    <Messages conversation = {conversation} />
  </Box>
  )
}

export default ChatBox