"use client";

import Image from "next/image";

export default function AboutUsContent() {
  return (
    <div className="bg-white min-h-screen pt-[56px]">
      {/* Banner */}
      <div className="w-full relative">
        <Image
          src="/image/img-about_us.png" // đổi thành ảnh bạn dùng (ví dụ bạn vừa upload)
          alt="GiveItUp team"
          width={1200}
          height={300}
          className="w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8">
          Về <span className="text-green-600">GiveItUp</span>
        </h2>

        <div className="text-gray-700 leading-relaxed space-y-4 text-justify">
          <p>
            Có những câu chuyện không xuất hiện trên báo chí, nhưng lặng lẽ diễn
            ra xung quanh chúng ta mỗi ngày. Đó có thể là cụ già bán vé số dưới
            nắng trưa gắt gỏng của Sài Gòn. Là người mẹ miền Trung giấu đi nước
            mắt khi mùa lũ cuốn đi ngôi nhà, cuốn đi những tài sản quý giá tích
            góp cả đời người. Là những đứa trẻ vùng cao đi bộ cả giờ chỉ để đến
            lớp, dẹp món đèn nỗi không phân biệt được đâu là trái - phải.
          </p>
          <p>
            Và cũng có những lúc, giữa thiên tai, bệnh tật, hay biến cố bất ngờ,
            một gia đình bình thường như bao gia đình khác rơi vào cảnh kiệt
            quệ.
            <strong> GiveItUp </strong> ra đời từ những điều rất thật ấy, chúng
            tôi muốn trở thành nơi kết nối yêu thương - nơi mỗi người có thể
            trao đi một phần nhỏ của mình, để góp lại thành hy vọng lớn cho
            người khác.
          </p>

          <p className="font-semibold mt-6">Tại GiveItUp bạn có thể:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Quyên góp giúp đồng bào cả nước chống thiên tai</li>
            <li>Chung tay hỗ trợ trẻ em vùng cao đến trường</li>
            <li>Tiếp sức cho những bệnh nhân nghèo cần được chữa trị</li>
            <li>Đồng hành cùng những mảnh đời chênh vênh trong cuộc sống</li>
          </ul>

          <p>
            Mỗi khoản đóng góp, dù nhỏ hay lớn, đều được gửi gắm đến đúng nơi,
            đúng người, minh bạch, rõ ràng, và đầu tư trọng lòng tin.
          </p>

          <p>
            Chúng tôi tin vào sức mạnh cộng đồng, sức mạnh của tình yêu thương.
            Chúng tôi tin rằng khi một người gặp khó khăn, sẽ có nhiều người đưa
            đôi bàn tay của mình ra kéo họ dậy. Tin rằng lòng nhân ái không cần
            ồn ào, chỉ cần chân thành.
          </p>

          <p className="font-medium">
            <strong>GiveItUp</strong> - Để yêu thương không chỉ dừng lại ở lời
            nói, mà trở thành những hành động lặng lẽ nhưng lay động, để cuộc
            sống của ai đó bớt đi một chút nặng nề, và sưởi ấm thêm trái tim của
            nhiều người.
          </p>
        </div>
      </div>
    </div>
  );
}
