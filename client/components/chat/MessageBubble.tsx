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
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: index * 0.005 
            }}
            style={{
                display: "flex",
                flexDirection: isMe ? "row-reverse" : "row",
                alignItems: "flex-end",
                gap: "0.6rem",
                marginBottom: "0.25rem"
            }}
        >
            {!isMe && (
                <img
                    src={avatarUrl || `https://ui-avatars.com/api/?name=${username}&background=3a1020&color=e8614a`}
                    alt={username}
                    style={{ width: 32, height: 32, borderRadius: "50%", marginBottom: "0.25rem", border: "1px solid var(--border)", flexShrink: 0 }}
                />
            )}
            <div style={{ display: "flex", flexDirection: "column", alignItems: isMe ? "flex-end" : "flex-start", maxWidth: "80%" }}>
                <div 
                    className={!isMe ? "glass-bubble" : ""}
                    style={{
                        padding: "0.75rem 1.1rem",
                        fontSize: "0.92rem",
                        lineHeight: 1.5,
                        color: "white",
                        background: isMe ? "var(--coral-btn)" : undefined,
                        borderRadius: isMe ? "1.2rem 1.2rem 0.3rem 1.2rem" : "1.2rem 1.2rem 1.2rem 0.3rem",
                        boxShadow: isMe ? "0 4px 15px rgba(232, 97, 74, 0.25)" : undefined,
                    }}
                >
                    {isCode ? (
                        <pre style={{ fontFamily: "monospace", fontSize: "0.82rem", color: "#4ade80", overflowX: "auto", whiteSpace: "pre-wrap", margin: 0 }}>
                            {text.replace(/```/g, "").trim()}
                        </pre>
                    ) : (
                        <span style={{ whiteSpace: "pre-wrap" }}>{text}</span>
                    )}
                </div>
                <span style={{ fontSize: "0.65rem", color: "var(--muted)", marginTop: "0.3rem", padding: "0 0.4rem" }}>
                    {time}
                </span>
            </div>
        </motion.div>
    );
}
