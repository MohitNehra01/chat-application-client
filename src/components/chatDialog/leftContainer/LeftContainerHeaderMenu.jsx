import { MoreVert } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";
import React, { useContext, useState } from "react";
import { SocketContext } from "../../../context/SocketContext";
import { LogOut } from "../../../api/user.api";
import {AuthContext} from "../../../context/AccountProvider"

function LeftContainerHeaderMenu({setProfileDrawer}) {
  const [open, setOpen] = useState(null);
  const {account} = useContext(AuthContext)
  const {socket ,setActiveUsers} = useContext(SocketContext)

  const logoutHandler = ()=>{

    const res =  LogOut()
    if(res.success){
      socket.current.emit('remove_user' , account);
      socket.current.on('getUsers',users =>{
              setActiveUsers(users)
     })
     window.location.reload()
    }
   }
   const handleClose = () => {
    setOpen(null);
  };
  return (
    <>
      <MoreVert  onClick={(e) => setOpen(e.currentTarget)} className = "cursor-pointer" />
      <Menu
        open={Boolean(open)}
        anchorEl={open}
        keepMounted
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={handleClose}
        
      >
        <MenuItem className="text-[14px] pt-[15px] pr-[60px] pb-[5px] pl-[24px] text-[#4a4a4a]" onClick={()=>setProfileDrawer(true)}>
          Profile
        </MenuItem>
        <MenuItem onClick={logoutHandler}>LogOut</MenuItem>
      </Menu>
    </>
  );
}

export default LeftContainerHeaderMenu;
