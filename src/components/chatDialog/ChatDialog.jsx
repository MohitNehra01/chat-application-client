import { Dialog } from '@mui/material'
import React, { useContext } from 'react'
import LeftContainer from './leftContainer/LeftContainer'
import { AuthContext } from '../../context/AccountProvider'
import EmptyChat from './rightContainer/EmptyChatPage/EmptyChatPage'
import ChatBox from './rightContainer/Chat page/ChatBox'


const dialogStyle = {
   
    height: "95%",
    width: "100%",
    maxWidth: '100%',
    maxHeight: '100%',
    boxShadow : 'none',
    overFlow:'hidden',
    borderRadius: 0,
    margin: '20px',

}

function ChatDialog() {
  const {userChatOpen} = useContext(AuthContext)
  return (
    <div>
        <Dialog open={true} hideBackdrop={true} PaperProps={{sx:dialogStyle}} maxWidth='md'>
            
            <div className='flex overflow-hidden  h-100vh'>
                <div className="leftContainer w-[190px] sm:w-[200px] md:w-[205px] lg:w-[230px] xl:w-[290px] min-h-[100vh]"> <LeftContainer /></div>
                <div className="rightContainer w-[76%] md:w-[80%] min-w-[300px] border-l-[1px]  border-[rgba(0,0,0,0.14)]">
                {Object.keys(userChatOpen).length? <ChatBox /> : <EmptyChat/>}
                </div>
            </div>
        </Dialog>
    </div>
  )
}

export default ChatDialog