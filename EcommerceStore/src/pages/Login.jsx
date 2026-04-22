import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login () {
    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleLogin = () => {
        const fixedPassword = "12345";

        if(password === fixedPassword){
            navigate("/dashboard");
        }else{
            navigate("/login?error=wrongpassword")
        }
    };

    return (
        <div>
            <input type="password"
            placeholder="Password"
            onChange={(e)=>setPassword(e.target.value)} 
            className="border p-2"/>

            <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2">Login</button>
        </div>
    );
}

export default Login;