import React, { useContext } from 'react'
import { AuthContext } from '../../../../context/AccountProvider';
import { setConversion } from '../../../../api/user.api';

function ShowAllUsers(props) {
    const {user} = props;

    const {account, userChatOpen ,setUserChatOpen} = useContext(AuthContext)

    const getUserHandler = ()=>{
        if(Object.keys(userChatOpen).length){
            if(userChatOpen === user){
                setUserChatOpen({})
            }
            else{
                setUserChatOpen(user)
                setConversion({senderId: account._id , receiverId: user._id})
            }
        }
        else{
            
            setUserChatOpen(user)
            setConversion({senderId: account._id , receiverId: user._id})
        }
    }

  return (
    <div className='flex h-[70px] p-0 cursor-pointer items-center overflow-hidden' onClick={()=>getUserHandler()}>
        <div >
            <img src={user.avatar.secure_url} alt="user dp"  className="w-[100px]   rounded-[50%] py-0 px-[17px] object-cover"/>
        </div>
        <div className='font-semibold'>{user.name}</div>
    
    </div>
  )
}

export default ShowAllUsers