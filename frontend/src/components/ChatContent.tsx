import React from 'react'
import UserAvatar from './UserAvatar'
import { EllipsisVertical, Mic, Paperclip, Phone, Search, Smile, Video } from 'lucide-react'

const ChatContent = () => {
  return (
    <div className='grid grid-rows-[80px_1fr_96px] h-full '>
      <ChatHeader />
      <div className='bg-surface/25'></div>
      <ChatFooter />
    </div>
  )
}

export default ChatContent


const ChatHeader = () => {
  return (
    <div className='flex items-center justify-between px-6 py-4 bg-surface'>
      <UserAvatar
        width={60}
        height={60}
        customLabel={
          <div className='flex flex-col   items-start'>
            <span className='text-[16px] font-bold'>User name</span>
            <span>Online</span>
          </div>
        }
        nameSide='right' />
      <div className='flex items-center gap-13'>
        <Phone />
        <Video />
        <Search />
        <EllipsisVertical />
      </div>
    </div>
  )


}


const ChatFooter = () => {
  return (
    <div className='flex items-center justify-between gap-10 bg-surface px-6 py-4 '>
      <div className='flex items-center gap-10'>
        <Smile />
        <Paperclip />
      </div>

      <input
      placeholder='Type a message or send a voice note'
      className='p-6 bg-background outline-none flex-1 rounded-xl '
      />

      <div className='flex items-center'>
        <Mic />
      </div>

    </div>
  )


}

