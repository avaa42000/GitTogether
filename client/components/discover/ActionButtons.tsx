"use client";
import { motion } from "framer-motion";

interface ActionButtonsProps {
    onPass: () => void;
    onSuperLike: () => void;
    onLike: () => void;
    accentColor?: string;
}

export default function ActionButtons({ onPass, onSuperLike, onLike }: ActionButtonsProps) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "1.75rem" }}>
            {/* Pass */}
            <motion.button 
                whileHover={{ scale: 1.1, translateY: -2 }} 
                whileTap={{ scale: 0.9 }} 
                onClick={onPass}
                style={{ 
                    width: 60, height: 60, 
                    borderRadius: "50%", 
                    border: "1px solid var(--card-border)", 
                    background: "var(--bg-card)", 
                    color: "var(--text-secondary)", 
                    fontSize: "1.4rem", 
                    cursor: "pointer", 
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "var(--soft-shadow)",
                    transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FF4D4D")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
                ✕
            </motion.button>

            {/* SuperLike */}
            <motion.button 
                whileHover={{ scale: 1.1, translateY: -2 }} 
                whileTap={{ scale: 0.9 }} 
                onClick={onSuperLike}
                style={{ 
                    width: 50, height: 50, 
                    borderRadius: "50%", 
                    border: "1px solid var(--card-border)", 
                    background: "var(--bg-card)", 
                    color: "var(--text-secondary)", 
                    fontSize: "1.2rem", 
                    cursor: "pointer", 
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "var(--soft-shadow)",
                    transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#4DABFF")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
                ⭐
            </motion.button>

            {/* Like */}
            <motion.button 
                whileHover={{ scale: 1.1, translateY: -2 }} 
                whileTap={{ scale: 0.9 }} 
                onClick={onLike}
                style={{ 
                    width: 60, height: 60, 
                    borderRadius: "50%", 
                    border: "1px solid var(--accent-pink)", 
                    background: "var(--bg-card)", 
                    color: "var(--accent-pink)", 
                    fontSize: "1.6rem", 
                    cursor: "pointer", 
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 0 20px var(--accent-glow)",
                    transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,107,154,0.05)";
                    e.currentTarget.style.boxShadow = "0 0 30px var(--accent-glow)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--bg-card)";
                    e.currentTarget.style.boxShadow = "0 0 20px var(--accent-glow)";
                }}
            >
                ♥
            </motion.button>
        </div>
    );
}
