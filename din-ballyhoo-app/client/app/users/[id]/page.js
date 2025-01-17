import React from "react";
import ProfilePage from "./ProfilePage";

export default async function Page({ params }) {
  const { id } = await params; // Access the dynamic route parameter

  return <ProfilePage id={id} />;
}
