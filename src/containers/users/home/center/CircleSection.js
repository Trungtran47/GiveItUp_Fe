"use client";
import CategoryCircle from "./CategoryCircle";

export default function CircleSection() {
  const categories = [
    { title: "Trẻ em", image: "/image/logo_login.png" },
    { title: "Y tế", image: "/image/logo_login.png" },
    { title: "Giáo dục", image: "/image/logo_login.png" },
    { title: "Động vật", image: "/image/logo_login.png" },
    { title: "Thiên tai", image: "/image/logo_login.png" },
  ];

  // Bán kính vòng tròn lớn
  const radius = 275; // Bán kính vòng tròn
  const count = categories.length;

  // Nếu <= 4 thì bố trí chỉ ở nửa trên (từ -100° đến +100°)
  // Nếu = 5 → bo tròn đẹp (khoảng -120° đến +120°)
  // Nếu >5 → chia đều quanh vòng tròn
  let positions = [];

  if (count === 5) {
    // Cụm 3 cái trên (gần nhau)
    positions = [
      { angle: (-40 * Math.PI) / 180 }, // Trẻ em - trên trái
      { angle: (5 * Math.PI) / 180 }, // Y tế - giữa trên
      { angle: (60 * Math.PI) / 180 }, // Giáo dục - trên phải

      // Tạo khoảng trống giữa cụm trên và dưới
      { angle: (150 * Math.PI) / 180 }, // Động vật - dưới phải
      { angle: (210 * Math.PI) / 180 }, // Thiên tai - dưới trái
    ];
  } else {
    // Fallback: chia đều quanh vòng tròn
    positions = Array.from({ length: count }, (_, i) => ({
      angle: (i / count) * 2 * Math.PI,
    }));
  }

  return (
    <section className="relative flex items-center justify-center h-[1050px] -mt-55 bg-[#FFFFFF] overflow-hidden">
      {/* Text trung tâm */}
      <div className="absolute text-center z-10">
        <p className="text-gray-900 mb-2">Nền tảng gây quỹ cộng đồng số 1</p>
        <h1 className="text-6xl font-bold text-gray-900 leading-tight">
          Bắt đầu <br /> chung tay <br />
          gây quỹ
        </h1>
      </div>
      <div className="relative w-[1000px] h-[1000px] rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center ">
        <div className="relative w-[550px] h-[550px] rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center">
          {/* Các category */}
          {categories.map((cat, i) => {
            const angle = positions[i]?.angle ?? 0;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <div
                key={i}
                className="group absolute transition-transform duration-300"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
              >
                <CategoryCircle {...cat} />
              </div>
            );
          })}
        </div>
        {/* 🔽 Thêm đoạn chữ ở dưới vòng tròn 🔽 */}
        <div className="absolute flex justify-between gap-20 items-center bottom-25 w-[80%] mx-auto">
          <p className="text-gray-700 text-sm w-3/5 text-center -ml-50">
            Hơn 300 triệu VND đã được quyên góp trong tuần qua trên nền tảng gây
            quỹ GiveItUp
          </p>
          <p className="text-gray-700 text-sm mt-1 w-3/5 text-center -mr-50">
            Bắt đầu chỉ trong vài phút - với GiveItUp, bạn có thể nhanh chóng
            tạo tiêu đề phù hợp, chia sẽ câu chuyện của mình, và kết nối cộng
            đồng sẵn sàng chung tay giúp đỡ. Việc gây quỹ chưa bao giờ dễ dàng
            và ý nghĩa đến thế
          </p>
        </div>
      </div>
    </section>
  );
}
