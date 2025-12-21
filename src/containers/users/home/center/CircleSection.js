"use client";
import React, { useState, useEffect } from "react";
import CategoryCircle from "./CategoryCircle";

export default function CircleSection() {
  // Dữ liệu mẫu
  const categories = [
    // 1. Trẻ em (Giữ nguyên theo ý bạn)
    {
      title: "Trẻ em",
      image:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=400&auto=format&fit=crop",
    },

    // 2. Giáo dục: Thay bằng ảnh học sinh đeo khăn quàng/áo trắng trong lớp học (Rất giống VN)
    {
      title: "Giáo dục",
      image: "/image/giao_duc.png",
    },

    // 3. Y tế: Thay bằng ảnh bác sĩ nắm tay động viên người bệnh (Góc chụp cận, tình cảm, không bị lạnh lẽo như ảnh quầy lễ tân)
    {
      title: "Y tế",
      image: "/image/y_te1.png",
    },

    // 4. Động vật: Thay bằng ảnh chú chó vàng (chó ta) nhìn hiền lành, gần gũi hơn chó tây
    {
      title: "Động vật",
      image:
        "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=400&auto=format&fit=crop",
    },

    // 5. Thiên tai: Thay bằng ảnh người lội nước/ngập lụt (Nhìn rõ cảnh bão lũ, phù hợp kêu gọi cứu trợ)
    {
      title: "Thiên tai",
      image: "/image/thien_tai.png",
    },
  ];

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-start  min-h-[900px] bg-white overflow-hidden">
      {/* --- Background Decor (Các vòng tròn mờ làm nền) --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[70%] w-[600px] h-[600px] rounded-full border border-gray-400 pointer-events-none opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[1250px] h-[1250px] rounded-full border border-gray-400 pointer-events-none opacity-30" />

      {/* --- CONTAINER CHÍNH ĐỊNH VỊ CÁC PHẦN TỬ --- */}
      {/* Sử dụng một container có kích thước cố định để dễ đặt vị trí absolute */}
      <div
        className={`relative w-full max-w-[1000px] h-[700px] transition-all duration-1000 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* --- TEXT TRUNG TÂM --- */}
        <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20 w-full px-4">
          <p className="text-gray-500 font-semibold tracking-wider text-sm mb-3 animate-text-pulse">
            Nền tảng gây quỹ cộng đồng số 1
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight">
            Bắt đầu <br />
            chung tay <br />
            gây quỹ
          </h1>
        </div>

        {/* --- CÁC CATEGORY CIRCLES (Vị trí cố định theo ảnh mẫu) --- */}

        {/* 1. Trẻ em - Top Left */}
        <div className="absolute top-[20%] left-[15%] lg:left-[10%] z-30">
          <CategoryCircle {...categories[0]} index={0} />
        </div>

        {/* 2. Giáo dục - Top Right */}
        <div className="absolute top-[12%] right-[15%] lg:right-[10%] z-30">
          <CategoryCircle {...categories[1]} index={1} />
        </div>

        {/* 3. Y tế - Middle Left */}
        <div className="absolute top-[60%] left-[10%] lg:left-[8%] z-30">
          <CategoryCircle {...categories[2]} index={2} />
        </div>

        {/* 4. Động vật - Middle Right */}
        <div className="absolute top-[55%] right-[10%] lg:right-[5%] z-30">
          <CategoryCircle {...categories[3]} index={3} />
        </div>

        {/* 5. Thiên tai - Bottom Center */}
        <div className="absolute bottom-[0%] left-[55%] -translate-x-1/2 z-30">
          <CategoryCircle {...categories[4]} index={4} />
        </div>
      </div>

      {/* --- PHẦN TEXT THỐNG KÊ Ở DƯỚI --- */}
      <div
        className={`w-full max-w-5xl mx-auto  flex flex-col md:flex-row justify-between items-start gap-10 mt-10 transition-all delay-700 duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="md:w-5/12">
          <h3 className="text-xl md:text-xl font-medium text-gray-900 leading-tight">
            Hơn 300 triệu VND đã được quyên góp trong tuần qua trên nền tảng gây
            quỹ GiveItUp
          </h3>
        </div>
        <div className="md:w-6/12">
          <p className="text-gray-600 text-base leading-relaxed">
            Bắt đầu chỉ trong vài phút - với GiveItUp, bạn có thể nhanh chóng
            tạo tiêu đề phù hợp, chia sẻ câu chuyện của mình, và kết nối cộng
            đồng sẵn sàng chung tay giúp đỡ. Việc gây quỹ chưa bao giờ dễ dàng
            và ý nghĩa đến thế.
          </p>
        </div>
      </div>
    </section>
  );
}
