import Image from "next/image";

export default function ListNews() {
  const cards = [
    {
      id: 1,
      image: "/image/img_fb.png",
      tag: "Hỗ trợ khắc phục sau thiên tai",
      title: "Chung tay khắc phục hậu quả sau thiên tai",
      buttonText: "Tham gia ngay",
    },
    {
      id: 2,
      image: "/image/img_fb.png",
      tag: "Đánh Giá GiveItUp",
      title: "Đánh Giá GiveItUp",
      buttonText: "Đọc Thêm",
    },
  ];
  return (
    <div className="flex flex-col py-10">
      <h1 className="text-2xl font-bold mb-4 text-black">Chủ đề nổi bật</h1>
      <div className="flex gap-10">
        <div className="bg-white rounded-2xl  hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer flex-1 flex-col">
          <div className="relative w-full h-[320px] rounded-t-2xl overflow-hidden">
            <Image
              src={cards?.[0].image}
              alt={cards?.[0].title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Nội dung */}
          <div className="flex flex-col justify-between p-5 flex-1">
            <h3 className="text-gray-900 font-semibold text-[16px] mb-4">
              {cards?.[0].title}
            </h3>

            <button className="w-fit px-4 py-2 border border-green-600 text-green-600 rounded-full text-sm font-medium hover:bg-green-600 hover:text-white transition-all duration-300 flex items-center gap-2">
              {cards?.[0].buttonText}
              <span className="text-lg">→</span>
            </button>
          </div>
        </div>
        <div className="bg-white rounded-2xl  hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer flex-1 flex-col">
          {/* Ảnh */}
          <div className="relative w-full h-[320px] rounded-t-2xl overflow-hidden">
            <Image
              src={cards?.[0].image}
              alt={cards?.[0].title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Nội dung */}
          <div className="flex flex-col justify-between p-5 flex-1">
            <h3 className="text-gray-900 font-semibold text-[16px] mb-4">
              {cards?.[0].title}
            </h3>

            <button className="w-fit px-4 py-2 border border-green-600 text-green-600 rounded-full text-sm font-medium hover:bg-green-600 hover:text-white transition-all duration-300 flex items-center gap-2">
              {cards?.[0].buttonText}
              <span className="text-lg">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
