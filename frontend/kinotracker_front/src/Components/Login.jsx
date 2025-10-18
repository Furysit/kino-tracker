import { useState} from "react";
import '../reset.css'

const BASE_URL = "/api"

export default function Login({ onLogin }) { 
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/authorization`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ login, password })
      });

      if (!response.ok) throw new Error("Not valid login or password");

      const data = await response.json();
      console.log("Токен:", data.access_token, data.ttl);

      onLogin(data.access_token, data.ttl);

    } catch (err) {
      setError(err.message);
    }
  };

    return(
    
        <div className="relative flex flex-row w-full h-screen bg-[url('https://i.pinimg.com/1200x/eb/1f/bc/eb1fbcb60f42c7a4200d4ad6e35ad812.jpg')] bg-center bg-cover">
  <div className="w-1/2 h-full flex items-center justify-center relative">
    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-800/60 to-transparent " />

    <div className="relative z-10 flex h-auto border rounded-2xl p-8 bg-white/10 backdrop-blur-md shadow-xl">
      <form onSubmit={handleSubmit} method="post" className="flex flex-col w-[300px] text-white">
        <div className="w-full mb-4 text-center">
          <h1 className="text-rose-300 text-xl font-bold ">Welcome back!</h1>
        </div>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="login"
            value={login}
            onChange={(e)=> setLogin(e.target.value)}
            className="border border-white/30 bg-white/10 rounded-xl w-full p-2 focus:outline-none focus:border-rose-300"
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-white/30 bg-white/10 rounded-xl w-full p-2 focus:outline-none focus:border-rose-300"
          />
            <div className="flex m-auto w-full mt-6">
            <button
            className="border border-rose-300 rounded-xl px-4 py-2 bg-rose-300 text-slate-900 font-semibold hover:bg-amber-300 transition"
            type="submit"
            >
                Enter
            </button>
        </div>
        </div>
      </form>
    </div>
  </div>

  <div className="w-1/2 h-full" />
</div>

    
)}

