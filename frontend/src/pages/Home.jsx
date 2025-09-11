import { useContext } from "react"
import { Header } from "../components/Header"
import { UserContext } from "../context/userContext"

function Home() {
    const { user } = useContext(UserContext)
    console.log("user from home", user)
    return (
        <>
            <Header />
            Home
        </>
    )
}

export default Home