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

  useEffect(() => {

    localStorage.setItem(
      `tasks_${currentUser?.email}`,
      JSON.stringify(tasks)
    )

  }, [tasks])

  useEffect(() => {

    const isLoggedIn = localStorage.getItem("isLoggedIn")

    if (!isLoggedIn) {
      navigate("/")
    }

  }, [])

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

  const deleteTask = (id) => {

    setTasks(
      tasks.filter((task) => task.id !== id)
    )
  }

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

  const startEdit = (task) => {

    setEditTaskId(task.id)

    setEditText(task.title)
  }

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

  const completedTasks =
    tasks.filter((task) => task.completed).length

  const progress =
    tasks.length > 0
      ? (completedTasks / tasks.length) * 100
      : 0

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* GLOW EFFECTS */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-[140px] opacity-20"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-[140px] opacity-20"></div>

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
            Organize your life with a modern productivity system built for creators and developers.
          </p>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-3xl hover:scale-105 transition duration-300">

            <p className="text-gray-400">
              Total Tasks
            </p>

            <h3 className="text-6xl font-black mt-3">
              {tasks.length}
            </h3>

          </div>

          <div className="bg-green-500/10 border border-green-500/20 backdrop-blur-xl p-8 rounded-3xl hover:scale-105 transition duration-300">

            <p className="text-green-300">
              Completed
            </p>

            <h3 className="text-6xl font-black mt-3">
              {completedTasks}
            </h3>

          </div>

          <div className="bg-purple-500/10 border border-purple-500/20 backdrop-blur-xl p-8 rounded-3xl hover:scale-105 transition duration-300">

            <p className="text-purple-300">
              Progress
            </p>

            <h3 className="text-6xl font-black mt-3">
              {Math.round(progress)}%
            </h3>

          </div>

        </div>

        {/* PROGRESS BAR */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-3xl mb-12">

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
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-3xl mb-12">

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
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-3xl mb-12">

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

        {/* EMPTY STATE */}
        {filteredTasks.length === 0 && (

          <div className="text-center py-20">

            <h3 className="text-4xl font-bold text-gray-300">
              No Tasks Found 😴
            </h3>

            <p className="text-gray-500 mt-4 text-lg">
              Add some tasks and start your productivity journey.
            </p>

          </div>

        )}

        {/* TASKS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {filteredTasks.map((task) => (

            <div
              key={task.id}
              className="bg-white/5 border border-white/10 backdrop-blur-xl p-7 rounded-3xl hover:-translate-y-2 hover:border-blue-500/30 transition duration-300 shadow-xl"
            >

              {/* TITLE */}
              {editTaskId === task.id ? (

                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full bg-black/30 border border-white/10 p-4 rounded-2xl"
                />

              ) : (

                <h3
                  className={`text-3xl font-bold leading-snug ${
                    task.completed
                      ? "line-through text-gray-500"
                      : "text-white"
                  }`}
                >
                  {task.title}
                </h3>

              )}

              {/* PRIORITY */}
              <div className="mt-6">

                <span
                  className={`px-5 py-2 rounded-full text-sm font-bold ${
                    task.priority === "High"
                      ? "bg-red-500"
                      : task.priority === "Medium"
                      ? "bg-yellow-400 text-black"
                      : "bg-green-500"
                  }`}
                >
                  {task.priority} Priority
                </span>

              </div>

              {/* DATE */}
              <p className="text-gray-400 mt-5 text-lg">
                📅 {task.dueDate || "No due date"}
              </p>

              {/* BUTTONS */}
              <div className="flex flex-wrap gap-3 mt-8">

                {editTaskId === task.id ? (

                  <button
                    onClick={() => saveEdit(task.id)}
                    className="bg-blue-500 hover:bg-blue-600 px-5 py-3 rounded-2xl font-semibold transition"
                  >
                    Save
                  </button>

                ) : (

                  <button
                    onClick={() => startEdit(task)}
                    className="bg-purple-500 hover:bg-purple-600 px-5 py-3 rounded-2xl font-semibold transition"
                  >
                    Edit
                  </button>

                )}

                <button
                  onClick={() => toggleTask(task.id)}
                  className={`px-5 py-3 rounded-2xl font-semibold transition ${
                    task.completed
                      ? "bg-yellow-400 text-black"
                      : "bg-green-500"
                  }`}
                >
                  {task.completed ? "Undo" : "Complete"}
                </button>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-2xl font-semibold transition"
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