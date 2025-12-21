import { ToastContainer } from "react-toastify";
import "./globals.css";
import { Providers } from "./providers";
import CommonPopup from "@/components/common/form/popup/CommonPopup";
import { FIRST_POPUP, SECOND_POPUP } from "@/utils/EventRegister";
// 1. Tìm dòng import font (ví dụ Inter)
import { Inter } from "next/font/google";

// 2. Thêm 'vietnamese' vào subsets
const inter = Inter({
  subsets: ["latin", "vietnamese"], // <--- QUAN TRỌNG: Thêm dòng này
  weight: ["400", "500", "600", "700", "800"], // (Tùy chọn) load thêm các độ đậm
});
export const metadata = {
  title: "GiveItUp",
  description: "Give It Up App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <ToastContainer />
          <CommonPopup _key={FIRST_POPUP} />
          <CommonPopup _key={SECOND_POPUP} />
        </Providers>
      </body>
    </html>
  );
}
