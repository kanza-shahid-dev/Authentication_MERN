import Button from "../components/Button";
import Input from "../components/Input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const Login = () => {
    const Navigate = useNavigate();
    const { setUser } = useContext(UserContext)
    const [userInput, setUserInput] = useState({
        email: "",
        password: "",
    });

    const loginUser = async (e) => {
        console.log("loginUser");
        e.preventDefault();

        await axiosInstance.post('/auth/login', userInput).then((response) => {
            console.log("response", response);
            if (response.status === 200) {
                setUser(response.data)
                const userData = JSON.stringify(response.data)
                localStorage.setItem('user', userData);
                localStorage.setItem('token', response.data.token);

                Navigate('/home');
            } else {
                alert(response.data.message);
            }
        })
            .catch((error) => {
                alert(error.response.data.message);
            });
    }
    return (
        <>
            <div className="flex justify-center items-center min-h-screen border-indigo-300 bg-indigo-50 border-1 p-5">
                <form>
                    <div className="flex flex-col w-full max-w-md space-y-7 m-5 p-15 bg-white border-indigo-300 rounded ">

                        <p className="text-xl font-semibold text-center">Welcome Back</p>

                        <Input name="Email" type="email" placeholder="Email" value={userInput.email} onChange={(e) => setUserInput({ ...userInput, email: e.target.value })} required={true} />
                        <Input name="Password" type="password" placeholder="Password" value={userInput.password} onChange={(e) => { setUserInput({ ...userInput, password: e.target.value }) }} required={true} />

                        <Button type="submit" title="Login" onSubmit={(e) => loginUser(e)} />

                        <p className="text-sm text-center">
                            Don't have an account?
                            <Link to="/register" className="text-blue-500 pl-1">
                                Register
                            </Link>
                        </p>

                    </div>

                </form>
            </div>
        </>
    );
};
