import { useState, useEffect } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import Constants from "@/utils/Constants";
import commentFactory from "@/redux/comment/factory";

// Import Icons
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
  AiOutlineSend,
} from "react-icons/ai";
import { BsArrowReturnRight } from "react-icons/bs";

// ==========================================
// 1. COMPONENT INPUT BÌNH LUẬN (LOGIC HIỂN THỊ NÚT)
// ==========================================
const CommentInput = ({
  avatar,
  onSubmit,
  placeholder = "Viết bình luận...",
  replyToUser = null,
  onCancel, // Hàm hủy bên ngoài (dùng cho reply)
  autoFocus = false,
}) => {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const content = replyToUser ? `@${replyToUser} ${text}` : text;
    onSubmit(content);
    setText("");
    setIsFocused(false); // Reset trạng thái focus sau khi gửi
  };

  const handleCancel = () => {
    setText("");
    setIsFocused(false);
    if (onCancel) onCancel(); // Gọi hàm hủy của cha (nếu có)
  };

  // Logic hiển thị nút: Đang focus HOẶC có text HOẶC đang reply
  const showButtons = isFocused || text.trim().length > 0 || replyToUser;

  return (
    <div className="flex items-start gap-3 w-full mt-2">
      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 mt-1">
        <Image
          src={avatar || "/images/default-avatar.png"}
          alt="avatar"
          width={32}
          height={32}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1">
        <form onSubmit={handleSubmit}>
          {/* Input Area */}
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
              onFocus={() => setIsFocused(true)}
              // onBlur={() => !text && setIsFocused(false)} // Tùy chọn: Blur thì ẩn nếu rỗng
              onChange={(e) => setText(e.target.value)}
              placeholder={placeholder}
              className="flex-1 bg-transparent py-1 text-sm text-gray-700 placeholder:text-gray-400 border-none outline-none focus:ring-0"
            />
          </div>

          {/* Action Buttons (Chỉ hiện khi cần thiết) */}
          {showButtons && (
            <div className="flex justify-end items-center gap-3 mt-2 animate-fadeIn">
              <button
                type="button"
                onClick={handleCancel}
                className="text-xs text-gray-500 hover:text-gray-700 font-medium px-3 py-1 rounded hover:bg-gray-100 transition"
              >
                Hủy
              </button>

              <button
                type="submit"
                disabled={!text.trim()}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition flex items-center gap-1
                  ${
                    text.trim()
                      ? "bg-[#017C18] text-white hover:bg-[#015a13] cursor-pointer"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
              >
                Gửi <AiOutlineSend />
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

// ==========================================
// 2. HELPER: FORMAT NỘI DUNG
// ==========================================
const CommentContent = ({ content }) => {
  const parts = content.split(" ");
  return (
    <div className="text-[14px] text-gray-700 leading-relaxed whitespace-pre-wrap">
      {parts.map((word, index) => {
        if (index === 0 && word.startsWith("@")) {
          return (
            <span key={index} className="font-medium text-black mr-1">
              {word}
            </span>
          );
        }
        return <span key={index}>{word} </span>;
      })}
    </div>
  );
};

// ==========================================
// 3. COMPONENT HIỂN THỊ 1 COMMENT (ĐỆ QUY)
// ==========================================
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

  const onReplySubmit = (content) => {
    handleReplySubmit(content, comment.id);
    setActiveReplyId(null);
    setShowReplies(true);
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
      <div className="flex items-start gap-3 group">
        <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          <Image
            src={comment.avatar || "/images/default-avatar.png"}
            alt={comment.userName}
            width={36}
            height={36}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="bg-gray-100 rounded-2xl px-4 py-2 inline-block">
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
              {new Date(comment.createdAt).toLocaleString("vi-VN")}
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

          {/* Form Reply */}
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
export default function CommentSection({ postId }) {
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
      await commentFactory.createComment(currentUser.id, request);
      loadComments();
    } catch (error) {
      console.error("Create comment failed:", error);
    }
  };

  const handleDelete = async (commentId) => {
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

      {/* Input Chính */}
      <div className="mb-8">
        <CommentInput
          avatar={userAvatar}
          onSubmit={(content) => handleCreateComment(content, null)}
          // Cho phép hủy ở input chính (nếu muốn reset)
          onCancel={() => {}}
        />
      </div>

      {/* Danh sách Comment */}
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
