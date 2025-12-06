import { useState, useEffect } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import Constants from "@/utils/Constants";
import commentFactory from "@/redux/comment/factory";

export default function CommentSection({ postId }) {
  const currentUser = useSelector((state) => state.user.dataUser);
  const isAuthor =
    currentUser?.role === Constants.ROLES.AUTHOR ||
    currentUser?.status === Constants.STATUS_USER.AUTHOR;
  const avatar = isAuthor
    ? currentUser?.organizationLogo
    : currentUser?.imageUser;

  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [comments, setComments] = useState([]);

  // Load comment khi mount
  useEffect(() => {
    if (!postId) return;
    commentFactory
      .getCommentsByPost(postId)
      .then((data) => setComments(data?.result || [])); // sửa từ results -> result
  }, [postId]);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const trimmed = (text || "").trim();
    if (!trimmed || !currentUser) return;

    const request = {
      content: trimmed,
      postId: postId,
      ...(replyTo && { parentCommentId: replyTo.id }),
    };

    try {
      await commentFactory.createComment(currentUser.id, request);

      // Sau khi tạo comment thành công, load lại danh sách comment
      const data = await commentFactory.getCommentsByPost(postId);
      setComments(data?.result || []);

      setText("");
      setReplyTo(null);
    } catch (error) {
      console.error("Create comment failed:", error);
    }
  };

  const startReply = (comment) => {
    setReplyTo(comment);
    setText(`@${comment.userName} `);
  };

  const handleDelete = async (commentId) => {
    if (!currentUser) return;
    try {
      await commentFactory.deleteComment(currentUser.id, commentId);
      // Xóa khỏi state
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (error) {
      console.error("Delete comment failed:", error);
    }
  };
  console.log("comments", comments);
  return (
    <div className="mt-6">
      {/* Input bình luận */}
      <form onSubmit={handleSubmit} className="flex items-start gap-5">
        <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          <Image
            src={avatar || "/images/default-avatar.png"}
            alt="avatar"
            width={36}
            height={36}
            className="w-9 h-9 object-cover rounded-full"
          />
        </div>
        <div className="flex-1">
          <div className="flex-1 relative">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={replyTo ? "Đang trả lời..." : "Viết bình luận..."}
              className="text-gray-600 w-full bg-transparent py-2 pr-12 text-sm placeholder:text-gray-400 border-b border-gray-300 focus:border-b-2 focus:border-gray-600 focus:outline-none transition"
            />

            <button
              type="submit"
              className="text-green-600 absolute right-0 top-1/2 -translate-y-1/2 px-2 py-1 text-sm font-medium hover:text-green-700 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              disabled={!text.trim()}
            >
              Gửi
            </button>
          </div>

          {replyTo && (
            <p className="text-xs text-green-600 mt-1">
              Đang trả lời bình luận...
              <button
                type="button"
                className="text-red-500 ml-2 cursor-pointer hover:text-red-700"
                onClick={() => {
                  setReplyTo(null);
                  setText("");
                }}
              >
                Hủy
              </button>
            </p>
          )}
        </div>
      </form>

      {/* Danh sách bình luận */}
      <div className="mt-4 space-y-6">
        {comments?.length === 0 && (
          <p className="text-sm text-gray-400">
            Chưa có bình luận nào — hãy là người đầu tiên!
          </p>
        )}

        {comments?.map((c) => (
          <div key={c.id} className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                <Image
                  src={c.avatar || "/images/default-avatar.png"}
                  alt={c.userName}
                  width={32}
                  height={32}
                  className="w-8 h-8 object-cover rounded-full"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="text-sm font-semibold text-gray-600">
                      {c.userName}
                    </div>
                    <div className="text-[14px] text-gray-700">{c.content}</div>
                  </div>
                </div>
                <div className="flex gap-2 text-xs text-gray-400">
                  {new Date(c.createdAt).toLocaleString("vi-VN")}{" "}
                  {currentUser?.id === c.userId && (
                    <button
                      className="text-xs cursor-pointer hover:text-red-500 "
                      onClick={() => handleDelete(c.id)}
                    >
                      Xóa
                    </button>
                  )}
                  <button
                    onClick={() => startReply(c)}
                    className="text-xs  hover:text-green-700 cursor-pointer "
                  >
                    Trả lời
                  </button>
                </div>
              </div>
            </div>

            {/* Reply */}
            {c.replies && c.replies.length > 0 && (
              <div className="ml-10 space-y-3 border-l border-gray-200 pl-4">
                {c.replies.map((r) => (
                  <div key={r.id} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-200">
                      <Image
                        src={r.avatar || "/images/default-avatar.png"}
                        alt={r.userName}
                        width={28}
                        height={28}
                        className="w-7 h-7 object-cover rounded-full"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-gray-900">
                        {r.userName}
                      </div>
                      <div className="mt-1 text-sm text-gray-700">
                        {r.content}
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(r.createdAt).toLocaleString("vi-VN")}
                        {currentUser?.id === r.userId && (
                          <button
                            className="ml-2 text-xs cursor-pointer hover:text-red-500 "
                            onClick={() => handleDelete(r.id)}
                          >
                            Xóa
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
