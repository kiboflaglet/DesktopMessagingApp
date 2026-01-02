import { useEffect, useState } from 'react'
import { useUserContext } from '../../../providers/userContext'
import UserAvatar from './UserAvatar'
import { type serviceResponse, type socketResponse, type Story, type User, type UserWithStories } from '../../../types'
import axios from 'axios'
import { API, SOCKET_EVENTS } from '../../../constants'
import AddStoryDialog from './AddStoryDialog'
import { useSocket } from '../../../providers/SocketProvider'

const Header = () => {

  const user = useUserContext()
  const socket = useSocket()

  const [userStories, setUserStories] = useState<UserWithStories[]>([])

  const fetchStories = () => {
    axios.get<serviceResponse<UserWithStories[]>>(API + "/stories")
      .then(res => {
        if (res.data.success) {
          setUserStories(res.data.responseObject)
        }
      })
  }

  const onStoryCreated = async () => {
    socket.on(SOCKET_EVENTS.STORY_CREATED, async (res: socketResponse<Story>) => {
      if (res.success) {
        const story = res.response
        const existingUser = userStories.find(u => u.id === story.userId)

        // Case 1: user already exists
        if (existingUser) {
          setUserStories(prev =>
            prev.map(user => {
              if (user.id !== story.userId) return user
              if (user.stories.some(s => s.id === story.id)) return user

              return {
                ...user,
                stories: [...user.stories, story]
              }
            })
          )
          return
        }

        // Case 2: user does not exist → fetch
        try {
          const res = await axios.get<serviceResponse<User | null>>(
            `${API}/users/${story.userId}`
          )

          if (!res.data.success) return

          const userData = res.data.responseObject

          if (userData) {

            setUserStories(prev => [
              ...prev,
              {
                ...userData,
                stories: [story]
              }
            ])
          }
        } catch (err) {
          console.error("Failed to fetch user", err)
        }
      }
    })
  }


  useEffect(() => {
    fetchStories()
    onStoryCreated()
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
              key={item.id}
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
