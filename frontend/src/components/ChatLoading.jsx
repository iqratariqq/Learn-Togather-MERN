import React from 'react'
import {LoaderIcon} from 'lucide-react'

const ChatLoading = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center p-4'>
        <LoaderIcon className='text-primary size-10 animate-spin'/> 
        <p className='mt-4 text-center text-lg font-mono'>Connecting to chat....</p>
      
    </div>
  )
}

export default ChatLoading
