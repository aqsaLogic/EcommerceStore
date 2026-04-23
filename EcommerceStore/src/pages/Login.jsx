import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = () => {

    const fixedPassword = "12345";

    if(password === fixedPassword){
      navigate("/dashboard");
    }else{
      navigate("/login?error=wrongpassword");
    }
  };

  return (
    <div className="flex flex-col items-center mt-20 gap-4">

      <input
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
        className="border p-2"
      />  <br />  <br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)}
        className="border p-2"
      />  <br />  <br />

      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Login
      </button>

    </div>
  );
}

export default Login;
