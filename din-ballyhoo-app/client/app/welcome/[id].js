import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function WelcomePage() {
  const router = useRouter();
  const { id } = router.query; // The dynamic part of the route

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (id) {
      console.log("ID from route:", id);
      axios
        .get(`/api/v1/users/${id}`) // Ensure this matches the backend API route
        .then((response) => {
          setUser(response.data.data.user);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
    </div>
  );
}
