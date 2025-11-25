import postFactory from "@/redux/post/factory";
import EventRegister, {
  EVENT_SHOW_POPUP,
  POPUP_CREATE_DONATE,
} from "@/utils/EventRegister";
import Utils from "@/utils/Utils";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const HERO_IMAGE = {
  src: "/image/img_fb.png",
  alt: "Chương trình dân vận Trà Tân 2025",
};

const ORGANIZATION = {
  name: "Nhóm từ thiện Hand in Hand Việt - Hàn",
  totalCampaigns: "18 chiến dịch",
};

const DONATION_SUMMARY = {
  raised: "120.194.000 VND",
  donors: [
    { id: 1, name: "Ẩn danh", amount: "2.000.000 VND", time: "9 ngày trước" },
    { id: 2, name: "Ẩn danh", amount: "2.000.000 VND", time: "9 ngày trước" },
    { id: 3, name: "Ẩn danh", amount: "2.000.000 VND", time: "9 ngày trước" },
    { id: 4, name: "Ẩn danh", amount: "2.000.000 VND", time: "9 ngày trước" },
    { id: 5, name: "Ẩn danh", amount: "2.000.000 VND", time: "9 ngày trước" },
  ],
};

const RELATED_PROJECTS = [
  {
    id: "related-1",
    image: "/image/img_fb.png",
    title:
      "Lũ dữ đánh sập cầu ở Lạng Sơn, nhiều hộ dân bị ảnh hưởng nghiêm trọng",
    raised: "Đã quyên góp được 350 triệu VND",
  },
  {
    id: "related-2",
    image: "/image/img_fb.png",
    title: "Hành trình đưa dỡ rau vừa sạch yêu thương đến nhà hàng vùng cao",
    organization: "Nhóm từ thiện lòng cao",
    raised: "Đã quyên góp được 815 triệu VND",
  },
  {
    id: "related-3",
    image: "/image/img_fb.png",
    title: "Trà Ka - Nắng Ấm cho em",
    organization: "Nhóm Hand in Hand Sư phạm",
    raised: "Đã quyên góp được 95 triệu VND",
  },
];

