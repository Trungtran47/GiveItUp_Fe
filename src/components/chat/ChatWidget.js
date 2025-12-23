"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, ExternalLink } from "lucide-react";
import { CgSpinner } from "react-icons/cg";
import chatBotFactory from "@/redux/chat_bot/factory";
import Link from "next/link";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  // State lưu tin nhắn
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Xin chào! Tôi có thể hỗ trợ gì cho bạn?" },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // Auto scroll xuống cuối khi có tin nhắn mới
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // ==========================================
  // HÀM FORMAT LINK (Đã có nhưng chưa dùng)
  // ==========================================
  const formatMessage = (text) => {
    // Regex tìm chuỗi bắt đầu bằng /project/ theo sau là số
    const regex = /(\/project\/\d+)/g;

    // Tách chuỗi
    const parts = text.split(regex);

    return parts.map((part, index) => {
      // Nếu phần này khớp với regex (là link)
      if (part.match(regex)) {
        return (
          <Link
            key={index}
            href={part}
            onClick={() => setOpen(false)}
            className="inline-flex items-center gap-1 bg-white text-[#017C18] px-2 py-0.5 rounded border border-[#017C18] text-xs font-bold hover:bg-gray-100 transition-colors mx-1 no-underline"
          >
            Xem ngay <ExternalLink className="w-3 h-3" />
          </Link>
        );
      }
      // Nếu là text thường
      return <span key={index}>{part}</span>;
    });
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();

    // 1. Thêm tin nhắn người dùng
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      const data = {
        message: userMessage,
      };
      const response = await chatBotFactory.askAi(data);

      const botAnswer =
        response?.result?.answer ||
        response?.answer ||
        "Xin lỗi, tôi không hiểu câu hỏi.";

      setMessages((prev) => [...prev, { sender: "bot", text: botAnswer }]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Hệ thống đang bận, vui lòng thử lại sau." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat popup */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 bg-white shadow-xl rounded-2xl border z-50 flex flex-col animate-slideUp overflow-hidden max-h-[500px]">
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 bg-[#017C18] text-white shrink-0">
            <h3 className="font-semibold">Chat hỗ trợ AI</h3>
            <button onClick={() => setOpen(false)}>
              <X className="w-5 h-5 cursor-pointer" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="p-3 overflow-y-auto space-y-3 bg-gray-50 h-80 scroll-white">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-xl text-sm shadow whitespace-pre-wrap break-words
                  ${
                    m.sender === "user"
                      ? "bg-[#017C18] text-white rounded-br-none"
                      : "bg-white text-gray-800 border rounded-bl-none"
                  }`}
                >
                  {m.sender === "bot" ? formatMessage(m.text) : m.text}
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start animate-pulse">
                <div className="bg-gray-200 text-gray-500 px-3 py-2 rounded-xl rounded-bl-none text-xs italic flex items-center gap-1">
                  Đang suy nghĩ <CgSpinner className="animate-spin" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t bg-white flex items-center gap-2 shrink-0">
            <input
              className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none text-gray-800 disabled:bg-gray-100"
              placeholder={isLoading ? "Đang trả lời..." : "Nhập tin nhắn..."}
              value={input}
              disabled={isLoading}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !isLoading && handleSend()}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className={`p-2 rounded-lg transition-colors flex items-center justify-center
                ${
                  !input.trim() || isLoading
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-[#017C18] hover:bg-[#016214] text-white cursor-pointer"
                }`}
            >
              {isLoading ? (
                <CgSpinner className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-[#017C18] hover:bg-[#016214] text-white p-4 rounded-full shadow-lg z-50 transition-all duration-300 cursor-pointer hover:scale-110"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.25s ease-out;
        }
      `}</style>
    </>
  );
}
