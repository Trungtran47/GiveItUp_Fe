import Utils, { formatNumber, getToast } from "@/utils/Utils";
import { HandCoins } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Icon thương hiệu chuẩn
import { FaFacebook, FaFacebookMessenger, FaTwitter } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { LuCopy, LuShare2 } from "react-icons/lu";

export default function DonateContent({
  dataDonatedAmount,
  listDataDonated,
  handleCreateDonate,
  setShowAllDonators,
  postUrl,
}) {
  const [showShareBar, setShowShareBar] = useState(false);
  const wrapperRef = useRef(null);
  return (
    <aside className="bg-white border border-gray-200 h-[620px] rounded-2xl p-3 flex flex-col shadow-[0_8px_30px_rgba(76,175,80,0.08)]">
      {/* Phần thông tin số tiền */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase text-gray-500">
          Đã quyên góp được
        </span>
        <span className="text-xl font-bold text-gray-900">
          {formatNumber(dataDonatedAmount)} VND
        </span>

        {/* BUTTON SHARE + SHARE BAR */}
        <div className="relative" ref={wrapperRef}>
          <button
            type="button"
            onClick={() => setShowShareBar((prev) => !prev)}
            className="w-full rounded-full bg-[#274A34] text-[#CCF88E] font-semibold py-2.5 text-sm hover:shadow-md transition cursor-pointer"
          >
            Chia sẻ
          </button>

          {showShareBar && (
            <ShareBar postUrl={postUrl} close={() => setShowShareBar(false)} />
          )}
        </div>

        <button
          onClick={() => handleCreateDonate()}
          type="button"
          className="w-full rounded-full bg-[#CCF88E] text-[#274A34] font-semibold py-2.5 text-sm hover:shadow-md transition cursor-pointer"
        >
          Ủng hộ
        </button>
      </div>

      {/* LIST DONOR */}
      <div className="flex-1 overflow-y-auto mt-4 space-y-2 scroll-white">
        {listDataDonated?.Data?.map((donor) => (
          <DonorItem
            key={donor.id}
            name={
              donor?.user?.role == "AUTHOR"
                ? donor?.user?.organization?.organizationName
                : `${donor?.user?.firstName} ${donor?.user?.lastName}`
            }
            amount={donor.amount}
            time={donor.latestDonatedAt}
          />
        ))}
      </div>

      {/* BUTTON CUỐI */}
      <button
        type="button"
        className="rounded-full border border-gray-300 text-xs font-medium text-gray-600 py-2 hover:bg-gray-100 transition cursor-pointer"
        onClick={() => setShowAllDonators(false)}
      >
        Xem toàn bộ
      </button>
    </aside>
  );
}

function ShareBar({ postUrl, close }) {
  useEffect(() => {
    const handleClickOutside = (e) => {
      const wrapper = document.querySelector("#share-wrapper");
      if (wrapper && !wrapper.contains(e.target)) {
        close();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []); // đảm bảo viết thế này

  const handleCopy = async () => {
    await navigator.clipboard.writeText(postUrl);
    getToast("Đã sao chép liên kết!", "success");
  };

  const handleWebShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: "Hãy cùng quyên góp!", url: postUrl });
    } else {
      alert("Trình duyệt không hỗ trợ chia sẻ nhanh.");
    }
  };

  return (
    <div
      id="share-wrapper"
      className="
        absolute left-0 right-0 
        mt-2 p-3 rounded-xl 
        bg-white border shadow-lg 
        grid grid-cols-3 gap-4
        text-center
        z-50
        animate-fade-down
      "
    >
      <div className="flex flex-col items-center gap-1">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            postUrl
          )}`}
          target="_blank"
        >
          <FaFacebook size={26} color="#1877F2" />
        </a>
        <span className="text-xs text-gray-600">Facebook</span>
      </div>

      <div className="flex flex-col items-center gap-1">
        <a
          href={`https://www.facebook.com/dialog/send?link=${encodeURIComponent(
            postUrl
          )}`}
          target="_blank"
        >
          <FaFacebookMessenger size={26} color="#0084FF" />
        </a>
        <span className="text-xs text-gray-600">Messenger</span>
      </div>

      <div className="flex flex-col items-center gap-1">
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
            postUrl
          )}`}
          target="_blank"
        >
          <FaTwitter size={26} color="#1DA1F2" />
        </a>
        <span className="text-xs text-gray-600">Twitter</span>
      </div>

      <div className="flex flex-col items-center gap-1">
        <a
          href={`https://zalo.me/share?url=${encodeURIComponent(postUrl)}`}
          target="_blank"
        >
          <SiZalo size={26} color="#0068FF" />
        </a>
        <span className="text-xs text-gray-600">Zalo</span>
      </div>

      <div className="flex flex-col items-center gap-1">
        <button onClick={handleCopy}>
          <LuCopy size={26} color="#333" />
        </button>
        <span className="text-xs text-gray-600">Sao chép</span>
      </div>

      <div className="flex flex-col items-center gap-1">
        <button onClick={handleWebShare}>
          <LuShare2 size={26} color="#16A34A" />
        </button>
        <span className="text-xs text-gray-600">Chia sẻ</span>
      </div>
    </div>
  );
}

function DonorItem({ name, amount, time }) {
  return (
    <div className="flex items-start gap-3 pt-2 rounded-xl">
      <div className="flex-1 flex items-center gap-2">
        <div className="p-1.5 bg-gray-100 rounded-full">
          <HandCoins className="w-6 h-6 text-gray-500" />
        </div>

        <div>
          <span className="text-sm font-semibold text-gray-600 line-clamp-1">
            {name}
          </span>
          <span className="block text-xs text-gray-500">
            {Utils.getDateDayjs(time, 13)}
          </span>
        </div>
      </div>

      <span className="text-sm font-semibold whitespace-nowrap text-gray-900">
        {formatNumber(amount)}
      </span>
    </div>
  );
}
