import { Box, Divider, Typography ,styled} from '@mui/material'
import React from 'react'
import { emptyChatImage } from '../../../../constant/data'


const Component = styled(Box)`
background: #faf9fa;
padding: 30px 0;
text-align: center;
height: 86vh;
// overflow: hidden;
`

const Container = styled(Box)`
    padding: 0 200px;
`
const Image = styled('img')({
     width: 400,
     marginTop: 100,
})

const Title = styled(Typography)`
    font-size: 32px;
    margin: 25px 0 10px 0;
    font-family: inherit;
    font-weight: 300;
    color: #41525d;
`

const SubTitle = styled(Typography)`
   font-size: 14px;
   color: #667781;
   font-weight: 400;
   font-family: inherit;
`
const StyleDivider = styled(Divider)`
   margin: 40px 0;
   opacity: 0.4;
`
function EmptyChat() {
  return (
    <>
    <Component>

      <Container>
        <Image src={emptyChatImage} alt='whatsApp'/>
        <Title >Chat Web </Title>
        <SubTitle>Now send and recive messages without keeping you phone online.</SubTitle>
        <SubTitle>
          Use Chat App because it is end to end encrypted .  
        </SubTitle>
        <StyleDivider/>
    
      </Container>
    </Component>
    </>
  )
}

export default EmptyChat