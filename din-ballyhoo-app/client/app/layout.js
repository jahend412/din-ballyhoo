import "./globals.css";

export const metadata = {
  title: "Din Ballyhoo",
  description: "This app is for fans of Din Ballyhoo.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
