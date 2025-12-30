import React from 'react'
import UserAvatar from './UserAvatar'
import { Search } from 'lucide-react'

const ChatSidebar = () => {
    return (
        <div className="flex flex-col gap-4.5  p-3  bg-surface/25  h-[calc(100vh-160px)]  ">
            <SearchChat />
            <div className=' flex flex-col gap-4.5 overflow-y-auto no-scrollbar   '>
                {Array.from({ length: 10 }).map(_ => (
                    <ChatLink />
                ))}
            </div>
        </div>
    )
}

export default ChatSidebar


const ChatLink = () => {
    return (
        <>

            <div className='flex items-center gap-3 shrink-0'>
                <UserAvatar
                    width={60}
                    height={60}
                    hideName
                />
                <div className="flex flex-col justify-center gap-2 flex-1">
                    <span className='text-[16px] font-bold'>Some contact</span>
                    <span>Last message from chat</span>
                </div>

                <div className="flex flex-col gap-2 shrink-0 items-center">
                    <span>17:36</span>
                    <span className="inline-flex items-center justify-center aspect-square bg-badge-orange rounded-full outline outline-white shrink-0">
                        5
                    </span>
                </div>
            </div>

            <div className=' bg-seperator/35 h-px w-full'></div>
        </>
    )
}

const SearchChat = () => {
    return (
        <div className='flex gap-2 bg-surface p-2.5 rounded-2xl items-center'>
            <Search className='opacity-60 w-7 h-7 mx-4.25 ' />
            <input
                placeholder='Search or start new chat'
                className='bg-none w-full outline-none '
                type="text" />
        </div>
    )
}


