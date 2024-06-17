import { ArrowBack } from "@mui/icons-material";
import { Box, Drawer, Typography, styled } from "@mui/material";
import Profile from "./Profile";

const Header = styled (Box)`
     background: #008069;
     height: 107px;
     width: 100%;
     color: #ffffff;
     display: flex;
    
    
     
     & > svg , &  p{
        margin-top: auto;
        
        font-weight: 700;
        margin-bottom: 10px;
        padding-left: 10px
     }


`

const Component = styled(Box)`
       background: #ededed;
       height: 85%;
`
const Text = styled(Typography)`
   font-size:18px;
`
const drawerStyle = {
    left: 20,
    top: 17,
    height: '95%',
    width: '30%',
    boxShadow: 'none'

}

const InfoDrawer = (props) => {
  const { isProfileDrawer, setProfileDrawer,imageUrl, userName, about = "Available"  } = props
  return (
    <Drawer
      open={isProfileDrawer}
      onClose={() => setProfileDrawer(false)}
      PaperProps={{ sx: drawerStyle }}
      style={{ zIndex: 1300 }}
    >
      <Header>
        <ArrowBack onClick = {()=> {setProfileDrawer(false)}} style={{fontSize:"30px"}}/>
        <Text>Profile</Text>
      </Header>

      <Component>
        <Profile imageUrl={imageUrl} userName={userName} about={about} />
      </Component>
    </Drawer>
  );
};

export default InfoDrawer;
