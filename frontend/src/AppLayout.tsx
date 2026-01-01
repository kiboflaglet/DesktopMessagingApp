import { Outlet, useLoaderData } from 'react-router'
import { UserProvider } from './providers/userContext'
import type { User } from './types'

const AppLayout = () => {

    const user = useLoaderData() as (User | null)

    return (
        <UserProvider user={user}>
            <Outlet />
        </UserProvider>
    )
}

export default AppLayout
