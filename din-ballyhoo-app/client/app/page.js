import Link from "next/link";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main>
      <Header />
      <h1>Home</h1>
      <p>Welcome to the Ballyhoo App</p>

      <p>
        <Link href="/login">Login</Link>
        <Link href="/signup">Signup</Link>
      </p>
    </main>
  );
}
