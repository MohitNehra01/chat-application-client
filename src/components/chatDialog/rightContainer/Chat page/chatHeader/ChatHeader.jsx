import styled from '@emotion/styled'
import { MoreVert, Search } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { useContext } from 'react'
import { SocketContext } from '../../../../../context/SocketContext'




const Header = styled(Box)`
height: 50px;
background : #ededed;
padding: 8px 16px;
display: flex;
align-items: center;

`
const Image = styled('img')({
    width: 40,
    height: 40,
    borderRadius:'50%',
    objectFit:'cover'
})

const Name = styled(Typography)`
    margin-left: 12px !important
`
const Status = styled(Typography)`
    margin-left: 12px !important;
    font-size: 12px;
    color: rgba(0,0,0,0.6)
`

const RightContainer = styled(Box)`
   margin-left: auto;

   & > svg {
    padding: 8px;
    font-size: 24px;
    color: #000;
    opacity: 0.6;
   }
`
function ChatHeader({personChatOpen}) {
     const {activeUsers} = useContext(SocketContext)
  return (
    <Header>
    <Image src = {personChatOpen.avatar.secure_url} alt = 'dp' />
   
    <Box>
        <Name>{personChatOpen.name}</Name>
        {activeUsers?.find(user => user._id === personChatOpen._id) ?(
        <div className='bg-green-600 w-2 h-2 rounded-[50%] absolute top-1'></div>
    ):''}
        <Status>{activeUsers?.find(user => user._id === personChatOpen._id)?'Online': "Offline"}</Status>
    </Box>
    <RightContainer>
        <Search style={{fontSize : "40px"}}/>
        <MoreVert style={{fontSize : "40px"}}/>
    </RightContainer>

 
</Header> 
  )
}

export default ChatHeader