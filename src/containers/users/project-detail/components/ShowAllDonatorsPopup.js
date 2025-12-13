import donateFactory from "@/redux/donate/factory";
import Utils from "@/utils/Utils";
import { HandCoins } from "lucide-react";
import { useEffect, useState } from "react";

export default function ShowAllDonatorsPopup(props) {
  const { showVisible, payload } = props;

  const [activeTab, setActiveTab] = useState("all"); // all | top
  const [dataAllDonators, setDataAllDonators] = useState([]);
  const [dataTopDonators, setDataTopDonators] = useState([]);
  const [keyword, setKeyword] = useState("");

  const handlleFetchAllDonators = async (id, search) => {
    const res = await donateFactory.getDonateByPostId(id, search);
    if (res?.code !== 200) return;
    setDataAllDonators(res.result);
  };

  const handlleFetchTopDonators = async (id) => {
    const listDataDonated = await donateFactory.getDonateTotalbyAmount(id);
    if (listDataDonated?.code !== 200) return;
    setDataTopDonators(listDataDonated?.result?.Data || []);
  };

  useEffect(() => {
    if (payload?.id) {
      handlleFetchAllDonators(payload.id);
      handlleFetchTopDonators(payload.id);
    }
  }, [payload]);
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (payload?.id) {
        handlleFetchAllDonators(payload.id, keyword);
      }
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [keyword]);
  return (
    <div className="p-2 bg-[#f0f1f3] min-w-[700px] min-h-[600px]">
      <div className="bg-white rounded-lg p-4">
        {/* TAB HEADER */}
        <div className="flex  mb-3">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 font-medium cursor-pointer ${
              activeTab === "all"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
          >
            Tất cả nhà hảo tâm
          </button>

          <button
            onClick={() => setActiveTab("top")}
            className={`px-4 py-2 font-medium cursor-pointer ${
              activeTab === "top"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
          >
            Top tiền ủng hộ
          </button>
        </div>

        {/* TAB CONTENT */}
        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 scroll-white">
          {/* TAB ALL DONATORS */}
          {activeTab === "all" && (
            <div className="space-y-2">
              {/* SEARCH BOX */}
              <div className="mb-3">
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Tìm kiếm nhà hảo tâm..."
                  className="w-full h-[32px] px-2 py-2 border rounded-lg focus:outline-none "
                />
              </div>
              {dataAllDonators?.length > 0 ? (
                dataAllDonators.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2 rounded-xl shadow-sm bg-white"
                  >
                    {/* Avatar + Tên */}
                    <div className="flex items-center gap-3">
                      {/* Avatar hoặc icon */}
                      {item.user?.status == 20 ? (
                        item.user?.imageUser ? (
                          <img
                            src={item.user.imageUser}
                            alt="avatar"
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="p-3 bg-gray-100 rounded-full">
                            <HandCoins className="w-6 h-6 text-gray-500" />
                          </div>
                        )
                      ) : item.user?.organizationLogo ? (
                        <img
                          src={item.user.organizationLogo}
                          alt="avatar"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="p-3 bg-gray-100 rounded-full">
                          <HandCoins className="w-6 h-6 text-gray-500" />
                        </div>
                      )}

                      <div>
                        <p className="font-semibold text-gray-800">
                          {item.user?.role == "USER"
                            ? `${item.user?.firstName} ${item.user?.lastName}`
                            : item.user?.organizationName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.user?.role !== "USER" &&
                            `${item.user?.firstName} ${item.user?.lastName}`}
                        </p>
                      </div>
                    </div>

                    {/* Số tiền */}
                    <div className="text-right">
                      <p className="font-semibold text-green-600 text-lg">
                        {item.amount.toLocaleString()} ₫
                      </p>
                      <p className="text-xs text-gray-500">
                        {Utils.getDateDayjs(item.createdAt, 13)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Không có dữ liệu</p>
              )}
            </div>
          )}

          {/* TAB TOP DONATORS */}
          {activeTab === "top" && (
            <div className="space-y-2">
              {dataTopDonators?.length > 0 ? (
                dataTopDonators.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2 rounded-xl shadow-sm bg-white"
                  >
                    {/* Avatar + Tên */}
                    <div className="flex items-center gap-3">
                      {/* Avatar hoặc icon */}
                      {item.user?.role == "USER" ? (
                        item.user?.imageUser ? (
                          <img
                            src={item.user.imageUser}
                            alt="avatar"
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="p-3 bg-gray-100 rounded-full">
                            <HandCoins className="w-6 h-6 text-gray-500" />
                          </div>
                        )
                      ) : item.user?.organizationLogo ? (
                        <img
                          src={item.user.organizationLogo}
                          alt="avatar"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="p-3 bg-gray-100 rounded-full">
                          <HandCoins className="w-6 h-6 text-gray-500" />
                        </div>
                      )}

                      <div>
                        <p className="font-semibold text-gray-800">
                          {item.user?.role == "USER"
                            ? `${item.user?.firstName} ${item.user?.lastName}`
                            : item.user?.organizationName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.user?.role !== "USER" &&
                            `${item.user?.firstName} ${item.user?.lastName}`}
                        </p>
                      </div>
                    </div>

                    {/* Số tiền */}
                    <div className="text-right">
                      <p className="font-semibold text-green-600 text-lg">
                        {item.amount.toLocaleString()} ₫
                      </p>
                      <p className="text-xs text-gray-500">
                        {Utils.getDateDayjs(item.latestDonatedAt, 13)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Không có dữ liệu</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
