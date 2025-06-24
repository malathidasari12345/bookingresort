import React from "react";
import { auth } from "../auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import AdminNavbar from "../components/AdminNavbar";
import AddProduct from '../components/AddProduct'

const AdminPage = async ({ userName }) => {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      {session.role === "Admin" ? (
        <>
          <AdminNavbar userName={userName} />
          <AddProduct />
        </>
      ) : (
        <div align="center">
          <h1>Not Authorized</h1>
          <Link
            href="/login"
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
              Login
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
