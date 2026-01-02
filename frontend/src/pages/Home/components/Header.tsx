import { useEffect, useState } from 'react'
import { useUserContext } from '../../../providers/userContext'
import UserAvatar from './UserAvatar'
import { type serviceResponse, type UserStories } from '../../../types'
import axios from 'axios'
import { API } from '../../../constants'
import AddStoryDialog from './AddStoryDialog'

const Header = () => {

  const user = useUserContext()

  const [userStories, setUserStories] = useState<UserStories[]>([])

  const fetchStories = () => {
    axios.get<serviceResponse<UserStories[]>>(API + "/users/stories")
      .then(res => {
        if (res.data.success) {
          setUserStories(res.data.responseObject)
        }
      })
  }

  useEffect(() => {
    fetchStories()
  }, [])


  return (
    <div className="flex items-center w-full bg-surface  p-3 rounded-4xl rounded-bl-none rounded-br-none ">
      {/* LEFT (my story + user stories) */}
      <div className="flex gap-6 5 items-center min-w-0 flex-1">
        {/* Add Story */}
        <div className="flex h-full min-w-0 shrink-0 ">
          <AddStoryDialog />

          <div className="w-px ml-6.25 h-25 bg-seperator/25"></div>
        </div>
        {/* Users stories */}
        <div className="flex gap-6.5 overflow-x-auto min-w-0 w-70 flex-1 no-scrollbar ">
          {userStories.map(item => (
            <UserAvatar
              name={item?.fullName}
            />
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
