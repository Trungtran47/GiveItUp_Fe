import PostItem from "@/containers/users/home/components/PostItem";
import CommentSection from "@/containers/users/project-detail/components/CommentSection";
import DonateContent from "@/containers/users/project-detail/components/DonateContent";
import MediaCarousel from "@/containers/users/project-detail/components/MediaCarousel";
import donateFactory from "@/redux/donate/factory";
import likeFactory from "@/redux/like/factory";
import postFactory from "@/redux/post/factory";
import EventRegister, {
  EVENT_SHOW_POPUP,
  POPUP_CREATE_DONATE,
  POPUP_SHOW_ALL_DONATORS,
} from "@/utils/EventRegister";
import Utils, { formatNumber, getToast } from "@/utils/Utils";
import { HandCoins, Loader2 } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// --- COMPONENT HIỂN THỊ TRẠNG THÁI ---
const StatusAlert = ({ status, statusName }) => {
  // Nếu đang loading (undefined) hoặc Active (20) thì không hiện gì
  if (!status || status === 20) return null;

  let styles = "bg-gray-100 border-gray-300 text-gray-700";
  let description = "Dự án này hiện không hoạt động.";

  switch (status) {
    case 10: // Chờ duyệt
      styles = "bg-blue-50 border-blue-200 text-blue-800";
      description = "Dự án đang trong quá trình xét duyệt bởi quản trị viên.";
      break;
    case 30: // Hết hạn / Tạm dừng
      styles = "bg-orange-50 border-orange-200 text-orange-800";
      description = "Dự án đã tạm dừng hoặc hết thời gian quyên góp.";
      break;
    case 50: // Hoàn thành
      styles = "bg-teal-50 border-teal-200 text-teal-800";
      description = "Dự án đã hoàn thành mục tiêu quyên góp xuất sắc!";
      break;
    case 90: // Từ chối
    case 91: // Bị chặn
      styles = "bg-red-50 border-red-200 text-red-800";
      description = "Dự án đã bị từ chối hoặc bị chặn do vi phạm chính sách.";
      break;
    default:
      break;
  }

  return (
    <div
      className={`w-full rounded-xl border p-4 mb-6 shadow-sm flex flex-col gap-2 ${styles}`}
    >
      <div className="flex items-center gap-2">
        {/* Dấu chấm tròn trạng thái */}
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-current"></span>
        </span>
        <h3 className="text-lg font-bold uppercase tracking-tight">
          {statusName || "Trạng thái khác"}
        </h3>
      </div>
      <p className="text-sm font-medium opacity-90 ml-5">{description}</p>
    </div>
  );
};
// --- COMPONENT LOADING (Tạo riêng cho gọn) ---
const LoadingSkeleton = () => {
  return (
    <div className="w-full flex items-center justify-center min-h-[60vh] bg-white">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-10 h-10 animate-spin text-green-600" />
      </div>
    </div>
  );
};
export default function ProjectDetailContent() {
  const [dataDetails, setDataDetails] = useState(null);
  const [listDataDonated, setListDataDonated] = useState([]);
  const [dataPosts, setDataPosts] = useState([]);
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState("postUpdate");
  const [donators, setDonators] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [likedPosts, setLikedPosts] = useState(0);
  const { id } = useParams();
  // --- HÀM KIỂM TRA TRẠNG THÁI ---
  const checkActiveStatus = () => {
    // 20 là trạng thái Active
    if (dataDetails?.status !== 20) {
      getToast("Bài viết đã dừng hoạt động, không thể thao tác!", "warning");
      return false;
    }
    return true;
  };

  const handleCreateDonate = () => {
    if (!checkActiveStatus()) return;
    EventRegister.emit(EVENT_SHOW_POPUP, {
      type: POPUP_CREATE_DONATE,
      open: true,
      payload: {
        id: id,
        title: dataDetails?.title,
        getData: fetchProjectDetails,
      },
    });
  };
  async function fetchProjectDetails() {
    // Giả sử bạn có một hàm trong postFactory để lấy chi tiết dự án theo ID
    const data = await postFactory.getProjectById(id);
    setDataDetails(data?.result);
    setLiked(data?.result?.liked || false);
    setLikedPosts(data?.result?.likeCount || 0);
    const listDataDonated = await donateFactory.getDonateTotalbyAmount(id);
    setListDataDonated(listDataDonated?.result);
    const res = await donateFactory.getDonateByPostId(id);
    if (res?.code !== 200) return;
    setDonators(res.result);
  }
  const handleLike = async () => {
    if (!checkActiveStatus()) return;
    setLiked(!liked);
    setLikedPosts(liked ? likedPosts - 1 : likedPosts + 1);
    const res = await likeFactory.toggleLike(dataDetails?.id);
    if (res?.code != 200) {
      // Nếu thất bại, hoàn tác lại thay đổi UI
      setLiked(liked);
      setLikedPosts(liked ? likedPosts + 1 : likedPosts - 1);
    }
  };
  const setShowAllDonators = (type) => {
    EventRegister.emit(EVENT_SHOW_POPUP, {
      type: POPUP_SHOW_ALL_DONATORS,
      open: true,
      payload: {
        id: id,
        type: type,
        title: `Danh sách ủng hộ - ${dataDetails?.title}`,
      },
    });
  };
  const fetchData = async () => {
    const data = await postFactory.getRelatedPosts(id);
    setDataPosts(data?.result);
  };
  useEffect(() => {
    if (!id) return;
    const loadAllData = async () => {
      setIsLoading(true); // Bắt đầu loading
      try {
        // Chạy song song cả 2 hàm fetch để tiết kiệm thời gian
        await Promise.all([fetchData(), fetchProjectDetails()]);
      } catch (error) {
        console.error("Lỗi khi tải trang chi tiết:", error);
      } finally {
        setIsLoading(false); // Kết thúc loading dù thành công hay thất bại
      }
    };

    loadAllData();
  }, [id]);
  // const thumbnail = dataDetails?.images?.find((img) => img.isThumbnail);
  const percent = Math.min(
    100,
    Math.round((dataDetails?.donatedAmount / dataDetails?.targetAmount) * 100)
  );
  const handleClick = (id) => {
    router.push(`/u/${id}`);
  };
  // <--- 3. Render Loading UI nếu đang load
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  // <--- 4. Nếu load xong nhưng không có dữ liệu (ví dụ sai ID), hiển thị trang lỗi hoặc trống
  if (!dataDetails) {
    return (
      <div className="flex w-full justify-center items-center h-[50vh] text-gray-500">
        Không tìm thấy thông tin dự án.
      </div>
    );
  }
  return (
    <div className="bg-white max-w-[1158px] mx-auto">
      <section className=" mx-auto px-5 py-10">
        {/* --- CHÈN BANNER CẢNH BÁO Ở ĐÂY --- */}
        <StatusAlert
          status={dataDetails?.status}
          statusName={dataDetails?.statusName}
        />
        {/* ---------------------------------- */}
        <header className="space-y-1">
          {/* <p className="text-xs tracking-[0.3em] uppercase text-green-600 font-semibold">
            DỰ ÁN NỔI BẬT
          </p> */}
          <h1 className="text-2xl md:text-[28px] font-bold text-gray-900 leading-tight">
            {dataDetails?.title || ""}
          </h1>
          <div className="text-sm text-gray-500">
            <span className="text-green-600 font-medium hover:underline">
              {dataDetails?.organization?.organizationName || ""}
            </span>
            <p className="text-xs text-gray-500 pl-1">{dataDetails?.address}</p>

            {/* <span className="mx-2 text-gray-300">|</span>
            <span>Đã quyên góp được 120 triệu VND</span> */}
          </div>
        </header>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Ảnh chiếm 2 cột */}
          <div className="relative w-full overflow-hidden rounded-2xl  lg:col-span-2">
            <MediaCarousel
              images={dataDetails?.images || []}
              video={dataDetails?.video}
            />

            {/* <figure>
              {thumbnail?.imageUrl && (
                <Image
                  src={thumbnail?.imageUrl}
                  alt={thumbnail?.imageUrl || "thumbnail"}
                  width={960}
                  height={540}
                  className="w-full h-auto max-h-[420px] object-cover"
                  priority
                />
              )}
            </figure> */}
            <section className="mt-5 bg-white rounded-2xl space-y-6">
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

                <div className="flex justify-between pt-2">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={handleLike}
                      className="inline-flex items-center gap-2 px-4 py-2 cursor-pointer rounded-full border border-gray-200 bg-white text-xs font-medium text-gray-600 hover:bg-gray-100 transition "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        className={`w-5 h-5 transition-all ${
                          liked
                            ? "fill-green-600 text-green-600 "
                            : "fill-none stroke-gray-400"
                        }`}
                        strokeWidth="1.8"
                      >
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                      </svg>
                      <div
                        className={`inline-flex items-center  ${
                          liked ? "text-green-600" : "text-gray-400"
                        }`}
                      >
                        Thích
                      </div>
                    </button>
                    <div className="inline-flex items-center text-gray-400 text-xl font-medium">
                      {likedPosts}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-gray-500 font-[600] text-[14px]">{`${dataDetails?.viewCount} Lượt xem`}</div>
                  </div>
                  {/* <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer border border-gray-200 bg-white text-xs font-medium text-gray-600 hover:bg-gray-100 transition">
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
                  </button> */}
                </div>
              </div>
              <div className="flex gap-6 border-b mb-6">
                <button
                  type="button"
                  className={`pb-0.5 transition cursor-pointer ${
                    activeTab === "postUpdate"
                      ? "border-b-2 border-green-700 text-green-700 font-semibold"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("postUpdate")}
                >
                  Báo cáo
                </button>

                <button
                  type="button"
                  className={`pb-0.5 transition cursor-pointer ${
                    activeTab === "donator"
                      ? "border-b-2 border-green-700 text-green-700 font-semibold"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("donator")}
                >
                  Danh sách ủng hộ
                </button>
              </div>
              {activeTab === "postUpdate" && (
                <div className=" space-y-5">
                  {/* <h3 className="text-lg font-semibold text-gray-800">
                  Cập nhật
                </h3> */}
                  {dataDetails?.payouts?.length === 0 && (
                    <p className="text-gray-500 text-sm pb-1">
                      Chưa có đợt giải ngân nào.
                    </p>
                  )}
                  {dataDetails?.payouts?.map((payout) => {
                    const hasUpdate = payout.postUpdate != null;

                    return (
                      <div
                        key={payout.id}
                        className=" bg-white rounded-xl space-y-4"
                      >
                        {/* Dòng thông tin chính */}
                        <div className="flex items-center justify-between ">
                          <div className="flex items-center w-full">
                            <span className="text-sm font-semibold text-gray-600 whitespace-nowrap">
                              Đã nhận {formatNumber(payout.adminTransferAmount)}{" "}
                              VND
                            </span>

                            {/* Đường kẻ */}
                            <div className="flex-1 border-b border-gray-300 mx-3"></div>
                          </div>

                          <span className="text-xs text-gray-500 mt-1">
                            {Utils.getDateDayjs(payout.confirmedAt)}
                          </span>
                        </div>

                        {/* Nếu có postUpdate */}
                        {hasUpdate && (
                          <div className="flex flex-col mt-3 p-4 rounded-lg space-y-3">
                            {/* Ảnh update */}

                            <div>
                              {/* Nội dung */}
                              <p className="text-sm text-gray-700 whitespace-pre-line">
                                {payout.postUpdate.content}
                              </p>
                              {/* Ngày update */}
                              {/* <p className="text-xs text-gray-500">
                              Cập nhật lúc:{" "}
                              {Utils.getDateDayjs(payout.postUpdate.createdAt)}
                            </p> */}
                            </div>
                            <div>
                              {payout.postUpdate.imagePostUpdateUrl && (
                                <Image
                                  src={payout.postUpdate.imagePostUpdateUrl}
                                  width={400}
                                  height={400}
                                  alt="post update"
                                  className="rounded-lg object-cover"
                                />
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
              {activeTab === "donator" && (
                <div className="space-y-2 p-2">
                  {donators && donators.length > 0 ? (
                    <>
                      {/* Hiển thị 5 donate đầu tiên */}
                      {donators.slice(0, 5).map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-2 rounded-xl shadow-sm bg-white"
                        >
                          {/* Avatar + Tên */}
                          <div className="flex items-center gap-3">
                            {/* Avatar hoặc icon */}
                            {/* Thay thế thẻ img bằng Image của Next.js */}
                            <div className="relative w-8 h-8 flex-shrink-0">
                              {item.user?.status === 20 &&
                              item.user?.imageUser ? (
                                <Image
                                  src={item.user.imageUser}
                                  alt="avatar"
                                  fill // Tự động fill theo size cha (w-12 h-12)
                                  className="rounded-full object-cover"
                                  sizes="48px"
                                />
                              ) : item.user?.organization?.organizationLogo ? (
                                <Image
                                  src={item.user.organization.organizationLogo}
                                  alt="org avatar"
                                  fill
                                  className="rounded-full object-cover"
                                  sizes="48px"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center">
                                  <HandCoins className="w-6 h-6 text-gray-500" />
                                </div>
                              )}
                            </div>

                            <div>
                              <p className="font-medium text-[14px] text-gray-800">
                                {item.user?.status == 20
                                  ? `${item.user?.firstName} ${item.user?.lastName}`
                                  : item.user?.organization?.organizationName}
                              </p>
                              <p className="text-[13px] text-gray-500">
                                {item.description}
                              </p>
                            </div>
                          </div>

                          {/* Số tiền */}
                          <div className="text-right">
                            <p className="font-medium text-[14px] text-green-600">
                              {item.amount.toLocaleString()} ₫
                            </p>
                            <p className="text-[12px] text-gray-500">
                              {Utils.getDateDayjs(item.createdAt)}
                            </p>
                          </div>
                        </div>
                      ))}

                      {/* Nút xem tất cả */}
                      {donators.length > 5 && (
                        <div className="text-center">
                          <button
                            onClick={() => setShowAllDonators(true)}
                            className="text-blue-600 underline font-medium cursor-pointer"
                          >
                            Xem tất cả ({donators.length})
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-center text-gray-500 italic">
                      Chưa có giao dịch ủng hộ nào.
                    </p>
                  )}
                </div>
              )}

              {/* <h3 className="text-lg font-semibold text-gray-800">
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
          <DonateContent
            dataDonatedAmount={dataDetails?.donatedAmount}
            donationCount={dataDetails?.donationCount || 0}
            listDataDonated={listDataDonated}
            handleCreateDonate={handleCreateDonate}
            setShowAllDonators={setShowAllDonators}
            postUrl={typeof window !== "undefined" ? window.location.href : ""}
          />
        </div>

        <section className="mt-10 space-y-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                  {dataDetails?.organization && (
                    <Image
                      src={dataDetails.organization.organizationLogo}
                      alt="user"
                      width={40}
                      height={40}
                      className="w-10 h-10 object-cover rounded-full"
                    />
                  )}
                </div>

                <div>
                  <h2
                    className="text-sm font-semibold text-gray-900 cursor-pointer hover:underline"
                    onClick={() =>
                      handleClick(dataDetails?.organization?.userId)
                    }
                  >
                    {dataDetails?.organization?.organizationName}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {dataDetails?.organization?.category?.categoryName}{" "}
                    {/* {dataDetails?.organization?.lastName} */}
                  </p>
                </div>
              </div>
              {/* 
              <div className="flex gap-2">
                <button className="rounded-full bg-green-100 text-green-700 px-4 py-1 text-xs font-semibold hover:bg-green-200 transition">
                  Liên hệ
                </button>
              </div> */}
            </div>
          </div>

          {/* chèn comment ở đây */}
          <CommentSection postId={id} checkActiveStatus={checkActiveStatus} />
        </section>
        {dataPosts && dataPosts.length > 0 && (
          <section className="mt-12 space-y-6">
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                Bài viết tương tự
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {dataPosts.map((post) => (
                <PostItem
                  key={post.id}
                  id={post.id}
                  image={
                    post.images?.[0]?.imageUrl || "/images/default-image.png"
                  }
                  title={post.title}
                  group={post.category?.categoryName}
                  raised={post?.donatedAmount} // nếu bạn chưa có số tiền quyên góp → set 0
                  goal={post.targetAmount}
                />
              ))}
            </div>
          </section>
        )}
      </section>
    </div>
  );
}
