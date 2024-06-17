import React, { useContext,useState } from 'react'
import { AuthContext } from '../../../context/AccountProvider'
import LeftContainerHeaderMenu from './LeftContainerHeaderMenu'
import InfoDrawer from '../../Drawer/InfroDrawer'

function LeftContainerHeader() {
    const {account} = useContext(AuthContext)
    const [isProfileDrawer , setProfileDrawer] = useState(false)
  return (
    <div className='h-[50px] bg-[#ededed] py-[8px] px-[16px] flex items-center overflow-hidden'>
         <div className="dpImage ">
            <img src={account.avatar.secure_url} alt="dp"  className='border border-black rounded-[50%] h-[40px] cursor-pointer' onClick={()=>setProfileDrawer(true)}/>
         </div>
         <div className="setting ml-auto">
            <LeftContainerHeaderMenu setProfileDrawer= {setProfileDrawer} />
         </div>

         <InfoDrawer imageUrl={account.avatar.secure_url} userName={account.name} setProfileDrawer= {setProfileDrawer} isProfileDrawer = {isProfileDrawer}/>
    </div>
  )
}

export default LeftContainerHeader