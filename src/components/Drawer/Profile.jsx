import { Box, Typography, styled } from "@mui/material";
const ImageContainer = styled(Box)`
  display: flex;
  justify-content: center;
`;
const Image = styled("img")({
  width: 200,
  height: 200,
  borderRadius: "50%",
  padding: "25px 0",
});

const BoxWrapper = styled(Box)`
  background: #ffffff;
  padding: 12px 30px 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);

`;
const Profile = ({imageUrl, userName, about}) => {
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
  return (
    <>

      <ImageContainer>
        <Image src={imageUrl} alt="" />
      </ImageContainer>
      <BoxWrapper>
        <Typography style={{margin : "13px 0" , color: "#009688" , fontWeight:"200"}}>Your name</Typography>
        <Typography style={{margin : "14px 0", color: "#483848"}}>{capitalizeFirstLetter(userName)}</Typography>
      </BoxWrapper>
      <BoxWrapper>
        <Typography style={{margin : "13px 0" , color: "#009688" , fontWeight:"200"}}>About</Typography>
        <Typography style={{margin : "14px 0", color: "#483848"}}>{capitalizeFirstLetter(about)}</Typography>
      </BoxWrapper>

      
    </>
  );
};

export default Profile;
