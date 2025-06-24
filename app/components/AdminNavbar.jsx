import Link from "next/link";
import React from "react";

const AdminNavbar = ({ userName }) => {
  return (
    <div>
      <div className="navSection">
        <div className="title">
          <h2>Holiday Resort</h2>
        </div>

        <p>Welcome! {userName.charAt(0).toUpperCase() + userName.slice(1)} (ADMIN)</p>
        <Link
          href="/api/auth/signout"
          className="link"
          style={{ textDecoration: "none", color: "white" }}
        >
          <div
            style={{
              cursor: "pointer",
              padding: "8px 16px",
              backgroundColor: " rgb(68, 111, 175)",
              color: "#fff",
              borderRadius: "6px",
              fontWeight: "bold",
              display: "inline-block",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              transition: "background-color 0.3s ease",
            }}
          >
            Logout
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminNavbar;
