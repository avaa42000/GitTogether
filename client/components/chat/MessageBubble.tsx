"use client";
import { motion } from "framer-motion";

interface MessageBubbleProps {
    text: string;
    isMe: boolean;
    avatarUrl?: string;
    username?: string;
    index: number;
}

export default function MessageBubble({ text, isMe, avatarUrl, username, index }: MessageBubbleProps) {
    const isCode = text.startsWith("```");

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.01 }}
            style={{
                display: "flex",
                flexDirection: isMe ? "row-reverse" : "row",
                alignItems: "flex-end",
                gap: "0.5rem",
            }}
        >
            {!isMe && (
                <img
                    src={avatarUrl || `https://ui-avatars.com/api/?name=${username}&background=3a1020&color=e8614a`}
                    alt={username}
                    style={{ width: 28, height: 28, borderRadius: "0.4rem", marginBottom: "0.25rem", flexShrink: 0 }}
                />
            )}
            <div style={{
                maxWidth: "72%",
                padding: "0.65rem 1rem",
                fontSize: "0.9rem",
                lineHeight: 1.5,
                color: "white",
                background: isMe ? "linear-gradient(135deg, #e8614a, #d44a34)" : "var(--bg-card)",
                border: isMe ? "none" : "1px solid var(--border)",
                borderRadius: isMe ? "1rem 1rem 0.2rem 1rem" : "1rem 1rem 1rem 0.2rem",
            }}>
                {isCode ? (
                    <pre style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "#4ade80", overflowX: "auto", whiteSpace: "pre-wrap", margin: 0 }}>
                        {text.replace(/```/g, "").trim()}
                    </pre>
                ) : text}
            </div>
        </motion.div>
    );
}
