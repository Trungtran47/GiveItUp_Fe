"use client";
import PostItem from "@/containers/users/home/components/PostItem";
import followFactory from "@/redux/follow/factory";
import postFactory from "@/redux/post/factory";
import userFactory from "@/redux/user/factory";
import Utils, { getToast } from "@/utils/Utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AiOutlineCalendar,
  AiOutlineCheckCircle,
  AiOutlineEnvironment,
  AiOutlineLink,
  AiOutlineMail,
  AiOutlinePhone,
} from "react-icons/ai";
import { useSelector } from "react-redux";

// 1. ĐỊNH NGHĨA TRẠNG THÁI
const POST_STATUS = {
  ACTIVE: 20, // Đang hoạt động
  INACTIVE: 30, // Hết hạn/Tạm dừng
  COMPLETE: 50, // Hoàn thành
};

export default function ShowProfilePage() {
  const { id } = useParams();
  const currentUser = useSelector((state) => state.user.dataUser);

  const [dataUser, setDataUser] = useState(null);
  const [dataPosts, setDataPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("campaigns"); // campaigns | about

  // 1. Lấy thông tin User/Author
  const getUserData = async () => {
    const res = await userFactory.getUserById(id);
    if (res?.code === 200) {
      setDataUser(res?.result);
    }
  };

  // 2. Lấy danh sách bài viết
  const getPostsData = async (orgId) => {
    const res = await postFactory.getPostByOrganizationId(orgId, null);
    if (res?.code === 200) {
      setDataPosts(res?.result?.Data || []);
    }
  };

  // 3. Xử lý Follow/Unfollow (Giữ nguyên)
  const toggleFollow = async () => {
    if (currentUser?.id == id) {
      getToast("Bạn không thể theo dõi chính mình", "error");
      return;
    }
    if (!currentUser) {
      getToast("Vui lòng đăng nhập để theo dõi", "warn");
      return;
    }

    try {
      const res = await followFactory.toggleFollow(currentUser?.id, id);
      if (res?.code === 200) {
        setDataUser((prev) => ({
          ...prev,
          isFollowing: !prev.isFollowing,
          totalFollowers: prev.isFollowing
            ? prev.totalFollowers - 1
            : prev.totalFollowers + 1,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) getUserData();
  }, [id]);

  useEffect(() => {
    if (dataUser?.organization?.id) {
      getPostsData(dataUser.organization.id);
    }
  }, [dataUser]);

  // --- LOGIC LỌC BÀI VIẾT ---

  // Tab Chiến dịch: Hiển thị Active (20), Inactive (30), Complete (50)
  const campaignList = dataPosts.filter((post) =>
    [POST_STATUS.ACTIVE, POST_STATUS.INACTIVE, POST_STATUS.COMPLETE].includes(
      post.status
    )
  );

  // Tab Hoạt động: Chỉ hiển thị Active (20)
  const activeList = dataPosts.filter(
    (post) => post.status === POST_STATUS.ACTIVE
  );

  // ------------------------------------

  if (!dataUser)
    return (
      <div className="text-center py-20 text-gray-500">
        Đang tải thông tin...
      </div>
    );

  const isAuthor = dataUser.role === "AUTHOR";
  const org = dataUser.organization;

  const displayName = isAuthor
    ? org?.organizationName
    : `${dataUser.firstName} ${dataUser.lastName}`;
  const avatarUrl = isAuthor ? org?.organizationLogo : dataUser.imageUser;
  const coverImage = "/images/default-cover.jpg";

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* ... (PHẦN COVER & AVATAR GIỮ NGUYÊN) ... */}
      <div className="bg-white shadow-sm">
        <div className="relative w-full h-[250px] md:h-[320px]">
          <img
            src={coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
            onError={(e) =>
              (e.target.src =
                "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop")
            }
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="absolute -top-16 left-4 md:left-8 border-4 border-white rounded-full bg-white shadow-md w-32 h-32 md:w-40 md:h-40 overflow-hidden">
            <img
              src={avatarUrl || "/images/default-avatar.png"}
              alt={displayName}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="pl-36 md:pl-48 pt-4 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
                {displayName}
                {isAuthor && (
                  <AiOutlineCheckCircle
                    className="text-blue-500 text-xl"
                    title="Tổ chức đã xác minh"
                  />
                )}
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {isAuthor
                  ? `@${org?.category?.categoryName || "Tổ chức từ thiện"}`
                  : `@${dataUser.username}`}
              </p>

              <div className="flex gap-6 mt-3 text-sm text-gray-600">
                <div>
                  <strong className="text-black text-lg">
                    {dataUser.totalFollowers || 0}
                  </strong>{" "}
                  người theo dõi
                </div>
                <div>
                  <strong className="text-black text-lg">
                    {dataUser.totalFollowing || 0}
                  </strong>{" "}
                  đang theo dõi
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-2 md:mt-0">
              {currentUser?.id === dataUser.id ? null : (
                // (
                // <button className="px-6 py-2 border border-gray-300 rounded-full font-semibold text-gray-700 hover:bg-gray-100 transition">
                //   Chỉnh sửa trang cá nhân
                // </button>
                // )
                <button
                  onClick={toggleFollow}
                  className={`px-8 py-2 rounded-full font-semibold transition shadow-sm ${
                    dataUser.isFollowing
                      ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  {dataUser.isFollowing ? "Đang theo dõi" : "Theo dõi"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- CONTENT SECTION (2 CỘT) --- */}
      <div className="container mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CỘT TRÁI: THÔNG TIN GIỚI THIỆU (GIỮ NGUYÊN) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg text-gray-800 mb-4 border-b pb-2">
              Giới thiệu
            </h3>

            <div className="space-y-4 text-sm text-gray-600">
              {isAuthor && org?.organizationDescription ? (
                <p className="whitespace-pre-wrap leading-relaxed break-words w-full">
                  {org.organizationDescription}
                </p>
              ) : (
                <p className="italic text-gray-400">
                  Chưa có thông tin giới thiệu.
                </p>
              )}

              <div className="pt-2 space-y-3">
                {isAuthor && org?.establishmentDate && (
                  <div className="flex items-center gap-3">
                    <AiOutlineCalendar className="text-xl text-gray-400" />
                    <span>
                      Thành lập:{" "}
                      <strong>
                        {Utils.getDateDayjs(org.establishmentDate)}
                      </strong>
                    </span>
                  </div>
                )}

                {(dataUser.email || org?.organizationEmail) && (
                  <div className="flex items-center gap-3">
                    <AiOutlineMail className="text-xl text-gray-400" />
                    <span>{org?.organizationEmail || dataUser.email}</span>
                  </div>
                )}

                {(dataUser.phoneNumber || org?.organizationPhone) && (
                  <div className="flex items-center gap-3">
                    <AiOutlinePhone className="text-xl text-gray-400" />
                    <span>
                      {org?.organizationPhone || dataUser.phoneNumber}
                    </span>
                  </div>
                )}

                {isAuthor && org?.organizationAddress && (
                  <div className="flex items-start gap-3">
                    <AiOutlineEnvironment className="text-xl text-gray-400 mt-0.5" />
                    <span>{org.organizationAddress}</span>
                  </div>
                )}

                {isAuthor && org?.linkInfoOrganization && (
                  <div className="flex items-center gap-3">
                    <AiOutlineLink className="text-xl text-gray-400" />
                    <a
                      href={org.linkInfoOrganization}
                      target="_blank"
                      rel="noreferrer"
                      className="text-green-600 hover:underline truncate"
                    >
                      {org.linkInfoOrganization}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: DANH SÁCH BÀI ĐĂNG (CHIẾN DỊCH & HOẠT ĐỘNG) */}
        <div className="lg:col-span-2">
          {/* Tabs Navigation */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6 flex overflow-hidden">
            <button
              onClick={() => setActiveTab("campaigns")}
              className={`flex-1 py-4 text-center font-semibold transition ${
                activeTab === "campaigns"
                  ? "text-green-600 border-b-2 border-green-600 bg-green-50"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              {/* Hiển thị số lượng của các bài 20, 30, 50 */}
              Chiến dịch gây quỹ ({campaignList.length})
            </button>
            <button
              onClick={() => setActiveTab("about")}
              className={`flex-1 py-4 text-center font-semibold transition ${
                activeTab === "about"
                  ? "text-green-600 border-b-2 border-green-600 bg-green-50"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              {/* Hiển thị số lượng của bài đang Active */}
              Đang hoạt động ({activeList.length})
            </button>
          </div>

          {/* === TAB 1: CHIẾN DỊCH GÂY QUỸ (20, 30, 50) === */}
          {activeTab === "campaigns" && (
            <div className="flex flex-col gap-6">
              {campaignList.length > 0 ? (
                campaignList.map((item) => (
                  <PostItem
                    key={item.id}
                    id={item.id}
                    image={
                      item.images?.find((img) => img.isThumbnail)?.imageUrl ||
                      item.images?.[0]?.imageUrl ||
                      "/images/default-image.png"
                    }
                    title={item.title}
                    group={item.category?.categoryName}
                    raised={item?.donatedAmount || 0}
                    goal={item.targetAmount}
                    authorName={displayName}
                    authorAvatar={avatarUrl}
                    createdAt={item.createdAt}
                    // Có thể truyền thêm status để hiển thị badge trạng thái nếu cần
                    // status={item.status}
                  />
                ))
              ) : (
                <div className="bg-white p-10 rounded-2xl text-center shadow-sm">
                  {/* <img
                    src="/images/empty-box.png"
                    alt="Empty"
                    className="w-20 mx-auto opacity-50 mb-4"
                  /> */}
                  <p className="text-gray-500">Chưa có chiến dịch nào.</p>
                </div>
              )}
            </div>
          )}

          {/* === TAB 2: HOẠT ĐỘNG (CHỈ ACTIVE 20) === */}
          {activeTab === "about" && (
            <div className="flex flex-col gap-6">
              {activeList.length > 0 ? (
                activeList.map((item) => (
                  <PostItem
                    key={item.id}
                    id={item.id}
                    image={
                      item.images?.find((img) => img.isThumbnail)?.imageUrl ||
                      item.images?.[0]?.imageUrl ||
                      "/images/default-image.png"
                    }
                    title={item.title}
                    group={item.category?.categoryName}
                    raised={item?.donatedAmount || 0}
                    goal={item.targetAmount}
                    authorName={displayName}
                    authorAvatar={avatarUrl}
                    createdAt={item.createdAt}
                  />
                ))
              ) : (
                <div className="bg-white p-10 rounded-2xl text-center shadow-sm">
                  {/* <img
                    src="/images/empty-box.png"
                    alt="Empty"
                    className="w-20 mx-auto opacity-50 mb-4"
                  /> */}
                  <p className="text-gray-500">
                    Hiện chưa có chiến dịch nào đang hoạt động.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
