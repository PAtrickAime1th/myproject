import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // if you store JWT later
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm">
      <div className="container">

        {/* Back button */}
        <button
          className="btn btn-outline-dark me-2"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        {/* Logout button */}
        <button
          className="btn btn-dark me-auto"
          onClick={handleLogout}
        >
          Logout
        </button>

        {/* Logo */}
        <Link
          className="navbar-brand text-dark fw-bold me-3"
          to="/"
          style={{ textDecoration: "none" }}
        >
          Quiz App
        </Link>

        {/* User info */}
        {user && (
          <div className="d-flex align-items-center">
            <div
              className="bg-dark text-white rounded-circle d-flex justify-content-center align-items-center me-2"
              style={{ width: "35px", height: "35px" }}
            >
              {user?.username?.charAt(0).toUpperCase()}
            </div>

            <span className="fw-semibold text-dark">
              {user?.username}
            </span>
          </div>
        )}
      </div>
    </nav>
  );
}