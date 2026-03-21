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
            position: "sticky",
            bottom: "1rem",
            padding: "0 1rem",
            zIndex: 40,
        }}>
            <form 
                onSubmit={handleSubmit} 
                style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "0.6rem", 
                    maxWidth: 680, 
                    margin: "0 auto",
                    background: "rgba(35, 18, 25, 0.7)",
                    backdropFilter: "blur(20px)",
                    padding: "0.5rem 0.6rem 0.5rem 1.25rem",
                    borderRadius: "2rem",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.4)"
                }}
            >
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    style={{ 
                        flex: 1, 
                        background: "none", 
                        border: "none", 
                        outline: "none", 
                        color: "white", 
                        fontSize: "0.95rem",
                        padding: "0.4rem 0"
                    }}
                />
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={sending || !input.trim()}
                    style={{
                        width: 36, height: 36,
                        borderRadius: "50%",
                        border: "none",
                        background: sending || !input.trim() ? "rgba(255,255,255,0.05)" : "var(--coral-btn)",
                        color: "white",
                        cursor: sending || !input.trim() ? "not-allowed" : "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.2s"
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </motion.button>
            </form>
        </div>
    );
}
