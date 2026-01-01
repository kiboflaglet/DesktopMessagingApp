import axios, { AxiosError } from "axios"
import { LoaderCircle } from "lucide-react"
import { useState, type FormEvent, type InputHTMLAttributes } from "react"
import { Link, useNavigate } from "react-router"
import { type User, type serviceResponse } from "../../types"
import { cn } from "../../utils/ClassNameMergeHelper"

const API = 'http://localhost:3000'

const Login = () => {

    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const submitForm = (event: FormEvent<HTMLFormElement>) => {
        if (loading) return
        setLoading(true)
        event.preventDefault()

        if (username.length < 1 && password.length < 8) {
            setLoading(false);
            return
        }

        axios.post<serviceResponse<User>>(`${API}/users/auth/login`, { username, password }, {
            withCredentials: true
        })
            .then(res => {

                console.log({ res })

                if (res.data.success) {

                    navigate("/")
                }
            })
            .catch((res: AxiosError<serviceResponse<User>>) => {
                console.log({ error: res })
                setError(res.response?.data?.message ?? "Unknown error")
            })
            .finally(() => {
                setLoading(false)
            })




    }

    return (
        <div className="h-[calc(100vh-var(--padding-layout)*2)]  flex justify-center items-center">
            <div className="flex flex-col gap-10 w-100 ">
                <div className="flex flex-col gap-3">
                    <span className="text-4xl font-bold">Sign in</span>
                    <span className="text-lg opacity-55">Please login to continue your app</span>
                    {error && (<span className="text-lg opacity-55 text-red-400">{error}</span>)}
                </div>
                <form className="flex flex-col gap-5" onSubmit={submitForm}>

                    <Input
                        id="username"
                        label="Username"
                        type="text"
                        onChange={(event) => {
                            setUsername(event.target.value)
                        }}
                    />

                    <Input
                        id="password"
                        label="Password"
                        type="password"
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }}
                    />

                    <button
                        disabled={loading}
                        type="submit"
                        className="rounded-lg p-4 text-lg disabled:bg-blue-800 disabled:cursor-not-allowed bg-blue-600 cursor-pointer hover:bg-blue-700 transition-all flex justify-center items-center">
                        {loading ? <LoaderCircle className="animate-spin w-7 h-7" /> : "Sign in"}
                    </button>
                </form>
                <div className="text-center text-lg">Need an account? <Link className="text-blue-400 font-bold" to="/"> Create one</Link></div>
            </div>
        </div>
    )
}

export default Login
type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    id: string;
    label: string;
};

const Input = ({ id, label, className, type = "text", ...props }: InputProps) => {
    return (
        <div className="relative w-full">
            <input
                id={id}
                type={type}
                placeholder=" "
                className={cn(
                    "peer w-full rounded-xl border border-white/45 text-lg p-4",
                    "focus:outline-none focus:border-blue-500",
                    className
                )}
                {...props}
            />

            <label
                htmlFor={id}
                className={cn(
                    "absolute left-3 px-2 bg-background text-white/55 transition-all cursor-text",
                    "top-1/2 -translate-y-1/2 text-lg",
                    "peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-sm peer-focus:text-blue-500",
                    "peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-sm",
                )}
            >
                {label}
            </label>
        </div>
    );
};


