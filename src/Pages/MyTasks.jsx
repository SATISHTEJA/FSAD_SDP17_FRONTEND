import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderforStudent from "../Components/HeaderforStudent";
import Loader from "../Components/Loader"; // ✅ loader
import "../Styles/Dashboard.css";
import {
  LayoutDashboard,
  Search,
  FileText,
  ClipboardList,
  MessageSquare,
  User,
} from "lucide-react";

const MyTasks = () => {
  const navigate = useNavigate();

  const student =
    JSON.parse(localStorage.getItem("studentProfile")) || {};

  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ loader state

  // ✅ FETCH TASKS
  useEffect(() => {
    if (!student.id) {
      setLoading(false);
      return;
    }

    setLoading(true);

    fetch(`http://localhost:1305/api/tasks/student/${student.id}`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // 📊 FILTER
  const completedTasks = tasks.filter((t) => t.status === "COMPLETED");
  const pendingTasks = tasks.filter((t) => t.status !== "COMPLETED");

  const completionPercentage =
    tasks.length === 0
      ? 0
      : Math.round((completedTasks.length / tasks.length) * 100);

  // 🔥 OPEN MODAL
  const openSubmitModal = (task) => {
    setSelectedTask(task);
    setDescription("");
    setSelectedFile(null);
  };

  // 🔄 FILE → BASE64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  };

  // ✅ SUBMIT TASK
  const handleSubmitTask = async () => {
    if (!selectedTask) return;

    if (!description.trim()) {
      alert("Enter description");
      return;
    }

    try {
      let fileData = null;
      let fileName = null;

      if (selectedFile) {
        fileData = await convertToBase64(selectedFile);
        fileName = selectedFile.name;
      }

      await fetch(
        `http://localhost:1305/api/tasks/submit/${selectedTask.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            description,
            fileName,
            fileData,
          }),
        }
      );

      alert("Task submitted successfully!");
      setSelectedTask(null);

      // 🔄 REFRESH
      setLoading(true);
      fetch(`http://localhost:1305/api/tasks/student/${student.id}`)
        .then((res) => res.json())
        .then((data) => {
          setTasks(data);
          setLoading(false);
        });

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
      setLoading(false);
    }
  };
  const handleDeleteSubmission = async (taskId) => {
    if (!window.confirm("Delete your submission?")) return;

    try {
      await fetch(
        `http://localhost:1305/api/tasks/${taskId}`,
        {
          method: "PUT",
        }
      );
      setLoading(true);
      const res = await fetch(
        `http://localhost:1305/api/tasks/student/${student.id}`
      );
      const data = await res.json();
      setTasks(data);
      setLoading(false);

    } catch (err) {
      console.error(err);
      alert("Failed to delete submission");
    }
  };

  return (
    <>
      <div className="admin-layout" style={{ paddingTop: "70px" }}>

        {/* SIDEBAR */}
        <aside className="admin-sidebar">
          <button onClick={() => navigate("/student-dashboard")}>
            <LayoutDashboard size={18} /> Dashboard
          </button>

          <button onClick={() => navigate("/browse-internships")}>
            <Search size={18} /> Browse Internships
          </button>

          <button onClick={() => navigate("/myapplications")}>
            <FileText size={18} /> My Applications
          </button>

          <button className="active">
            <ClipboardList size={18} /> My Tasks
          </button>

          <button onClick={() => navigate("/feedback")}>
            <MessageSquare size={18} /> Feedback
          </button>

          <button onClick={() => navigate("/student-profile")}>
            <User size={18} /> Profile
          </button>
        </aside>

        {/* MAIN */}
        <main className="admin-main">
          <div className="page-header">
            <h1>My Tasks</h1>
          </div>

          {/* ✅ LOADER */}
          {loading ? (
            <Loader />
          ) : (
            <>
              {/* PROGRESS */}
              <div className="dashboard-card">
                <h3>Overall Task Completion</h3>
                <div className="progress-bar" style={{ margin: "10px 0" }}>
                  <div
                    className="progress-fill"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
                <strong>{completionPercentage}%</strong>
              </div>

              {/* PENDING TASKS */}
              {pendingTasks.length === 0 ? (
                <div className="dashboard-card">
                  <p>No pending tasks</p>
                </div>
              ) : (
                pendingTasks.map((task) => (
                  <div key={task.id} className="dashboard-card">
                    <h4>{task.title}</h4>
                    <p style={{ color: "#6b7280" }}>{task.title}</p>

                    <button
                      className="quick-action primary"
                      onClick={() => openSubmitModal(task)}
                    >
                      Submit Task
                    </button>
                  </div>
                ))
              )}

              {/* COMPLETED TASKS */}
              {completedTasks.map((task) => (
                <div
                  key={task.id}
                  className="dashboard-card"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  {/* LEFT SIDE */}
                  <div>
                    <h3>{task.internshipTitle}</h3>
                    <h4>{task.title}</h4>

                    <p style={{ color: "#16a34a", fontWeight: "bold" }}>
                      ✅ Completed
                    </p>

                    <p>
                      <strong>Description:</strong> {task.submissionDescription}
                    </p>

                    {task.submissionFileName && (
                      <a
                        href={`http://localhost:1305/api/tasks/file/${task.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="view-btn"
                      >
                        {task.submissionFileName}
                      </a>
                    )}
                  </div>

                  {/* RIGHT SIDE */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteSubmission(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </main>
      </div>

      {/* MODAL */}
      {selectedTask && (
        <div className="modal-overlay">
          <div className="modal-container">

            <h3>Submit Task</h3>
            <h4>{selectedTask.internshipTitle}</h4>
            <p><strong>Task:</strong> {selectedTask.title}</p>

            <label>Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label>Upload File (Optional)</label>
            <input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />

            {selectedFile && (
              <p className="resume-name">
                Selected: {selectedFile.name}
              </p>
            )}

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setSelectedTask(null)}
              >
                Cancel
              </button>

              <button
                className="submit-btn"
                onClick={handleSubmitTask}
              >
                Submit
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default MyTasks;