import React from 'react'

import { Plus } from 'lucide-react'
import Avatar from '../../../assets/images/avatar.webp'
import { cn } from '../../../utils/ClassNameMergeHelper'

type AvatarProps = {
  nameSide?: "bottom" | "right",
  badge?: "none" | "add"
  hideName?: boolean
  width?: number
  height?: number
  customLabel?: React.ReactNode
  name?: string
}

const UserAvatar = (
  {
    nameSide = 'bottom',
    badge = "none",
    hideName = false,
    width = 80,
    height = 80,
    customLabel,
    name = ""
  }: AvatarProps
) => {
  return (
    <div className={cn('text-center flex gap-1',
      nameSide === 'bottom' && "flex-col",
      nameSide === 'right' && "flex-row items-end gap-4",
    )}>

      <div
        style={{
          width,
          height
        }}
        className=' shrink-0 relative'>
        <div className='rounded-[50%]  overflow-hidden '>
          <img className='' src={Avatar} />
        </div>
        {badge === 'add' && (
          <Plus className='absolute bottom-0 right-0 rounded-[50%] bg-badge-orange outline-white outline-2' />
        )}
      </div>
      {!hideName && (customLabel ?? <span className='font-bold'>{name}</span>)}
    </div>
  )
}

export default UserAvatar
