"use client";
import CharityPage from "@/components/char-map/CharityPage";
import ContentListPosts from "@/containers/users/home/components/ContentListPosts";
import postFactory from "@/redux/post/factory";
import Constants from "@/utils/Constants";
import { useEffect, useState } from "react";

// ✅ Di chuyển steps ra ngoài component
const steps = [
  {
    id: 1,
    title: "Sử dụng ứng dụng của chúng tôi để tạo chiến dịch gây quỹ cho bạn",
    desc: "Bạn sẽ được hướng dẫn thêm thông tin chi tiết về hoạt động gây quỹ, và đặt mục tiêu. Bạn có thể cập nhật dữ liệu quỹ bất cứ khi nào.",
  },
  {
    id: 2,
    title: "Tiếp cận với các nhà từ thiện bằng cách chia sẻ",
    desc: "Chia sẻ liên kết gây quỹ của bạn, và sử dụng tài nguyên trong bài đăng để tạo động lực.",
  },
  {
    id: 3,
    title: "Ủng hộ an toàn",
    desc: "Thêm thông tin ngân hàng của bạn, và bạn sẽ có thông tin của người thụ hưởng trong chiến dịch gây quỹ của họ, và bắt đầu nhận tiền.",
  },
];

export default function ContentHome() {
  const [selected, setSelected] = useState(1);
  const [progress, setProgress] = useState(0);
  const [dataPosts, setDataPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await postFactory.getTop5Posts();
      setDataPosts(data?.result);
    };
    fetchData();
  }, []);

  // Auto progress + auto switch every 10s
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setSelected((prevStep) =>
            prevStep === steps.length ? 1 : prevStep + 1
          );
          return 0;
        }
        return prev + 1; // mỗi 100ms = 1%, tổng 10s
      });
    }, 100);

    return () => clearInterval(interval);
  }, []); // ✅ Không cần dependency nào

  // Khi chọn thủ công, reset progress
  const handleSelect = (id) => {
    setSelected(id);
    setProgress(0);
  };

  return (
    <div className="bg-[#FFFFFF]">
      <div className="flex gap-20 items-center justify-center bg-[#FFF3D0] w-full h-[90px]">
        <p className="text-[#000000] text-sm">
          Không mất phí để bắt đầu gây quỹ
        </p>
        <p className="text-[#000000] text-sm">
          Mỗi giây có 1 khoản thanh toán được thực hiện
        </p>
        <p className="text-[#000000] text-sm">Hoạt động gây quỹ hàng ngày</p>
      </div>

      <div className="flex flex-col py-[50px]  w-[1158px] mx-auto">
        <div className="flex flex-col items-center justify-center p-10">
          <div className="flex items-center mb-4">
            <h2 className="text-[#000000] text-3xl font-bold text-center mb-4">
              Việc gây quỹ trên GiveItUp rất dễ <br /> dàng, mạnh mẽ và đáng tin
              cậy
            </h2>
          </div>

          <div className="flex gap-20 justify-between items-center px-40">
            {/* Khối màu xanh + thanh load */}
            <div className="border w-[400px] h-[500px] bg-[#409E2A] flex justify-center items-end relative rounded-3xl overflow-hidden">
              {selected === 1 && (
                <div className="border rounded-t-3xl w-[300px] h-[450px] top-0 bg-white" />
              )}
              {selected === 2 && (
                <div className="border rounded-t-3xl w-[300px] h-[450px] top-0 bg-white" />
              )}
              {selected === 3 && (
                <div className="border rounded-t-3xl w-[300px] h-[450px] top-0 bg-white" />
              )}

              {/* Thanh progress bên trong border cong */}
              <div className="absolute bottom-0 left-0 w-full h-1.5  rounded-full overflow-hidden">
                <div
                  className="h-full bg-gray-500 transition-[width] duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Danh sách step */}
            <div className="flex flex-col justify-between gap-8 w-[500px] h-[500px]">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className="flex gap-8 items-start cursor-pointer"
                  onClick={() => handleSelect(step.id)}
                >
                  <div className="flex gap-2 items-center">
                    {selected === step.id ? (
                      <div
                        className="
                          border-t-[4px] border-t-transparent 
                          border-b-[4px] border-b-transparent 
                          border-r-[6px] border-r-black"
                      />
                    ) : (
                      <div
                        className="
                          border-t-[4px] border-t-transparent 
                          border-b-[4px] border-b-transparent 
                          border-r-[6px] border-r-white"
                      />
                    )}

                    <div
                      className={`w-10 h-10 rounded-full border flex-shrink-0 mt-1 transition-colors duration-200 ${
                        selected === step.id
                          ? "bg-black border-black"
                          : "border-gray-400"
                      }`}
                    />
                  </div>

                  <div>
                    <h3 className="text-gray-900 text-xl font-semibold mb-1">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-xl">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <ContentListPosts dataPosts={dataPosts} />
        {/* <ListNews /> */}
        <CharityPage />
      </div>
    </div>
  );
}
