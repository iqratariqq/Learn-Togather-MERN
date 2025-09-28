import { VideoIcon } from 'lucide-react'
import React from 'react'

const CallButton = ({handleVideoCall}) => {
  return (
    <div className='absolute  border-b top-0 mx-auto p-3 flex flex-center justify-end w-full '>
        <button className='btn btn-success btn-sm text-white ' onClick={handleVideoCall}> 
            <VideoIcon className='size-6'/>

        </button>
      
    </div>
  )
}

export default CallButton
