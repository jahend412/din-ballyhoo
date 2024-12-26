import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="home-container">
      <Image
        className="home-logo"
        src="/logo.png"
        alt="Ballyhoo App"
        layout="fill"
        objectFit="contain"
      />
      <div className="home-links">
        <Link href="/login" className="home-link">
          Log In
        </Link>
        <Link href="/signup" className="home-link">
          Sign Up
        </Link>
      </div>
    </main>
  );
}
