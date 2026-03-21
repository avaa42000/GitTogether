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
                gap: "0.75rem",
                marginBottom: "0.25rem",
            }}
        >
            {!isMe && (
                <img
                    src={avatarUrl || `https://ui-avatars.com/api/?name=${username}\u0026background=242424\u0026color=FF6B9A`}
                    alt={username}
                    style={{ 
                        width: 32, height: 32, 
                        borderRadius: "0.6rem", 
                        marginBottom: "0.25rem", 
                        flexShrink: 0,
                        border: "1px solid var(--card-border)",
                    }}
                />
            )}
            <div style={{
                maxWidth: "75%",
                padding: "0.75rem 1.1rem",
                fontSize: "0.92rem",
                lineHeight: 1.55,
                color: isMe ? "white" : "var(--text-primary)",
                background: isMe ? "var(--accent-pink)" : "var(--bg-card)",
                border: isMe ? "none" : "1px solid var(--card-border)",
                borderRadius: isMe ? "1.25rem 1.25rem 0.25rem 1.25rem" : "1.25rem 1.25rem 1.25rem 0.25rem",
                boxShadow: isMe ? "0 4px 15px rgba(255,107,154,0.15)" : "var(--soft-shadow)",
            }}>
                {isCode ? (
                    <pre style={{ 
                        fontFamily: "'Fira Code', monospace", 
                        fontSize: "0.85rem", 
                        color: isMe ? "rgba(255,255,255,0.9)" : "var(--accent-pink)", 
                        background: "rgba(0,0,0,0.15)",
                        padding: "0.5rem",
                        borderRadius: "0.5rem",
                        overflowX: "auto", 
                        whiteSpace: "pre-wrap", 
                        margin: 0 
                    }}>
                        {text.replace(/```/g, "").trim()}
                    </pre>
                ) : text}
            </div>
        </motion.div>
    );
}
