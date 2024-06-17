import React from 'react'
import LeftContainerHeader from './LeftContainerHeader'
import Search from './search/Search'
import ChatPersons from './chatpersons/ChatPersons'

function LeftContainer() {
  return (
    <div>
        <div className="header">
            <LeftContainerHeader />
        </div>
        <div className='search'>
          <Search />
        </div>
        <div className="chatPersons overflow-y-scroll">
           <ChatPersons />
        </div>
    </div>
  )
}

export default LeftContainer