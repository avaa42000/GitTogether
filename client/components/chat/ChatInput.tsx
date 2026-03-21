"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface ChatInputProps {
    onSend: (text: string) => Promise<void>;
}

export default function ChatInput({ onSend }: ChatInputProps) {
    const [input, setInput] = useState("");
    const [sending, setSending] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || sending) return;
        setSending(true);
        await onSend(input.trim());
        setInput("");
        setSending(false);
    };

    return (
        <div style={{
            padding: "1rem 1.25rem",
            borderTop: "1px solid var(--card-border)",
            background: "var(--bg-nav)",
            backdropFilter: "blur(16px)",
        }}>
            <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center", gap: "0.75rem", maxWidth: 700, margin: "0 auto" }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="gt-input"
                    style={{ 
                        flex: 1,
                        background: "var(--bg-main)",
                        border: "1px solid var(--card-border)",
                    }}
                />
                <motion.button
                    whileTap={{ scale: 0.92 }}
                    type="submit"
                    disabled={sending || !input.trim()}
                    style={{
                        width: 44, height: 44,
                        borderRadius: "0.75rem",
                        border: "none",
                        background: sending || !input.trim() ? "rgba(255,255,255,0.05)" : "var(--accent-pink)",
                        color: "white",
                        fontSize: "1.2rem",
                        cursor: sending || !input.trim() ? "not-allowed" : "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: sending || !input.trim() ? "none" : "0 4px 15px rgba(255,107,154,0.2)",
                        transition: "all 0.2s ease"
                    }}
                >↑</motion.button>
            </form>
        </div>
    );
}
