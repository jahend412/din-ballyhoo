import "./globals.css";
import { UserProvider } from "@/app/context/UserContext";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Din Ballyhoo",
  description: "This app is for fans of Din Ballyhoo.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <div className="pageWrapper">
            {children}
            <Footer />
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
