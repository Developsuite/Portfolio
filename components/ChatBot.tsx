"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "What are your technical skills?",
  "Tell me about your projects",
  "What's your educational background?",
  "Share some study tips",
];

type Theme = "blue" | "pink";

const themes = {
  blue: {
    accent: "#3b82f6",
    accentDark: "#1d4ed8",
    windowBorder: "rgba(59, 130, 246, 0.15)",
    windowGlow: "0 25px 60px rgba(0, 0, 0, 0.6), 0 0 80px rgba(59, 130, 246, 0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
    headerBg: "linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(30, 58, 138, 0.1))",
    userBubble: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
    dotColor: "bg-blue-400",
    suggestBg: "rgba(59, 130, 246, 0.1)",
    suggestBorder: "rgba(59, 130, 246, 0.2)",
    suggestText: "rgba(147, 197, 253, 0.9)",
    sendBg: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
    statusDot: "bg-emerald-400",
    toggleActive: "#3b82f6",
    toggleInactive: "rgba(255,255,255,0.15)",
  },
  pink: {
    accent: "#ec4899",
    accentDark: "#be185d",
    windowBorder: "rgba(236, 72, 153, 0.15)",
    windowGlow: "0 25px 60px rgba(0, 0, 0, 0.6), 0 0 80px rgba(236, 72, 153, 0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
    headerBg: "linear-gradient(to right, rgba(236, 72, 153, 0.1), rgba(190, 24, 93, 0.1))",
    userBubble: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
    dotColor: "bg-pink-400",
    suggestBg: "rgba(236, 72, 153, 0.1)",
    suggestBorder: "rgba(236, 72, 153, 0.2)",
    suggestText: "rgba(251, 191, 219, 0.9)",
    sendBg: "linear-gradient(135deg, #ec4899, #be185d)",
    statusDot: "bg-pink-300",
    toggleActive: "#ec4899",
    toggleInactive: "rgba(255,255,255,0.15)",
  },
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("blue");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! 👋 I am Kinz ul Eman. Ask anything about my education, experience, projects, skills, contact, or even study tips!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const t = themes[theme];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Hi! 👋 I am Kinz ul Eman. Ask anything about my education, experience, projects, skills, contact, or even study tips!",
      },
    ]);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = { role: "user", content: messageText };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();

      if (data.error) {
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content:
              "Oops! Something went wrong. Please try again in a moment. 🔄",
          },
        ]);
      } else {
        setMessages([
          ...newMessages,
          { role: "assistant", content: data.reply },
        ]);
      }
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            "Sorry, I'm having trouble connecting right now. Please try again later! 🔌",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-8 z-[999] flex items-center gap-3 cursor-pointer"
        style={{
          background: "transparent",
          border: "none",
          boxShadow: "none",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle chatbot"
      >
        <motion.div
          className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
          style={{
            border: "1.5px solid rgba(255,255,255,0.3)",
          }}
          animate={!isOpen ? { scale: [1, 1.1, 1] } : { scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.svg
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </motion.svg>
            ) : (
              <motion.img
                key="icon"
                src="/chatbot-icon.png"
                alt="Chat with AI"
                className="w-10 h-10 rounded-full object-cover"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                draggable={false}
              />
            )}
          </AnimatePresence>
        </motion.div>
        <span className="text-white/70 text-sm font-medium tracking-wide">
          Let&apos;s Talk
        </span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="fixed bottom-24 left-8 z-[998] w-[380px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden flex flex-col"
            style={{
              height: "min(580px, calc(100vh - 140px))",
              background: "rgba(10, 10, 15, 0.95)",
              backdropFilter: "blur(20px)",
              border: `1px solid ${t.windowBorder}`,
              boxShadow: t.windowGlow,
            }}
          >
            {/* Header */}
            <div
              className="px-5 py-4 flex items-center gap-3 shrink-0"
              style={{
                background: t.headerBg,
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Avatar - using chatbot icon */}
              <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                <img
                  src="/chatbot-icon.png"
                  alt="Kinz ul Eman"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-sm">
                  Kinz ul Eman
                </h3>
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${t.statusDot} animate-pulse`} />
                  <span className="text-white/40 text-xs">
                    Online
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1 mr-1">
                {/* Clear Chat Button */}
                <button
                  onClick={clearChat}
                  className="w-7 h-7 mr-1 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                  title="Clear chat"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                </button>

                {/* Theme Toggles */}
                <button
                  onClick={() => setTheme("blue")}
                  className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{
                    background: theme === "blue" ? t.toggleActive : t.toggleInactive,
                    border: theme === "blue" ? "2px solid white" : "2px solid transparent",
                  }}
                  title="Blue theme"
                >
                  <span className="text-[10px]">♂</span>
                </button>
                <button
                  onClick={() => setTheme("pink")}
                  className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{
                    background: theme === "pink" ? themes.pink.toggleActive : themes.pink.toggleInactive,
                    border: theme === "pink" ? "2px solid white" : "2px solid transparent",
                  }}
                  title="Pink theme"
                >
                  <span className="text-[10px]">♀</span>
                </button>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/5 transition-all"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "rounded-br-md"
                        : "rounded-bl-md"
                    }`}
                    style={
                      msg.role === "user"
                        ? {
                            background: t.userBubble,
                            color: "white",
                          }
                        : {
                            background: "rgba(255,255,255,0.06)",
                            color: "rgba(255,255,255,0.85)",
                            border: "1px solid rgba(255,255,255,0.06)",
                          }
                    }
                  >
                    <p className="whitespace-pre-wrap">
                      {msg.content.split(/(\*\*.*?\*\*)/g).map((part, i) => {
                        if (part.startsWith("**") && part.endsWith("**")) {
                          return <strong key={i}>{part.slice(2, -2)}</strong>;
                        }
                        return <span key={i}>{part}</span>;
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div
                    className="rounded-2xl rounded-bl-md px-4 py-3"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div className="flex items-center gap-1.5">
                      <motion.div
                        className={`w-2 h-2 rounded-full ${t.dotColor}`}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                      />
                      <motion.div
                        className={`w-2 h-2 rounded-full ${t.dotColor}`}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          delay: 0.2,
                        }}
                      />
                      <motion.div
                        className={`w-2 h-2 rounded-full ${t.dotColor}`}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          delay: 0.4,
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Suggested questions - only show at start */}
              {messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-2 pt-2"
                >
                  {SUGGESTED_QUESTIONS.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => sendMessage(q)}
                      className="text-xs px-3 py-2 rounded-full transition-all duration-200 hover:scale-105"
                      style={{
                        background: t.suggestBg,
                        border: `1px solid ${t.suggestBorder}`,
                        color: t.suggestText,
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
              className="px-4 py-3 shrink-0"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(0,0,0,0.3)",
              }}
            >
              <div
                className="flex items-center gap-2 rounded-xl px-4 py-2.5"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-white/25 outline-none"
                  disabled={isLoading}
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isLoading}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{
                    background: input.trim()
                      ? t.sendBg
                      : "transparent",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
