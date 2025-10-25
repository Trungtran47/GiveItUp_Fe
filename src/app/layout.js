import { ToastContainer } from "react-toastify";
import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "GiveItUp",
  description: "Give It Up App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children} <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
