import Button from "../components/Button";
import Input from "../components/Input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

export const Register = () => {
    const Navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
    });

    const registerUser = (e) => {
        e.preventDefault();

        axiosInstance.post('/auth/register', user).then((response) => {
            if (response.status === 201) {
                alert(response.data.message);
                Navigate('/login');
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
                <form >
                    <div className="flex flex-col w-full max-w-md space-y-7 m-5 p-15 bg-white border-indigo-300 rounded ">

                        <p className="text-xl font-semibold text-center">Create Account</p>

                        <Input name="Name" type="text" placeholder="Name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} required={true} />
                        <Input name="Email" type="email" placeholder="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} required={true} />
                        <Input name="Password" type="password" placeholder="Password" value={user.password} onChange={(e) => { setUser({ ...user, password: e.target.value }) }} required={true} />
                        <Input name="Confirm Password" type="password" placeholder="Confirm Password" value={user.confirmpassword} onChange={(e) => { setUser({ ...user, confirmpassword: e.target.value }) }} required={true} />

                        <Button type="submit" title="Register" onSubmit={(e) => registerUser(e)} />

                        <p className="text-sm text-center">User Already have an account?

                            <Link to="/login" className="text-blue-500 pl-1">
                                Login
                            </Link>
                        </p>

                    </div>

                </form>
            </div>
        </>
    );
};
