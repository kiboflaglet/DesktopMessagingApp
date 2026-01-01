import axios from 'axios'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router'
import AppLayout from './AppLayout.tsx'
import { API } from './constants.ts'
import './index.css'
import App from './pages/Home/App.tsx'
import Login from './pages/Login/Login.tsx'
import { type serviceResponse, type User } from './types.ts'



// data mode (middlewares not working in declarative mode)
const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        loader: authLoader,
        children: [
            {
                index: true,
                element: <App />
            }
        ]
    },
    {
        path: "/login",
        element: <Login />,
        loader: loginLoader
    },
])

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)


async function authLoader() {
    try {
        const res = await axios.get<serviceResponse<User | null>>(API + "/users/auth/me", {
            withCredentials: true,
        });

        if (!res.data?.success) {
            return redirect("/login");
        }

        return res.data.responseObject; 
    } catch {
        return redirect("/login");
    }
}

async function loginLoader() {
    try {
        const res = await axios.get(API + "/users/auth/me", {
            withCredentials: true
        })

        if (res.data?.success) {
            return redirect("/")
        }
        return null;
    } catch (error) {
        return null;
    }
}
