"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Xin chào! Tôi có thể hỗ trợ gì cho bạn?" },
  ]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);

  // Auto scroll xuống cuối khi có tin nhắn mới
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Thêm tin nhắn người dùng
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    // Reset input
    setInput("");

    // Giả lập response bot (bạn xử lý thật thay vì setTimeout)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Tôi sẽ xử lý yêu cầu của bạn." },
      ]);
    }, 600);
  };

  return (
    <>
      {/* Chat popup */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 bg-white shadow-xl rounded-2xl border z-50 flex flex-col animate-slideUp overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 bg-[#017C18] text-white">
            <h3 className="font-semibold">Chat hỗ trợ</h3>
            <button onClick={() => setOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="p-3 overflow-y-auto space-y-2 bg-gray-50 h-72 scroll-white">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] px-3 py-2 rounded-xl text-sm shadow 
                  ${
                    m.sender === "user"
                      ? "bg-[#017C18] text-white rounded-br-none"
                      : "bg-white text-gray-800 border rounded-bl-none"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t bg-white flex items-center gap-2">
            <input
              className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none text-gray-800"
              placeholder="Nhập tin nhắn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-[#017C18] hover:bg-[#016214] text-white p-2 rounded-lg cursor-pointer"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-[#017C18] hover:bg-[#016214] text-white p-4 rounded-full shadow-lg z-50 transition-all duration-300 cursor-pointer"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Animation */}
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
