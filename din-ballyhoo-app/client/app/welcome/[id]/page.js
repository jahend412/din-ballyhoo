import WelcomePage from "./WelcomePage";
import React from "react";

export default async function Page({ params }) {
  const { id } = await params; // Access the dynamic route parameter

  return <WelcomePage id={id} />;
}
