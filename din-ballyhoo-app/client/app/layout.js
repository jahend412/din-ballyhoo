import "./globals.css";
import { UserProvider } from "@/app/context/UserContext";

export const metadata = {
  title: "Din Ballyhoo",
  description: "This app is for fans of Din Ballyhoo.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
