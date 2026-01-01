import { useUserContext } from '../../../providers/userContext'
import UserAvatar from './UserAvatar'

const Header = () => {

  const user = useUserContext()

  return (
    <div className="flex items-center w-full bg-surface  p-3 rounded-4xl rounded-bl-none rounded-br-none ">
      {/* LEFT (my story + user stories) */}
      <div className="flex gap-6 5 items-center min-w-0 flex-1">
        {/* Add Story */}
        <div className="flex h-full min-w-0 shrink-0 ">
          <UserAvatar
            name='Add story'
            badge="add"
          />
          <div className="w-px ml-6.25 h-25 bg-seperator/25"></div>
        </div>
        {/* Users strories */}
        <div className="flex gap-6.5 overflow-x-auto min-w-0 w-70 flex-1 no-scrollbar ">
          {Array.from({ length: 7 }).map(_item => (
            <UserAvatar/>
          ))}
        </div>
      </div>
      {/* RIGHT (My profile) */}
      <div className="shrink-0">
        <UserAvatar
        name={user?.username}
        />
      </div>
    </div>
  )
}

export default Header
