"use client";
import CharityPage from "@/components/char-map/CharityPage";
import ContentListPosts from "@/containers/users/home/components/ContentListPosts";
import postFactory from "@/redux/post/factory";
import Image from "next/image";
import { useEffect, useState } from "react";

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
      const data = await postFactory.recommendPosts();
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
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleSelect = (id) => {
    setSelected(id);
    setProgress(0);
  };

  return (
    <div className="bg-[#FFFFFF]">
      {/* ✅ Thêm style animation trượt từ dưới lên */}
      <style jsx global>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slideUp 0.4s ease-out forwards;
        }
      `}</style>

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
            <div className="border w-[430px] h-[500px] bg-[#409E2A] flex justify-center items-end relative rounded-3xl overflow-hidden">
              <div key={selected} className="animate-slide-up z-10">
                <Image
                  src={`/image/slide_${selected}.png`} // Dùng template string để lấy ảnh 1, 2, 3 tự động
                  alt={`Slide ${selected}`}
                  width={400}
                  height={200}
                  unoptimized
                  className="object-contain" // Đảm bảo ảnh không bị méo
                />
              </div>

              {/* Thanh progress */}
              <div className="absolute bottom-0 left-0 w-full h-1.5 rounded-full overflow-hidden z-20">
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
                  className="flex gap-8 items-start cursor-pointer group"
                  onClick={() => handleSelect(step.id)}
                >
                  <div className="flex gap-2 items-center">
                    {/* Mũi tên chỉ thị */}
                    {selected === step.id ? (
                      <div className="border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-r-[6px] border-r-black" />
                    ) : (
                      <div className="border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-r-[6px] border-r-white" />
                    )}

                    {/* ✅ Vòng tròn số */}
                    <div
                      className={`w-10 h-10 rounded-full border flex-shrink-0 mt-1 transition-colors duration-200 flex items-center justify-center ${
                        selected === step.id
                          ? "bg-black border-black text-white"
                          : "border-gray-400 text-gray-500 bg-transparent group-hover:border-gray-600"
                      }`}
                    >
                      <span className="font-bold text-sm">{step.id}</span>
                    </div>
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
        <CharityPage />
      </div>
    </div>
  );
}
