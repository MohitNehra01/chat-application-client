import { Box, InputBase } from '@mui/material'

import styled from '@emotion/styled'
import { AttachFile,  EmojiEmotionsOutlined, Mic } from '@mui/icons-material'
import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';

const Container = styled(Box)`
height: 55px;
// background: #ededed;
position: sticky;
bottom: 0;
z-index: 22;
background-color: #ffffff;
display:flex;
width: 100%;
align-items: center;
padding: 0 15px;

&> *{
    margin: 5px;
    color: #919191;
}
`

const Search = styled(Box)`
    background-color: #ffffff;
    // border-radius: 18%;
    height: 100%;
    display:flex;
    width: calc(94% - 100px )
`
const InputStyle = styled(InputBase)`
          width: 80%;
          padding: 20px;
          font-size: 14px;
`

const ClipIcon = styled(AttachFile)`
     transform: rotate(40deg)
`

function ChatFooter({sendText , setValue , value , file , setFile }) {
  const [emojiOpen , setEmojiOpen]  = useState(false)
   
  const onFileChange = (e)=>{
     setFile(e.target?.files[0]);
     setValue(e.target?.files[0]?.name)
  }

  return (
    <Container>
      <EmojiPicker open={emojiOpen} onEmojiClick={(e)=>{setValue(value + e.emoji) ; setEmojiOpen(false)}}/>
        <EmojiEmotionsOutlined className='cursor-pointer' onClick={()=>{setEmojiOpen(!emojiOpen)}}/>
        <label htmlFor='fileinput'>
        <ClipIcon />
        </label>
        
        <input type='file' id='fileinput' style={{display:"none"}} className='absolute top-0' onChange={(e)=> onFileChange(e)}/>

        <Search >
            <InputStyle  placeholder='Type a message' onChange={(e)=>{setValue(e.target.value)}}  onKeyDown={(e)=>{sendText(e) }} value={value} />
        </Search>
        <Mic />
    </Container>
  )
}

export default ChatFooter