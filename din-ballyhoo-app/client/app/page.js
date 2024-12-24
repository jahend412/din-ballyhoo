import Link from "next/link";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main>
      <Header />
      <h1>Home</h1>
      <p>Welcome to the Ballyhoo App</p>

      <p>
        <Link href="/about">About</Link>
      </p>
    </main>
  );
}
