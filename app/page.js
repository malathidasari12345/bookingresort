import React from "react";
import DBConnection from "./utils/config/db";
import { auth } from "./auth";
import UserNavigation from "./components/UserNavigation";
import AdminPage from "./Admin/page";
import ProductCollection from "./components/ProductCollection";
import BannerCarousel from "./components/Banner";
import { redirect } from "next/navigation";
const HomePage = async () => {
  const session = await auth();
  await DBConnection();
  if (!session) {
    redirect("/login");
  }
  console.log(session);
  console.log("role:", session.role);

  console.log("username:", session.username);

  const userName = session.username;
  return (
    <div>
      {session.role === "user" && (
        <>
          <UserNavigation userName={userName} />

          <BannerCarousel />
          <br></br>
          <br></br>
          <ProductCollection />
        </>
      )}
      {session.role === "Admin" && <AdminPage userName={userName} />}
    </div>
  );
};

export default HomePage;
