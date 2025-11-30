import { useState } from "react";
import Image from "next/image";

/**
 * CommentSection with Reply
 * - input 1 gạch dưới
 * - reply comment có indent
 */
export default function CommentSection({ currentUser }) {
  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState(null); // lưu comment đang reply
  const [comments, setComments] = useState([]);

  const handleSubmit = (e) => {
    e?.preventDefault();

    const trimmed = (text || "").trim();
    if (!trimmed) return;

    // chuẩn bị object comment
    const newComment = {
      id: Date.now(),
      author: currentUser?.name || "Bạn",
      avatar: currentUser?.avatar || "/images/default-avatar.png",
      text: trimmed,
      time: new Date().toLocaleString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      replies: [],
    };

    // Nếu là reply
    if (replyTo) {
      setComments((prev) =>
        prev.map((c) =>
          c.id === replyTo ? { ...c, replies: [newComment, ...c.replies] } : c
        )
      );
      setReplyTo(null);
    } else {
      // Comment mới (không phải reply)
      setComments((prev) => [newComment, ...prev]);
    }

    setText("");
  };

  const startReply = (comment) => {
    setReplyTo(comment.id);
    setText(`@${comment.author} `);
  };

  return (
    <div className="mt-6">
      {/* Input bình luận */}
      <form onSubmit={handleSubmit} className="flex items-start gap-5">
        <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          <Image
            src={currentUser?.avatar || "/images/default-avatar.png"}
            alt="avatar"
            width={36}
            height={36}
            className="w-9 h-9 object-cover rounded-full"
          />
        </div>

        <div className="flex-1">
          <div className="relative text-gray-700">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={replyTo ? "Đang trả lời..." : "Viết bình luận..."}
              className="w-full bg-transparent py-2 pr-12 text-sm placeholder:text-gray-400
                       border-b border-gray-300 focus:border-b-2 focus:border-gray-600 
                       focus:outline-none transition"
            />

            {/* nút gửi */}
            <button
              type="submit"
              className="absolute right-0 top-1/2 -translate-y-1/2 px-2 py-1 text-sm 
                       font-medium text-green-600 hover:text-green-700 disabled:opacity-40"
              disabled={!text.trim()}
            >
              Gửi
            </button>
          </div>

          {replyTo && (
            <p className="text-xs text-green-600 mt-1">
              Đang trả lời bình luận...{" "}
              <button
                type="button"
                className="text-red-500 ml-2"
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
        {comments.length === 0 ? (
          <p className="text-sm text-gray-400">
            Chưa có bình luận nào — hãy là người đầu tiên!
          </p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="space-y-3">
              {/* Comment gốc */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <Image
                    src={c.avatar}
                    alt={c.author}
                    width={32}
                    height={32}
                    className="w-8 h-8 object-cover rounded-full"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <div className="text-sm  font-semibold text-gray-600">
                        {c.author}
                      </div>
                      <div className=" text-[14px]  text-gray-700">
                        {c.text}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">
                    {c.time}{" "}
                    <button
                      onClick={() => startReply(c)}
                      className=" text-xs text-green-600 hover:text-green-700 cursor-pointer"
                    >
                      Trả lời
                    </button>
                  </div>
                </div>
              </div>

              {/* Reply con */}
              {c.replies.length > 0 && (
                <div className="ml-10 space-y-3 border-l border-gray-200 pl-4">
                  {c.replies.map((r) => (
                    <div key={r.id} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-200">
                        <Image
                          src={r.avatar}
                          alt={r.author}
                          width={28}
                          height={28}
                          className="w-7 h-7 object-cover rounded-full"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-gray-900">
                          {r.author}
                        </div>
                        <div className="mt-1 text-sm text-gray-700">
                          {r.text}
                        </div>
                        <div className="text-xs text-gray-400">{r.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