export default function ProjectDetailContent() {
  const [dataDetails, setDataDetails] = useState(null);
  const { id } = useParams();
  const handleCreateDonate = (data) => {
    EventRegister.emit(EVENT_SHOW_POPUP, {
      type: POPUP_CREATE_DONATE,
      open: true,
      payload: {
        data,
        title: dataDetails?.title,
        getData: fetchProjectDetails,
      },
    });
  };
  async function fetchProjectDetails() {
    // Giả sử bạn có một hàm trong postFactory để lấy chi tiết dự án theo ID
    const data = await postFactory.getProjectById(id);
    setDataDetails(data?.result);
  }
  useEffect(() => {
    fetchProjectDetails();
  }, [id]);
  const thumbnail = dataDetails?.images?.find((img) => img.isThumbnail);
  const percent = Math.min(
    100,
    Math.round((dataDetails?.donatedAmount / dataDetails?.targetAmount) * 100)
  );
  return (
    <div className="bg-white max-w-[1158px] mx-auto">
      <section className=" mx-auto px-5 py-10">
        <header className="space-y-3">
          {/* <p className="text-xs tracking-[0.3em] uppercase text-green-600 font-semibold">
            DỰ ÁN NỔI BẬT
          </p> */}
          <h1 className="text-2xl md:text-[28px] font-bold text-gray-900 leading-tight">
            {dataDetails?.title || ""}
          </h1>
          <div className="text-sm text-gray-500">
            <span className="text-green-600 font-medium hover:underline">
              {dataDetails?.user?.organizationName || ""}
            </span>
            {/* <span className="mx-2 text-gray-300">|</span>
            <span>Đã quyên góp được 120 triệu VND</span> */}
          </div>
        </header>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Ảnh chiếm 2 cột */}
          <div className="relative w-full overflow-hidden rounded-2xl  lg:col-span-2">
            <figure>
              <Image
                src={thumbnail?.imageUrl || "/images/default.png"}
                alt={thumbnail?.imageUrl || "thumbnail"}
                width={960}
                height={540}
                className="w-full h-auto max-h-[420px] object-cover"
                priority
              />
            </figure>
            <section className="mt-10 bg-white rounded-2xl p-6 space-y-6">
              <article className="space-y-4 text-sm leading-relaxed text-gray-700">
                {dataDetails?.description?.split("\n").map((para, index) => (
                  <p key={index}>{para}</p>
                ))}
              </article>

              <div className="bg-gray-50 rounded-2xl p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-700">
                      Mục tiêu{" "}
                      {dataDetails?.targetAmount.toLocaleString("vi-VN")} VND
                    </span>
                    <div className="flex items-center gap-2">
                      {/* <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                        4
                      </span> */}
                      <span className="text-sm text-gray-600">
                        Đến ngày {Utils.getDateDayjs(dataDetails?.endDate)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-green-600">
                      {percent} %
                    </span>
                    <span className="text-sm text-gray-600">hoàn thành</span>
                  </div>
                </div>

                <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="absolute h-full bg-green-600 rounded-full transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white text-xs font-medium text-gray-600 hover:bg-gray-100 transition">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    </svg>
                    React
                  </button>
                  <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white text-xs font-medium text-gray-600 hover:bg-gray-100 transition">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Đã cảnh báo
                  </button>
                </div>
              </div>

              {/* <div className="flex justify-between items-center pt-4">
                <div className="text-sm text-gray-500">Hãy là một</div>
                <div className="flex gap-3">
                  <button className="px-6 py-1 rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
                    Chia sẻ
                  </button>
                  <button className="px-6 py-1 rounded-full bg-green-600 text-sm font-semibold text-white hover:bg-green-700 transition">
                    Ủng hộ
                  </button>
                </div>
              </div> */}
            </section>
          </div>

          {/* Aside chiếm 1 cột */}
          <aside className="bg-white border border-gray-200 h-[620px] rounded-2xl p-5 flex flex-col gap-4 shadow-[0_8px_30px_rgba(76,175,80,0.08)]">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase text-gray-500">
                Đã quyên góp được
              </span>
              <span className="text-xl font-bold text-gray-900">
                {DONATION_SUMMARY.raised}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                className="w-full rounded-full bg-[#274A34] text-[#CCF88E] font-semibold py-2.5 text-sm hover:shadow-md transition cursor-pointer"
              >
                Chia sẻ
              </button>
              <button
                onClick={() => handleCreateDonate(dataDetails?.bankAccount)}
                type="button"
                className="w-full rounded-full bg-[#CCF88E] text-[#274A34] font-semibold py-2.5 text-sm hover:shadow-md transition cursor-pointer"
              >
                Ủng hộ
              </button>
            </div>
            <div className="space-y-2">
              {DONATION_SUMMARY.donors.map((donor) => (
                <DonorItem
                  key={donor.id}
                  name={donor.name}
                  amount={donor.amount}
                  time={donor.time}
                />
              ))}
            </div>

            <div className="grid gap-3 pt-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className="rounded-full border border-gray-300 text-xs font-medium text-gray-600 py-2 hover:bg-gray-100 transition"
                >
                  Xem toàn bộ
                </button>
                <button
                  type="button"
                  className="rounded-full border border-gray-300 text-xs font-medium text-gray-600 py-2 hover:bg-gray-100 transition"
                >
                  Nhiều nhất
                </button>
              </div>
            </div>
          </aside>
        </div>

        <section className="mt-10 space-y-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                  {dataDetails?.user?.organizationLogo && (
                    <Image
                      src={dataDetails.user.organizationLogo}
                      alt="user"
                      width={40}
                      height={40}
                      className="w-10 h-10 object-cover rounded-full"
                    />
                  )}
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-gray-900">
                    Tổ chức đăng bài
                  </h2>
                  <p className="text-xs text-gray-500">
                    {dataDetails?.user?.organizationName} ·{" "}
                    {/* {dataDetails?.user?.totalCampaigns} */}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="rounded-full bg-green-100 text-green-700 px-4 py-1 text-xs font-semibold hover:bg-green-200 transition">
                  Liên hệ
                </button>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 pl-1">Tạo ngày 09/11/2025</p>
        </section>

        <section className="mt-12 space-y-6">
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">
              Bài viết tương tự
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {RELATED_PROJECTS.map((project) => (
              <RelatedProjectCard key={project.id} {...project} />
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}

function DonorItem({ name, amount, time }) {
  return (
    <div className="flex items-start justify-between gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <svg
            className="w-4 h-4 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900">{name}</span>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
      </div>
      <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
        {amount}
      </span>
    </div>
  );
}

function RelatedProjectCard({ image, title, organization, raised }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="relative w-full h-40 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(min-width: 768px) 320px, 100vw"
        />
      </div>

      <div className="p-4 space-y-2">
        <h4
          className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {title}
        </h4>
        {organization && (
          <p className="text-xs text-gray-600">{organization}</p>
        )}
        <p className="text-xs font-semibold text-green-600">{raised}</p>
      </div>
    </div>
  );
}
