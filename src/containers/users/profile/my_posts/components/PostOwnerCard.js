import Image from "next/image";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Utils, { formatNumber } from "@/utils/Utils";
import PostMediaGrid from "@/containers/users/profile/my_posts/components/image/PostMediaGrid";
import { useRouter } from "next/navigation";

export default function PostOwnerCard({
  post,
  onEdit,
  onDelete,
  onRequestPayout,
  onDeletePayout,
  onConfirmTransfer,
  onCreatePostUpdate,
}) {
  const {
    title,
    description,
    donatedAmount,
    targetAmount,
    viewCount,
    likeCount,
    createdAt,
    user,
    statusName,
    status,
    payouts,
    reason,
  } = post;
  const router = useRouter();
  const progress = Math.min((donatedAmount / targetAmount) * 100, 100);
  const media = [];
  if (post.images?.length > 0) {
    post.images.forEach((img) =>
      media.push({ type: "image", url: img.imageUrl })
    );
  }

  if (post.video) {
    media.push({ type: "video", url: post.video });
  }
  const handleClick = (id) => {
    router.push(`/project/${id}`);
  };

  const pendingPayout = payouts?.find((p) => p.status == 10);
  const transferredPayout = payouts?.find((p) => p.status == 20);
  const confirmedPayout = payouts?.find((p) => p.status == 30);
  const rejectedPayout = payouts?.find((p) => p.status == 40);
  // Hàm xác định màu dựa trên status ID
  const getStatusColor = (status) => {
    switch (status) {
      case 20: // Đang hoạt động
        return "text-green-600";
      case 10: // Chờ duyệt
        return "text-blue-600";
      case 90: // Từ chối
      case 91: // Bị chặn
        return "text-red-600";
      case 50: // Hoàn thành
        return "text-cyan-600";
      case 30: // Hết hạn/Tạm dừng
        return "text-orange-500";
      default:
        return "text-gray-500";
    }
  };
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 min-w-[672px] max-w-2xl border">
      {/* Header */}
      <div className="flex items-center gap-3 ">
        {/* <Image
          src={user?.organizationLogo || "/default-avatar.png"}
          alt="avatar"
          width={50}
          height={50}
          className="rounded-full object-cover"
        /> */}
        <div>
          {/* <p className="font-semibold text-gray-500">
            {user?.organizationName}
          </p> */}
          <p className="text-sm text-gray-500">
            {Utils.getDateDayjs(createdAt)}
            {"   "}
            {/* Áp dụng màu và in đậm cho trạng thái */}
            <span className={`font-medium ${getStatusColor(post.status)}`}>
              {statusName}
            </span>

            {/* Phần lý do giữ nguyên màu xám hoặc đỏ tùy ý */}
            {reason && (
              <span className="text-gray-400"> - Lý do: {reason}</span>
            )}
          </p>
        </div>
      </div>
      <h2
        className="text-xl font-bold mb-2 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-300"
        onClick={() => handleClick(post.id)}
      >
        {title}
      </h2>
      <p className="text-gray-600 line-clamp-3 mb-3">{description}</p>
      <PostMediaGrid media={media} />
      {/* Progress section */}
      <div className="my-3">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium text-green-600">
            {formatNumber(donatedAmount)} VND đã nhận
          </span>
          <span className="text-gray-500">
            Mục tiêu {formatNumber(targetAmount)} VND
          </span>
        </div>

        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div
            className="bg-green-500 h-full rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      {/* Bottom info */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-2 text-gray-600 text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className={"w-5 h-5 transition-all fill-none stroke-gray-400"}
            strokeWidth="1.8"
          >
            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
          </svg>
          <span>{likeCount} </span>
          <Eye size={18} />
          <span>{viewCount} lượt xem</span>
        </div>

        <div className="flex gap-3">
          <button
            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 cursor-pointer"
            onClick={() => onEdit(post)}
          >
            <Pencil size={18} />
          </button>
          {status == 10 && (
            <button
              className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 cursor-pointer"
              onClick={() => onDelete(post)}
            >
              <Trash2 size={18} />
            </button>
          )}
          {/* === NÚT YÊU CẦU RÚT TIỀN === */}
          {!pendingPayout && !transferredPayout && post?.donatedAmount > 0 && (
            <button
              className="px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 text-sm cursor-pointer"
              onClick={() => onRequestPayout(post)}
            >
              Yêu cầu rút tiền
            </button>
          )}
        </div>
      </div>
      {/* --- PENDING PAYOUT --- */}
      {pendingPayout && (
        <div className="mt-4  border border-yellow-200 p-3 rounded-lg">
          <p className="font-medium text-yellow-700">
            Yêu cầu rút tiền đang chờ duyệt
          </p>
          <p className="text-amber-600">
            Số tiền: {formatNumber(pendingPayout.amount)} VND
          </p>
          <p className="text-gray-600">Ghi chú: {pendingPayout.note}</p>

          <div className="flex gap-2 mt-2">
            <button
              className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
              onClick={() => onRequestPayout(post, pendingPayout)}
            >
              Sửa yêu cầu
            </button>

            <button
              className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
              onClick={() => onDeletePayout(pendingPayout)}
            >
              Xoá yêu cầu
            </button>
          </div>
        </div>
      )}
      {/* --- TRANSFERRED PAYOUT --- */}
      {transferredPayout && (
        <div className="mt-4 bg-green-50 border border-green-200 p-3 rounded-lg">
          <p className="font-medium text-green-700">Tiền đã được chuyển</p>
          <p className="text-gray-600">
            Số tiền: {formatNumber(transferredPayout.amount)} VND
          </p>

          <button
            className="mt-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-sm cursor-pointer"
            onClick={() => onConfirmTransfer(transferredPayout)}
          >
            Xác nhận đã nhận tiền
          </button>
        </div>
      )}
      {/* --- CONFIRMED PAYOUT --- */}
      {confirmedPayout && !confirmedPayout?.postUpdate && (
        <div className="mt-4 bg-gray-50 border border-gray-200 p-3 rounded-lg">
          <p className="font-medium text-gray-700">
            Tiền đã được xác nhận nhận
          </p>
          <p className="text-gray-600">
            Số tiền: {formatNumber(confirmedPayout.amount)} VND
          </p>
          <button
            className="mt-3 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm cursor-pointer"
            onClick={() =>
              onCreatePostUpdate(post.id, confirmedPayout.id, post.title)
            }
          >
            Tạo cập nhật bài đăng
          </button>
        </div>
      )}
      {confirmedPayout?.postUpdate && (
        <div className="mt-4  border-t border-gray-200 p-3 rounded-lg">
          <p className="font-medium text-gray-700">
            Đã nhận {formatNumber(confirmedPayout.adminTransferAmount) + " VND"}
          </p>
          <p
            className="text-blue-400 hover:text-blue-700 cursor-pointer"
            onClick={() => handleClick(post.id)}
          >
            Xem thêm cập nhật bài đăng ngày
            {" - "}
            {Utils.getDateDayjs(confirmedPayout.postUpdate.createdAt)}
          </p>
        </div>
      )}
      {/* --- REJECTED PAYOUT --- */}
      {rejectedPayout && (
        <div className="mt-4  border border-red-200 p-3 rounded-lg">
          <p className="font-medium text-red-700">
            Yêu cầu rút tiền bị từ chối
          </p>
          <p className="text-red-600">
            Số tiền: {formatNumber(rejectedPayout.amount)} VND
          </p>
          <p className="text-gray-600">Lý do: {rejectedPayout.noteAdmin}</p>
        </div>
      )}
    </div>
  );
}
