import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { setUser } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

function Auth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state)=>state.auth.user);
    const [isSignup,setIsSignup] = useState(false);

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const submit = async () => {

        try{

            if(isSignup){

            await API.post("/auth/signup",{
                name,
                email,
                password
            });

            alert("Signup successful");
            setIsSignup(false);

            }else{

            const res = await API.post("/auth/login",{
                email,
                password
            });

            dispatch(setUser(res.data.data));

            navigate("/dashboard");

            }

        }catch(err){
         alert(err.response?.data?.error || "Error");
        }

    };
    useEffect(()=>{
        if(user){
         navigate("/dashboard")
        }
    },[user])
    return (

        <div className="flex justify-center items-center h-screen bg-gray-100">

            <div className="bg-white p-8 rounded-lg shadow w-80">

                <h2 className="text-xl font-bold mb-4 text-center">

                    {isSignup ? "Signup" : "Login"}

                </h2>

                {isSignup && (

                    <input
                        className="border p-2 w-full mb-3"
                        placeholder="Name"
                        onChange={(e)=>setName(e.target.value)}
                    />

                )}

                <input
                    className="border p-2 w-full mb-3"
                    placeholder="Email"
                    onChange={(e)=>setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="border p-2 w-full mb-3"
                    placeholder="Password"
                    onChange={(e)=>setPassword(e.target.value)}
                />

                <button
                    onClick={submit}
                    className="bg-blue-500 text-white w-full p-2 rounded"
                >

                {isSignup ? "Signup" : "Login"}

                </button>

                <p
                    className="text-sm text-center mt-4 cursor-pointer text-blue-500"
                    onClick={()=>setIsSignup(!isSignup)}
                >

            {isSignup ? "Already have account? Login" : "Create account"}

            </p>

            </div>

        </div>

    );

}

export default Auth;