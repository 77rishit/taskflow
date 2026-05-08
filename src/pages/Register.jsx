import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Register() {

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = () => {

    const existingUsers =
      JSON.parse(localStorage.getItem("users")) || []

    const userExists = existingUsers.find(
      (user) => user.email === email
    )

    if (userExists) {
      alert("User already exists")
      return
    }

    const newUser = {
      name,
      email,
      password,
    }

    existingUsers.push(newUser)

    localStorage.setItem(
      "users",
      JSON.stringify(existingUsers)
    )

    alert("Registration Successful!")

    navigate("/")
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center overflow-hidden relative px-6">

      {/* GLOW */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-500/20 rounded-full blur-[150px]"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[150px]"></div>

      {/* CARD */}
      <div className="relative z-10 w-full max-w-md">

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[35px] p-10 shadow-2xl">

          {/* LOGO */}
          <div className="text-center mb-10">

            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-r from-green-500 to-blue-600 text-4xl font-black shadow-xl shadow-green-500/30">
              ✨
            </div>

            <h1 className="text-5xl font-black mt-6 bg-gradient-to-r from-green-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text">
              Join TaskFlow
            </h1>

            <p className="text-gray-400 mt-4 text-lg">
              Create your workspace and stay productive ⚡
            </p>

          </div>

          {/* INPUTS */}
          <div className="space-y-5">

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black/30 border border-white/10 p-5 rounded-2xl outline-none focus:border-green-500 transition placeholder:text-gray-500"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/30 border border-white/10 p-5 rounded-2xl outline-none focus:border-blue-500 transition placeholder:text-gray-500"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/30 border border-white/10 p-5 rounded-2xl outline-none focus:border-cyan-500 transition placeholder:text-gray-500"
            />

            <button
              onClick={handleRegister}
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 py-5 rounded-2xl text-xl font-bold hover:scale-[1.02] transition duration-300 shadow-xl shadow-green-500/30"
            >
              Create Account ✨
            </button>

          </div>

          {/* FOOTER */}
          <p className="text-center text-gray-400 mt-8">

            Already have an account?{" "}

            <Link
              to="/"
              className="text-green-400 hover:text-blue-400 font-semibold transition"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  )
}

export default Register