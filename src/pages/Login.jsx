import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = () => {

    const users =
      JSON.parse(localStorage.getItem("users")) || []

    const matchedUser = users.find(
      (user) =>
        user.email === email &&
        user.password === password
    )

    if (matchedUser) {

      localStorage.setItem(
        "currentUser",
        JSON.stringify(matchedUser)
      )

      localStorage.setItem("isLoggedIn", "true")

      navigate("/dashboard")

    } else {

      setError("Invalid email or password")

    }
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center overflow-hidden relative px-6">

      {/* GLOW */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[150px]"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[150px]"></div>

      {/* CARD */}
      <div className="relative z-10 w-full max-w-md">

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[35px] p-10 shadow-2xl">

          {/* LOGO */}
          <div className="text-center mb-10">

            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-r from-blue-500 to-purple-600 text-4xl font-black shadow-xl shadow-blue-500/30">
              ⚡
            </div>

            <h1 className="text-5xl font-black mt-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 text-transparent bg-clip-text">
              TaskFlow
            </h1>

            <p className="text-gray-400 mt-4 text-lg">
              Welcome back to your productivity hub 🚀
            </p>

          </div>

          {/* ERROR */}
          {error && (

            <div className="bg-red-500/10 border border-red-500/20 text-red-300 p-4 rounded-2xl mb-6 text-center">
              {error}
            </div>

          )}

          {/* INPUTS */}
          <div className="space-y-5">

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/30 border border-white/10 p-5 rounded-2xl outline-none focus:border-blue-500 transition placeholder:text-gray-500"
            />

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/30 border border-white/10 p-5 rounded-2xl outline-none focus:border-purple-500 transition placeholder:text-gray-500"
            />

            {/* FORGOT PASSWORD */}
            <div className="flex justify-end">

              <button
                onClick={() => navigate("/forgot-password")}
                className="text-blue-400 hover:text-purple-400 transition font-semibold"
              >
                Forgot Password?
              </button>

            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 py-5 rounded-2xl text-xl font-bold hover:scale-[1.02] transition duration-300 shadow-xl shadow-blue-500/30"
            >
              Login Now 🚀
            </button>

          </div>

          {/* FOOTER */}
          <p className="text-center text-gray-400 mt-8">

            Don’t have an account?{" "}

            <Link
              to="/register"
              className="text-blue-400 hover:text-purple-400 font-semibold transition"
            >
              Create Account
            </Link>

          </p>

        </div>

      </div>

    </div>
  )
}

export default Login