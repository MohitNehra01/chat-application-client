import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AccountProvider";
import { getAllUsers } from "../../../../api/user.api";
import ShowAllUsers from "./ShowAllUsers";
import { SocketContext } from "../../../../context/SocketContext";

function ChatPersons() {
  const { setUsers, account } = useContext(AuthContext);
  const [filterUsers, setfilterUsers] = useState();
  const {socket , setActiveUsers } = useContext(SocketContext)

  useEffect(() => {
    const fetchAllUsers = async () => {
      const res = await getAllUsers();

      const arr =
        res &&
        res.users.filter(function (user) {
          if (user._id !== account._id) return user;
          else return "";
        });

      setUsers(arr);
      setfilterUsers(arr);
    };
    fetchAllUsers();
    // eslint-disable-next-line
  }, []);


  // socket 

  useEffect(()=>{
    socket.current.emit('addUsers' , account);
    socket.current.on('getUsers',users =>{
             setActiveUsers(users)
    })
    // eslint-disable-next-line
  },[account])

  return (
    <div className="space-y-[10px] h-[81vh] ">
      {filterUsers
         && filterUsers.map((user) => {
            return <div key={user._id}>
                <ShowAllUsers user = {user}/>
                <hr className="my-[10px] mr-0 ml-[7px]" />
            </div>;
          })
       }
    </div>
  );
}

export default ChatPersons;
