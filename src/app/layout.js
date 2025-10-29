import { ToastContainer } from "react-toastify";
import "./globals.css";
import { Providers } from "./providers";
import CommonPopup from "@/components/common/form/popup/CommonPopup";
import { FIRST_POPUP } from "@/utils/EventRegister";

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
          <CommonPopup _key={FIRST_POPUP} />
        </Providers>
      </body>
    </html>
  );
}
