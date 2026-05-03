import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Dashboard.css";
import HeaderforStudent from "../Components/HeaderforStudent";
import Loader from "../Components/Loader";
import {
  LayoutDashboard,
  Search,
  FileText,
  ClipboardList,
  MessageSquare,
  User,
  Clock,
  TrendingUp,
  CheckCircle,
  ListTodo,
} from "lucide-react";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const [student, setStudent] = useState({});
  const [approvedInternships, setApprovedInternships] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = async () => {
    const loggedStudent =
      JSON.parse(localStorage.getItem("studentProfile")) || {};

    setStudent(loggedStudent);

    if (!loggedStudent.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const appRes = await fetch(
        `https://fsad-sdp17-backend-2.onrender.com/api/applications/student/${loggedStudent.id}`
      );
      const applications = await appRes.json();

      const approved = applications.filter(
        (app) => app.status?.toLowerCase() === "approved"
      );

      setApprovedInternships(approved);

      const taskRes = await fetch(
        `https://fsad-sdp17-backend-2.onrender.com/api/tasks/student/${loggedStudent.id}`
      );
      const taskData = await taskRes.json();

      setTasks(taskData);

      setLoading(false);
    } catch (error) {
      console.error("Dashboard error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();

    window.addEventListener("focus", loadDashboardData);

    return () => {
      window.removeEventListener("focus", loadDashboardData);
    };
  }, []);

  const completed = tasks.filter(
    (t) =>
      t.status?.toLowerCase() === "completed" ||
      t.status?.toLowerCase() === "submitted"
  ).length;

  const inProgress = tasks.filter(
    (t) => t.status?.toLowerCase() === "in progress"
  ).length;

  const pending = tasks.filter(
    (t) => t.status?.toLowerCase() === "pending"
  ).length;

  const totalTasks = tasks.length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completed / totalTasks) * 100);

  return (
    <>

      <div className="admin-layout" style={{ paddingTop: "70px" }}>
        <aside className="admin-sidebar">
          <button className="active" onClick={() => navigate("/student-dashboard")}>
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button onClick={() => navigate("/browse-internships")}>
            <Search size={18} />
            Browse Internships
          </button>

          <button onClick={() => navigate("/myapplications")}>
            <FileText size={18} />
            My Applications
          </button>

          <button onClick={() => navigate("/mytasks")}>
            <ClipboardList size={18} />
            My Tasks
          </button>

          <button onClick={() => navigate("/feedback")}>
            <MessageSquare size={18} />
            Feedback
          </button>

          <button onClick={() => navigate("/student-profile")}>
            <User size={18} />
            Profile
          </button>
        </aside>

        <main className="admin-main">
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="page-header">
                <h1>
                  Welcome Back, {student.name || "Student"}!
                </h1>
                <p>Here's an overview of your internship progress.</p>
              </div>

              {approvedInternships.length > 0 &&
                approvedInternships.map((intern, index) => (
                  <section key={index} className="dashboard-card">
                    <h2>Current Internship</h2>
                    <h3>{intern.internshipTitle}</h3>
                    <p>{intern.companyName}</p>

                    <div
                      style={{
                        display: "flex",
                        gap: "40px",
                        marginTop: "15px",
                      }}
                    >
                      <div>
                        <strong>Start Date</strong>
                        <p>{intern.appliedDate || "N/A"}</p>
                      </div>

                      <div>
                        <strong>Duration</strong>
                        <p>{intern.duration || "N/A"}</p>
                      </div>

                      <div>
                        <strong>Stipend</strong>
                        <p>{intern.stipend || "N/A"}</p>
                      </div>
                    </div>
                  </section>
                ))}

              <section className="stats-grid" onClick={() => navigate("/mytasks")} style={{cursor: "pointer"}}>
                <div className="stat-card">
                  <div className="stat-left">
                    <p>Overall Progress</p>
                    <h3>{progress}%</h3>
                  </div>
                  <TrendingUp className="stat-icon blue" size={28} />
                </div>

                <div className="stat-card">
                  <div className="stat-left">
                    <p>Tasks Completed</p>
                    <h3>{completed}</h3>
                  </div>
                  <CheckCircle className="stat-icon green" size={28} />
                </div>

                <div className="stat-card">
                  <div className="stat-left">
                    <p>In Progress</p>
                    <h3>{inProgress}</h3>
                  </div>
                  <Clock className="stat-icon orange" size={28} />
                </div>

                <div className="stat-card">
                  <div className="stat-left">
                    <p>Pending Tasks</p>
                    <h3>{pending}</h3>
                  </div>
                  <ListTodo className="stat-icon purple" size={28} />
                </div>
              </section>

              <section className="dashboard-card">
                <h2>Progress Overview</h2>

                <div style={{ marginTop: "15px" }}>
                  <div
                    style={{
                      height: "10px",
                      background: "#e5e7eb",
                      borderRadius: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: `${progress}%`,
                        height: "100%",
                        background: "#0f172a",
                        borderRadius: "10px",
                      }}
                    />
                  </div>

                  <p style={{ marginTop: "10px" }}>
                    {completed} of {totalTasks} tasks completed
                  </p>
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default StudentDashboard;