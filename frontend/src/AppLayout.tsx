import { Outlet, useLoaderData } from 'react-router'
import { UserProvider } from './providers/userContext'
import type { User } from './types'
import { SocketProvider } from './providers/SocketProvider'

const AppLayout = () => {

    const user = useLoaderData() as (User | null)

    return (
        <SocketProvider>
            <UserProvider user={user}>
                <Outlet />
            </UserProvider>
        </SocketProvider>
    )
}

export default AppLayout
