import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

function ForgotPassword() {

  const navigate = useNavigate()

  const [step, setStep] = useState(1)

  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")

  // SEND OTP
  const sendOTP = () => {

    const users =
      JSON.parse(localStorage.getItem("users")) || []

    const userExists = users.find(
      (user) => user.email === email
    )

    if (!userExists) {

      toast.error("Email not found")

      return
    }

    toast.success("Verification code sent ✨")

    setStep(2)
  }

  // VERIFY OTP
  const verifyOTP = () => {

    if (otp === "123456") {

      toast.success("OTP Verified 🚀")

      setStep(3)

    } else {

      toast.error("Invalid OTP")

    }
  }

  // RESET PASSWORD
  const resetPassword = () => {

    const users =
      JSON.parse(localStorage.getItem("users")) || []

    const updatedUsers = users.map((user) => {

      if (user.email === email) {

        return {
          ...user,
          password: newPassword,
        }
      }

      return user
    })

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    )

    toast.success("Password reset successful 🔥")

    navigate("/")
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden relative px-6 text-white">

      {/* GLOW */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 blur-[150px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 blur-[150px] rounded-full"></div>

      {/* CARD */}
      <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[35px] p-10 shadow-2xl">

        <div className="text-center mb-10">

          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-r from-blue-500 to-purple-600 text-4xl shadow-xl shadow-blue-500/30">
            🔐
          </div>

          <h1 className="text-5xl font-black mt-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Reset Password
          </h1>

          <p className="text-gray-400 mt-4 text-lg">
            Secure your account safely ✨
          </p>

        </div>

        {/* STEP 1 */}
        {step === 1 && (

          <div className="space-y-5">

            <input
              type="email"
              placeholder="Enter registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/30 border border-white/10 p-5 rounded-2xl outline-none focus:border-blue-500 transition"
            />

            <button
              onClick={sendOTP}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 py-5 rounded-2xl font-bold hover:scale-[1.02] transition"
            >
              Send Verification Code ✨
            </button>

          </div>

        )}

        {/* STEP 2 */}
        {step === 2 && (

          <div className="space-y-5">

            <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 p-4 rounded-2xl text-center">
              Demo OTP: 123456
            </div>

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full bg-black/30 border border-white/10 p-5 rounded-2xl outline-none focus:border-green-500 transition"
            />

            <button
              onClick={verifyOTP}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 py-5 rounded-2xl font-bold hover:scale-[1.02] transition"
            >
              Verify OTP 🚀
            </button>

          </div>

        )}

        {/* STEP 3 */}
        {step === 3 && (

          <div className="space-y-5">

            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-black/30 border border-white/10 p-5 rounded-2xl outline-none focus:border-purple-500 transition"
            />

            <button
              onClick={resetPassword}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-5 rounded-2xl font-bold hover:scale-[1.02] transition"
            >
              Reset Password 🔥
            </button>

          </div>

        )}

      </div>

    </div>
  )
}

export default ForgotPassword