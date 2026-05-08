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

  // WORK REPORT STATES
  const [showReportModal, setShowReportModal] =
    useState(false)

  const [selectedTaskId, setSelectedTaskId] =
    useState(null)

  const [workReport, setWorkReport] =
    useState("")

  // SAVE TASKS
  useEffect(() => {

    localStorage.setItem(
      `tasks_${currentUser?.email}`,
      JSON.stringify(tasks)
    )

  }, [tasks, currentUser?.email])

  // AUTH CHECK
  useEffect(() => {

    const isLoggedIn =
      localStorage.getItem("isLoggedIn")

    if (!isLoggedIn) {
      navigate("/")
    }

  }, [navigate])

  // ADD TASK
  const addTask = () => {

    if (taskInput.trim() === "") return

    const newTask = {
      id: Date.now(),
      title: taskInput,
      completed: false,
      priority,
      dueDate,
      report: "",
      locked: false,
    }

    setTasks([...tasks, newTask])

    setTaskInput("")
    setPriority("Medium")
    setDueDate("")
  }

  // DELETE TASK
  const deleteTask = (id) => {

    setTasks(
      tasks.filter((task) => task.id !== id)
    )
  }

  // OPEN REPORT MODAL
  const openReportModal = (id) => {

    setSelectedTaskId(id)

    setShowReportModal(true)
  }

  // COMPLETE TASK WITH REPORT
  const completeTaskWithReport = () => {

    if (workReport.trim() === "") return

    const confirmed = window.confirm(
      "Once the work report is submitted, it cannot be changed again."
    )

    if (!confirmed) return

    setTasks(
      tasks.map((task) =>
        task.id === selectedTaskId
          ? {
              ...task,
              completed: true,
              report: workReport,
              locked: true,
            }
          : task
      )
    )

    setShowReportModal(false)

    setSelectedTaskId(null)

    setWorkReport("")
  }

  // EDIT
  const startEdit = (task) => {

    if (task.locked) return

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

  // FILTER
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
    <div className="min-h-screen bg-[#030712] text-white overflow-hidden relative">

      {/* LIVE BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-blue-500/30 rounded-full blur-[160px] animate-orb1"></div>

        <div className="absolute top-[20%] right-[-200px] w-[700px] h-[700px] bg-purple-500/30 rounded-full blur-[170px] animate-orb2"></div>

        <div className="absolute bottom-[-250px] left-[25%] w-[800px] h-[800px] bg-pink-500/20 rounded-full blur-[180px] animate-orb3"></div>

        <div className="absolute top-[45%] left-[50%] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[150px] animate-orb4"></div>

        {/* GRID */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        ></div>

        <div className="absolute inset-0 bg-black/40"></div>

      </div>

      {/* REPORT MODAL */}
      {showReportModal && (

        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] px-6">

          <div className="w-full max-w-xl bg-[#111827] border border-white/10 rounded-[35px] p-8 shadow-2xl">

            <h2 className="text-4xl font-black mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Submit Work Report
            </h2>

            <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 p-5 rounded-2xl mb-6">
              ⚠️ Once submitted, the work report cannot be edited or changed.
            </div>

            <textarea
              rows="6"
              value={workReport}
              onChange={(e) =>
                setWorkReport(e.target.value)
              }
              placeholder="Describe the completed work..."
              className="w-full bg-black/30 border border-white/10 rounded-2xl p-5 outline-none resize-none"
            ></textarea>

            <div className="flex gap-4 mt-6">

              <button
                onClick={completeTaskWithReport}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 py-4 rounded-2xl font-bold hover:scale-105 transition"
              >
                Final Submit ✅
              </button>

              <button
                onClick={() => {

                  setShowReportModal(false)

                  setWorkReport("")

                }}
                className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 py-4 rounded-2xl font-bold hover:scale-105 transition"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

      {/* CONTENT */}
      <div className="relative z-10">

        {/* NAVBAR */}
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10 px-8 py-5 flex justify-between items-center">

          <div>

            <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              TaskFlow
            </h1>

            <p className="text-gray-300 mt-1">
              Welcome back, {currentUser?.name} 👋
            </p>

          </div>

          <button
            onClick={() => {

              localStorage.removeItem("isLoggedIn")

              navigate("/")

            }}
            className="bg-gradient-to-r from-red-500 to-pink-500 px-6 py-3 rounded-2xl font-semibold"
          >
            Logout
          </button>

        </nav>

        {/* MAIN */}
        <div className="max-w-7xl mx-auto px-6 py-10">

          {/* HERO */}
          <div className="mb-12">

            <h2 className="text-6xl font-black leading-tight">

              Stay Focused.
              <br />

              <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                Stay Productive.
              </span>

            </h2>

          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

            <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-[35px]">

              <p className="text-gray-400">
                Total Tasks
              </p>

              <h3 className="text-6xl font-black mt-3">
                {tasks.length}
              </h3>

            </div>

            <div className="bg-green-500/10 border border-green-500/20 backdrop-blur-xl p-8 rounded-[35px]">

              <p className="text-green-300">
                Completed
              </p>

              <h3 className="text-6xl font-black mt-3">
                {completedTasks}
              </h3>

            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 backdrop-blur-xl p-8 rounded-[35px]">

              <p className="text-purple-300">
                Progress
              </p>

              <h3 className="text-6xl font-black mt-3">
                {Math.round(progress)}%
              </h3>

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
                onChange={(e) =>
                  setTaskInput(e.target.value)
                }
                className="lg:col-span-2 bg-black/30 border border-white/10 p-5 rounded-2xl outline-none"
              />

              <select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value)
                }
                className="bg-black/30 border border-white/10 p-5 rounded-2xl"
              >
                <option className="text-black">
                  Low
                </option>

                <option className="text-black">
                  Medium
                </option>

                <option className="text-black">
                  High
                </option>

              </select>

              <input
                type="date"
                value={dueDate}
                onChange={(e) =>
                  setDueDate(e.target.value)
                }
                className="bg-black/30 border border-white/10 p-5 rounded-2xl"
              />

            </div>

            <button
              onClick={addTask}
              className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-500 py-5 rounded-2xl text-xl font-bold"
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
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                className="flex-1 bg-black/30 border border-white/10 p-5 rounded-2xl outline-none"
              />

              <select
                value={filter}
                onChange={(e) =>
                  setFilter(e.target.value)
                }
                className="bg-black/30 border border-white/10 p-5 rounded-2xl"
              >
                <option className="text-black">
                  All
                </option>

                <option className="text-black">
                  Completed
                </option>

                <option className="text-black">
                  Pending
                </option>

              </select>

            </div>

          </div>

          {/* TASKS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {filteredTasks.map((task) => (

              <div
                key={task.id}
                className="group relative overflow-hidden bg-white/5 border border-white/10 backdrop-blur-2xl p-8 rounded-[35px] shadow-2xl"
              >

                {/* TOP */}
                <div className="flex items-center justify-between relative z-10">

                  <div
                    className={`w-4 h-4 rounded-full ${
                      task.completed
                        ? "bg-green-500"
                        : "bg-yellow-400"
                    }`}
                  ></div>

                  <span className="text-gray-500 text-sm">
                    #{task.id}
                  </span>

                </div>

                {/* TITLE */}
                <div className="mt-6 relative z-10">

                  {editTaskId === task.id ? (

                    <input
                      type="text"
                      value={editText}
                      onChange={(e) =>
                        setEditText(e.target.value)
                      }
                      className="w-full bg-black/30 border border-white/10 p-4 rounded-2xl text-2xl font-bold outline-none"
                    />

                  ) : (

                    <h3
                      className={`text-4xl font-black ${
                        task.completed
                          ? "line-through text-gray-500"
                          : "text-white"
                      }`}
                    >
                      {task.title}
                    </h3>

                  )}

                </div>

                {/* PRIORITY */}
                <div className="mt-8">

                  <span
                    className={`px-5 py-3 rounded-full text-sm font-bold ${
                      task.priority === "High"
                        ? "bg-red-500/20 text-red-300"
                        : task.priority === "Medium"
                        ? "bg-yellow-500/20 text-yellow-300"
                        : "bg-green-500/20 text-green-300"
                    }`}
                  >
                    ⚡ {task.priority} Priority
                  </span>

                </div>

                {/* DATE */}
                <div className="mt-6 text-gray-400">
                  📅 {task.dueDate || "No due date"}
                </div>

                {/* REPORT */}
                {task.report && (

                  <div className="mt-6 bg-black/30 border border-white/10 rounded-2xl p-5">

                    <h4 className="text-blue-400 font-bold mb-3">
                      Work Report
                    </h4>

                    <p className="text-gray-300">
                      {task.report}
                    </p>

                  </div>

                )}

                {/* LOCKED WARNING */}
                {task.locked && (

                  <div className="mt-6 bg-red-500/10 border border-red-500/20 text-red-300 p-4 rounded-2xl">

                    🔒 This task has been finalized and can no longer be modified.

                  </div>

                )}

                {/* BUTTONS */}
                <div className="flex flex-wrap gap-4 mt-10">

                  {!task.locked && (

                    <>
                      {editTaskId === task.id ? (

                        <button
                          onClick={() =>
                            saveEdit(task.id)
                          }
                          className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 py-4 rounded-2xl font-bold"
                        >
                          Save
                        </button>

                      ) : (

                        <button
                          onClick={() =>
                            startEdit(task)
                          }
                          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 py-4 rounded-2xl font-bold"
                        >
                          Edit
                        </button>

                      )}

                      {!task.completed && (

                        <button
                          onClick={() =>
                            openReportModal(task.id)
                          }
                          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 py-4 rounded-2xl font-bold"
                        >
                          Complete
                        </button>

                      )}
                    </>

                  )}

                  {/* DELETE */}
                  <button
                    onClick={() =>
                      deleteTask(task.id)
                    }
                    className="w-full bg-gradient-to-r from-red-500 to-pink-500 py-4 rounded-2xl font-bold"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  )
}

export default Dashboard