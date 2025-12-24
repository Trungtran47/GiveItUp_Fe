import { useState, useEffect } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import Constants from "@/utils/Constants";
import commentFactory from "@/redux/comment/factory";
import { CgSpinner } from "react-icons/cg";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
  AiOutlineSend,
} from "react-icons/ai";
import { BsArrowReturnRight } from "react-icons/bs";
import IconUser from "@/assets/icons/ic-user";
import Utils from "@/utils/Utils";

// ==========================================
// 1. COMPONENT INPUT BÌNH LUẬN
// ==========================================
const CommentInput = ({
  avatar,
  onSubmit,
  placeholder = "Viết bình luận...",
  replyToUser = null,
  onCancel,
  autoFocus = false,
}) => {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setError(null);
    setIsLoading(true);

    const content = replyToUser ? `@${replyToUser} ${text}` : text;

    try {
      await onSubmit(content);
      setText("");
      setIsFocused(false);
    } catch (err) {
      // --- [SỬA] XỬ LÝ LỖI LINH HOẠT ---
      let message = "Có lỗi xảy ra";

      if (typeof err === "string") {
        message = err; // Nếu throw "Chuỗi lỗi"
      } else if (err?.message) {
        message = err.message; // Nếu throw new Error(...)
      } else if (typeof err === "object") {
        // Dự phòng nếu trả về object lạ
        message = JSON.stringify(err);
      }

      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setText("");
    setError(null);
    setIsFocused(false);
    if (onCancel) onCancel();
  };

  const showButtons = isFocused || text.trim().length > 0 || replyToUser;

  return (
    <div className="flex items-start gap-3 w-full mt-2 pb-2">
      {avatar ? (
        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 mt-1">
          <Image
            src={avatar || "/images/default-avatar.png"}
            alt="avatar"
            width={34}
            height={34}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <IconUser />
      )}

      <div className="flex-1">
        <form onSubmit={handleSubmit}>
          <div
            className={`flex items-center border-b transition-colors  ${
              isFocused ? "border-black" : "border-gray-300"
            }`}
          >
            {replyToUser && (
              <span className="text-sm font-bold text-black mr-1 whitespace-nowrap  px-1 rounded">
                @{replyToUser}
              </span>
            )}

            <input
              autoFocus={autoFocus}
              value={text}
              disabled={isLoading}
              onFocus={() => setIsFocused(true)}
              onChange={(e) => {
                setText(e.target.value);
                if (error) setError(null);
              }}
              placeholder={placeholder}
              className="flex-1 bg-transparent py-1 text-sm text-gray-700 placeholder:text-gray-400 border-none outline-none focus:ring-0 disabled:opacity-50"
            />
          </div>

          {/* --- [SỬA] HIỂN THỊ LỖI (FIX LỖI OBJECT CHILD) --- */}

          {showButtons && (
            <div className="flex justify-between">
              <p className="text-red-600 text-xs animate-pulse font-medium">
                {error}
              </p>

              <div className="flex justify-end items-center gap-3 mt-2 animate-fadeIn">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="text-xs text-gray-500 hover:text-gray-700 font-medium px-3 py-1 rounded hover:bg-gray-100 transition disabled:opacity-50"
                >
                  Hủy
                </button>

                <button
                  type="submit"
                  disabled={!text.trim() || isLoading}
                  className={`px-3 py-1 text-xs font-semibold rounded-full transition flex items-center gap-1
                  ${
                    text.trim() && !isLoading
                      ? "bg-[#017C18] text-white hover:bg-[#015a13] cursor-pointer"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {isLoading ? (
                    <>
                      Đang gửi... <CgSpinner className="animate-spin" />
                    </>
                  ) : (
                    <>
                      Gửi <AiOutlineSend />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

// ==========================================
// 2. HELPER & ITEM (GIỮ NGUYÊN)
// ==========================================
const CommentContent = ({ content }) => {
  const parts = content.split(" ");
  return (
    <div className="text-[14px] text-gray-700 leading-relaxed whitespace-pre-wrap">
      {parts.map((word, index) => {
        if (index === 0 && word.startsWith("@")) {
          return (
            <span key={index} className="  mr-1">
              {word}
            </span>
          );
        }
        return <span key={index}>{word} </span>;
      })}
    </div>
  );
};

const CommentItem = ({
  comment,
  currentUser,
  userAvatar,
  handleReaction,
  handleReplySubmit,
  handleDelete,
  activeReplyId,
  setActiveReplyId,
}) => {
  const [showReplies, setShowReplies] = useState(false);
  const isReplying = activeReplyId === comment.id;
  const hasReplies = comment.replies && comment.replies.length > 0;

  const onReplySubmit = async (content) => {
    try {
      await handleReplySubmit(content, comment.id);
      setActiveReplyId(null);
      setShowReplies(true);
    } catch (error) {
      throw error; // Ném tiếp lỗi lên để CommentInput của Reply bắt
    }
  };

  const handleStartReply = () => {
    if (isReplying) {
      setActiveReplyId(null);
    } else {
      setActiveReplyId(comment.id);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-2 group">
        {comment.avatar ? (
          <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
            <Image
              src={comment.avatar || "/images/default-avatar.png"}
              alt={comment.userName}
              width={36}
              height={36}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <IconUser width={30} height={30} />
        )}

        <div className="flex-1">
          <div className="bg-gray-50 rounded-2xl px-4 py-1 inline-block">
            <div className="text-sm font-bold text-gray-800">
              {comment.userName}
            </div>
            <CommentContent content={comment.content} />
          </div>

          <div className="flex items-center gap-4 mt-1 ml-2">
            <button
              onClick={() => handleReaction(comment.id, "LIKE")}
              className={`flex items-center gap-1 text-xs font-semibold transition cursor-pointer ${
                comment.myReaction === "LIKE"
                  ? "text-[#017C18]"
                  : "text-gray-500 hover:text-[#017C18]"
              }`}
            >
              {comment.myReaction === "LIKE" ? (
                <AiFillLike />
              ) : (
                <AiOutlineLike />
              )}
              <span>{comment.likeCount > 0 ? comment.likeCount : "Thích"}</span>
            </button>

            <button
              onClick={() => handleReaction(comment.id, "DISLIKE")}
              className={`flex items-center gap-1 text-xs font-semibold transition cursor-pointer ${
                comment.myReaction === "DISLIKE"
                  ? "text-red-500"
                  : "text-gray-500 hover:text-red-500"
              }`}
            >
              {comment.myReaction === "DISLIKE" ? (
                <AiFillDislike />
              ) : (
                <AiOutlineDislike />
              )}
              <span>
                {comment.dislikeCount > 0 ? comment.dislikeCount : ""}
              </span>
            </button>

            <button
              onClick={handleStartReply}
              className="text-xs text-gray-500 font-bold hover:text-gray-800 cursor-pointer"
            >
              Phản hồi
            </button>

            <span className="text-xs text-gray-400 font-medium">
              {Utils.getDateDayjs(comment.createdAt)}
            </span>

            {currentUser?.id === comment.userId && (
              <button
                className="text-xs font-medium text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleDelete(comment.id)}
              >
                Xóa
              </button>
            )}
          </div>

          {isReplying && (
            <div className="mt-2 ml-2">
              <CommentInput
                avatar={userAvatar}
                placeholder={`Trả lời...`}
                replyToUser={comment.userName}
                onSubmit={onReplySubmit}
                onCancel={() => setActiveReplyId(null)}
                autoFocus={true}
              />
            </div>
          )}
        </div>
      </div>

      {hasReplies && (
        <div className="ml-12">
          {!showReplies ? (
            <button
              onClick={() => setShowReplies(true)}
              className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:underline my-1"
            >
              <BsArrowReturnRight className="rotate-180" />
              Xem {comment.replies.length} phản hồi
            </button>
          ) : (
            <div className="border-l-2 border-gray-200 pl-3 flex flex-col gap-4 mt-2">
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  currentUser={currentUser}
                  userAvatar={userAvatar}
                  handleReaction={handleReaction}
                  handleReplySubmit={handleReplySubmit}
                  handleDelete={handleDelete}
                  activeReplyId={activeReplyId}
                  setActiveReplyId={setActiveReplyId}
                />
              ))}

              <button
                onClick={() => setShowReplies(false)}
                className="text-xs font-medium text-gray-400 hover:text-gray-600 mt-1 self-start"
              >
                Ẩn bớt
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ==========================================
// 4. COMPONENT CHÍNH
// ==========================================
export default function CommentSection({ postId, checkActiveStatus }) {
  const currentUser = useSelector((state) => state.user.dataUser);
  const isAuthor =
    currentUser?.role === Constants.ROLES.AUTHOR ||
    currentUser?.status === Constants.STATUS_USER.AUTHOR;
  const userAvatar = isAuthor
    ? currentUser?.organization?.organizationLogo
    : currentUser?.imageUser;

  const [comments, setComments] = useState([]);
  const [activeReplyId, setActiveReplyId] = useState(null);

  useEffect(() => {
    if (!postId) return;
    loadComments();
  }, [postId]);

  const loadComments = () => {
    commentFactory
      .getCommentsByPost(postId)
      .then((data) => setComments(data?.result || []));
  };

  const handleCreateComment = async (content, parentId = null) => {
    if (!checkActiveStatus()) return;
    const trimmed = (content || "").trim();
    if (!trimmed || !currentUser) {
      if (!currentUser) alert("Vui lòng đăng nhập!");
      return;
    }

    const request = {
      content: trimmed,
      postId: postId,
      parentCommentId: parentId,
    };

    try {
      const response = await commentFactory.createComment(
        currentUser.id,
        request
      );

      // Trường hợp 1: API trả về code 200 nhưng body báo lỗi (Logic app bạn)
      if (response && response.code === 400) {
        throw response.message;
      } else if (response && response.code === 500) {
        throw response.message;
      }

      // Thành công
      loadComments();
    } catch (error) {
      // --- [SỬA] BẮT LỖI TỪ SERVER TRẢ VỀ ---

      // Trường hợp 2: API trả về HTTP 400 -> Axios throw Error
      // Nếu server trả về text: error.response.data = "Bình luận vi phạm..."
      if (error.response && error.response.data) {
        throw error.response.data;
      }

      // Trường hợp 3: Lỗi do mình throw ở trên (response.code === 400)
      if (typeof error === "string") {
        throw error;
      }

      // Trường hợp 4: Lỗi hệ thống
      console.error("System Error:", error);
      throw "Có lỗi hệ thống xảy ra, vui lòng thử lại.";
    }
  };

  const handleDelete = async (commentId) => {
    if (!checkActiveStatus()) return;
    if (!currentUser) return;
    if (!confirm("Xóa bình luận này?")) return;

    try {
      await commentFactory.deleteComment(currentUser.id, commentId);
      setComments((prev) => removeCommentFromTree(prev, commentId));
    } catch (error) {
      console.error("Delete comment failed:", error);
    }
  };

  const removeCommentFromTree = (list, idToRemove) => {
    return list
      .filter((c) => c.id !== idToRemove)
      .map((c) => ({
        ...c,
        replies: c.replies ? removeCommentFromTree(c.replies, idToRemove) : [],
      }));
  };

  const handleReaction = async (commentId, type) => {
    if (!checkActiveStatus()) return;
    if (!currentUser) {
      alert("Vui lòng đăng nhập!");
      return;
    }
    setComments((prev) => updateReactionInTree(prev, commentId, type));
    try {
      await commentFactory.reactToComment(commentId, type);
    } catch (error) {
      console.error("Reaction failed:", error);
      loadComments();
    }
  };

  const updateReactionInTree = (list, targetId, type) => {
    return list.map((c) => {
      if (c.id === targetId) {
        let { likeCount, dislikeCount, myReaction } = c;
        if (myReaction === type) {
          if (type === "LIKE") likeCount--;
          else dislikeCount--;
          myReaction = null;
        } else {
          if (type === "LIKE") {
            likeCount++;
            if (myReaction === "DISLIKE") dislikeCount--;
          } else {
            dislikeCount++;
            if (myReaction === "LIKE") likeCount--;
          }
          myReaction = type;
        }
        return { ...c, likeCount, dislikeCount, myReaction };
      }
      if (c.replies && c.replies.length > 0) {
        return {
          ...c,
          replies: updateReactionInTree(c.replies, targetId, type),
        };
      }
      return c;
    });
  };

  return (
    <div className="mx-auto">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Bình luận</h3>

      <div className="mb-2">
        <CommentInput
          avatar={userAvatar}
          onSubmit={(content) => handleCreateComment(content, null)}
          onCancel={() => {}}
        />
      </div>

      <div className="space-y-6">
        {comments?.length === 0 && (
          <p className="text-gray-400 italic text-sm">Chưa có bình luận nào.</p>
        )}

        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            currentUser={currentUser}
            userAvatar={userAvatar}
            handleReaction={handleReaction}
            handleReplySubmit={handleCreateComment}
            handleDelete={handleDelete}
            activeReplyId={activeReplyId}
            setActiveReplyId={setActiveReplyId}
          />
        ))}
      </div>
    </div>
  );
}
