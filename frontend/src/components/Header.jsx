import { useContext } from "react"
import Button from "./Button"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"

export const Header = () => {
    const { user } = useContext(UserContext)
    const Navigate = useNavigate();

    const onLogOut = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        Navigate("/login")
    }
    return (
        <div className="flex justify-between p-3 items-center bg-blue-100">
            <p>
                App
            </p>
            {
                user ?
                    <>
                        <p>{user.name}</p>
                        <Button title="Logout" onSubmit={onLogOut} />
                    </> : <div>
                        <Link to="/login">
                            <Button title="Login" />
                        </Link>
                    </div>
            }

        </div>
    )
}