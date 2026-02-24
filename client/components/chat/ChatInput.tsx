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
            padding: "0.75rem 1rem",
            borderTop: "1px solid var(--border)",
            background: "rgba(20,10,14,0.9)",
            backdropFilter: "blur(16px)",
        }}>
            <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center", gap: "0.75rem", maxWidth: 680, margin: "0 auto" }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Send a message... (use ``` for code)"
                    className="gt-input"
                    style={{ flex: 1 }}
                />
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    type="submit"
                    disabled={sending || !input.trim()}
                    style={{
                        width: 42, height: 42,
                        borderRadius: "0.6rem",
                        border: "none",
                        background: sending || !input.trim() ? "rgba(232,97,74,0.3)" : "linear-gradient(135deg, #e8614a, #d44a34)",
                        color: "white",
                        fontSize: "1.1rem",
                        cursor: sending || !input.trim() ? "not-allowed" : "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                >↑</motion.button>
            </form>
        </div>
    );
}
