import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Dashboard() {

  const navigate = useNavigate()

  const currentUser =
    JSON.parse(localStorage.getItem("currentUser")) || {}

  const [tasks, setTasks] = useState(() => {

    const savedTasks = localStorage.getItem(
      `tasks_${currentUser?.email}`
    )

    return savedTasks
      ? JSON.parse(savedTasks)
      : []
  })

  const [taskInput, setTaskInput] = useState("")
  const [priority, setPriority] = useState("Medium")
  const [dueDate, setDueDate] = useState("")

  const [editTaskId, setEditTaskId] = useState(null)
  const [editText, setEditText] = useState("")

  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("All")

  // SAVE TASKS
  useEffect(() => {

    localStorage.setItem(
      `tasks_${currentUser?.email}`,
      JSON.stringify(tasks)
    )

  }, [tasks])

  // AUTH CHECK
  useEffect(() => {

    const isLoggedIn = localStorage.getItem("isLoggedIn")

    if (!isLoggedIn) {
      navigate("/")
    }

  }, [])

  // ADD TASK
  const addTask = () => {

    if (taskInput.trim() === "") return

    const newTask = {
      id: Date.now(),
      title: taskInput,
      completed: false,
      priority,
      dueDate,
    }

    setTasks([...tasks, newTask])

    setTaskInput("")
    setPriority("Medium")
    setDueDate("")
  }

  // DELETE
  const deleteTask = (id) => {

    setTasks(
      tasks.filter((task) => task.id !== id)
    )
  }

  // COMPLETE
  const toggleTask = (id) => {

    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    )
  }

  // EDIT
  const startEdit = (task) => {

    setEditTaskId(task.id)

    setEditText(task.title)
  }

  // SAVE EDIT
  const saveEdit = (id) => {

    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, title: editText }
          : task
      )
    )

    setEditTaskId(null)

    setEditText("")
  }

  // FILTER TASKS
  const filteredTasks = tasks.filter((task) => {

    const matchesSearch =
      task.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

    if (filter === "Completed") {
      return matchesSearch && task.completed
    }

    if (filter === "Pending") {
      return matchesSearch && !task.completed
    }

    return matchesSearch
  })

  // STATS
  const completedTasks =
    tasks.filter((task) => task.completed).length

  const progress =
    tasks.length > 0
      ? (completedTasks / tasks.length) * 100
      : 0

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* LIVE ANIMATED BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">

        {/* ORB 1 */}
        <div className="absolute top-[-150px] left-[-100px] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[140px] animate-pulse"></div>

        {/* ORB 2 */}
        <div className="absolute bottom-[-200px] right-[-100px] w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[160px] animate-pulse"></div>

        {/* ORB 3 */}
        <div className="absolute top-[30%] left-[40%] w-[350px] h-[350px] bg-pink-500/10 rounded-full blur-[120px] animate-bounce"></div>

        {/* GRID */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        ></div>

      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10 px-8 py-5 flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            TaskFlow
          </h1>

          <p className="text-gray-400 mt-1">
            Welcome back, {currentUser?.name} 👋
          </p>

        </div>

        <button
          onClick={() => {

            localStorage.removeItem("isLoggedIn")

            navigate("/")

          }}
          className="bg-gradient-to-r from-red-500 to-pink-500 px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition duration-300 shadow-lg shadow-red-500/30"
        >
          Logout
        </button>

      </nav>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">

        {/* HERO */}
        <div className="mb-12">

          <h2 className="text-6xl font-black leading-tight">

            Stay Focused.
            <br />

            <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Stay Productive.
            </span>

          </h2>

          <p className="text-gray-400 text-xl mt-6 max-w-2xl">
            Organize your work with a premium productivity dashboard.
          </p>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-[35px] hover:scale-105 transition duration-300">

            <p className="text-gray-400">
              Total Tasks
            </p>

            <h3 className="text-6xl font-black mt-3">
              {tasks.length}
            </h3>

          </div>

          <div className="bg-green-500/10 border border-green-500/20 backdrop-blur-xl p-8 rounded-[35px] hover:scale-105 transition duration-300">

            <p className="text-green-300">
              Completed
            </p>

            <h3 className="text-6xl font-black mt-3">
              {completedTasks}
            </h3>

          </div>

          <div className="bg-purple-500/10 border border-purple-500/20 backdrop-blur-xl p-8 rounded-[35px] hover:scale-105 transition duration-300">

            <p className="text-purple-300">
              Progress
            </p>

            <h3 className="text-6xl font-black mt-3">
              {Math.round(progress)}%
            </h3>

          </div>

        </div>

        {/* PROGRESS */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-[35px] mb-12">

          <div className="flex justify-between mb-4">

            <h3 className="text-xl font-bold">
              Productivity Progress
            </h3>

            <span className="text-gray-400">
              {completedTasks}/{tasks.length} Completed
            </span>

          </div>

          <div className="w-full bg-gray-800 h-5 rounded-full overflow-hidden">

            <div
              style={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
            ></div>

          </div>

        </div>

        {/* ADD TASK */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-[35px] mb-12">

          <h3 className="text-3xl font-bold mb-8">
            Create New Task ✨
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">

            <input
              type="text"
              placeholder="Enter task..."
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              className="lg:col-span-2 bg-black/30 border border-white/10 p-5 rounded-2xl outline-none focus:border-blue-500"
            />

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="bg-black/30 border border-white/10 p-5 rounded-2xl"
            >
              <option className="text-black">Low</option>
              <option className="text-black">Medium</option>
              <option className="text-black">High</option>
            </select>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="bg-black/30 border border-white/10 p-5 rounded-2xl"
            />

          </div>

          <button
            onClick={addTask}
            className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-500 py-5 rounded-2xl text-xl font-bold hover:scale-[1.02] transition duration-300 shadow-xl shadow-blue-500/20"
          >
            Add Task 🚀
          </button>

        </div>

        {/* SEARCH */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-[35px] mb-12">

          <div className="flex flex-col lg:flex-row gap-5">

            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-black/30 border border-white/10 p-5 rounded-2xl outline-none"
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-black/30 border border-white/10 p-5 rounded-2xl"
            >
              <option className="text-black">All</option>
              <option className="text-black">Completed</option>
              <option className="text-black">Pending</option>
            </select>

          </div>

        </div>

        {/* EMPTY */}
        {filteredTasks.length === 0 && (

          <div className="text-center py-20">

            <h3 className="text-4xl font-bold text-gray-300">
              No Tasks Found 😴
            </h3>

            <p className="text-gray-500 mt-4 text-lg">
              Add tasks and begin your productivity journey.
            </p>

          </div>

        )}

        {/* TASKS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {filteredTasks.map((task) => (

            <div
              key={task.id}
              className="group relative overflow-hidden bg-white/5 border border-white/10 backdrop-blur-2xl p-8 rounded-[35px] hover:-translate-y-3 hover:border-blue-500/40 transition-all duration-500 shadow-2xl"
            >

              {/* HOVER GLOW */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>

              {/* TOP */}
              <div className="flex items-center justify-between relative z-10">

                <div
                  className={`w-4 h-4 rounded-full ${
                    task.completed
                      ? "bg-green-500 shadow-lg shadow-green-500/50"
                      : "bg-yellow-400 shadow-lg shadow-yellow-400/50"
                  }`}
                ></div>

                <span className="text-gray-500 text-sm font-medium">
                  #{task.id}
                </span>

              </div>

              {/* TITLE */}
              <div className="mt-6 relative z-10">

                {editTaskId === task.id ? (

                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full bg-black/30 border border-white/10 p-4 rounded-2xl text-2xl font-bold outline-none"
                  />

                ) : (

                  <h3
                    className={`text-4xl font-black leading-tight transition ${
                      task.completed
                        ? "line-through text-gray-500"
                        : "text-white"
                    }`}
                  >
                    {task.title}
                  </h3>

                )}

              </div>

              {/* DETAILS */}
              <div className="mt-8 flex flex-col gap-5 relative z-10">

                {/* PRIORITY */}
                <div>

                  <span
                    className={`px-5 py-3 rounded-full text-sm font-bold tracking-wide ${
                      task.priority === "High"
                        ? "bg-red-500/20 text-red-300 border border-red-500/30"
                        : task.priority === "Medium"
                        ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                        : "bg-green-500/20 text-green-300 border border-green-500/30"
                    }`}
                  >
                    ⚡ {task.priority} Priority
                  </span>

                </div>

                {/* DATE */}
                <div className="flex items-center gap-3 text-gray-400 text-lg">

                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                    📅
                  </div>

                  <span>
                    {task.dueDate || "No due date"}
                  </span>

                </div>

              </div>

              {/* BUTTONS */}
              <div className="flex flex-wrap gap-4 mt-10 relative z-10">

                {/* EDIT */}
                {editTaskId === task.id ? (

                  <button
                    onClick={() => saveEdit(task.id)}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 py-4 rounded-2xl font-bold hover:scale-105 transition duration-300 shadow-xl shadow-blue-500/20"
                  >
                    Save
                  </button>

                ) : (

                  <button
                    onClick={() => startEdit(task)}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 py-4 rounded-2xl font-bold hover:scale-105 transition duration-300 shadow-xl shadow-purple-500/20"
                  >
                    Edit
                  </button>

                )}

                {/* COMPLETE */}
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`flex-1 py-4 rounded-2xl font-bold hover:scale-105 transition duration-300 shadow-xl ${
                    task.completed
                      ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-black shadow-yellow-500/20"
                      : "bg-gradient-to-r from-green-500 to-emerald-500 shadow-green-500/20"
                    }`}
                >
                  {task.completed ? "Undo" : "Complete"}
                </button>

                {/* DELETE */}
                <button
                  onClick={() => deleteTask(task.id)}
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 py-4 rounded-2xl font-bold hover:scale-[1.02] transition duration-300 shadow-xl shadow-red-500/20"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}

export default Dashboard