import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Image src="/logo.png" alt="Ballyhoo App" width={150} height={150} />
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/signup">Signup</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
