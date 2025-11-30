import Utils, { formatNumber } from "@/utils/Utils";
import { HandCoins } from "lucide-react";

export default function DonateContent({
  dataDonatedAmount,
  listDataDonated,
  handleCreateDonate,
}) {
  // Mock data để test nếu không có props

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
        <button
          type="button"
          className="w-full rounded-full bg-[#274A34] text-[#CCF88E] font-semibold py-2.5 text-sm hover:shadow-md transition cursor-pointer"
        >
          Chia sẻ
        </button>
        <button
          onClick={() => handleCreateDonate()}
          type="button"
          className="w-full rounded-full bg-[#CCF88E] text-[#274A34] font-semibold py-2.5 text-sm hover:shadow-md transition cursor-pointer"
        >
          Ủng hộ
        </button>
      </div>

      {/* Phần danh sách donor, chiếm phần còn lại và scroll nếu dài */}
      <div className="flex-1 overflow-y-auto mt-4 space-y-2 scroll-white">
        {listDataDonated?.Data?.map((donor) => (
          <DonorItem
            key={donor.id}
            name={
              donor?.user?.organizationName
                ? donor?.user?.organizationName
                : `${donor?.user?.firstName} ${donor?.user?.lastName}`
            }
            amount={donor.amount}
            time={donor.latestDonatedAt}
          />
        ))}
      </div>

      {/* Phần button luôn ở cuối */}
      <div className=" mt-4 grid gap-2">
        <div className="grid grid-cols-1  content-center">
          <button
            type="button"
            className="rounded-full border border-gray-300 text-xs font-medium text-gray-600 py-2 hover:bg-gray-100 transition cursor-pointer"
          >
            Xem toàn bộ
          </button>
          {/* <button
            type="button"
            className="rounded-full border border-gray-300 text-xs font-medium text-gray-600 py-2 hover:bg-gray-100 transition"
          >
            Nhiều nhất
          </button> */}
        </div>
      </div>
    </aside>
  );
}
function DonorItem({ name, amount, time }) {
  return (
    <div className="flex items-start gap-3 pt-2 rounded-xl hover:border-gray-200 transition-colors">
      {/* LEFT */}
      <div className="flex-1 flex items-center gap-2">
        <div className="p-1.5 bg-gray-100 rounded-full">
          <HandCoins className="w-6 h-6 text-gray-500" />
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900 line-clamp-1">
            {name}
          </span>
          <span className="text-xs text-gray-500">
            {Utils.getDateDayjs(time, 13)}
          </span>
        </div>
      </div>

      {/* RIGHT — AUTO PUSH TO EDGE */}
      <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
        {formatNumber(amount)}
      </span>
    </div>
  );
}
