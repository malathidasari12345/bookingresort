import Link from "next/link";
import React from "react";

const UserNavigation = ({ userName }) => {
  return (
    <div className="navSection">
      <div className="title">
        <Link href="/" style={{ textDecoration: "none", color: "white" }}>
          <h2>Holiday Resort</h2>
        </Link>
      </div>

      <div className="contact">Call now : 123 456 789</div>
      <Link
        href="/invoice"
        className="link"
        style={{ textDecoration: "none", color: "white" }}
      >
        <div className="bookings">View Bookings </div>
      </Link>
      <p>
        Welcome
        <span
          style={{
            color: "white",
            marginLeft: "5px",
            fontSize: "1.2rem",
            border: "none",
          }}
        >
          {userName}!
        </span>
      </p>
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
  );
};

export default UserNavigation;
