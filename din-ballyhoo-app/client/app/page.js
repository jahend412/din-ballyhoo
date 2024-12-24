import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Home</h1>
      <p>Welcome to the Ballyhoo App</p>

      <p>
        <Link href="/about">About</Link>
      </p>
    </main>
  );
}
