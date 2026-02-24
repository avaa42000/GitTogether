"use client";
import { motion } from "framer-motion";

interface ActionButtonsProps {
    onPass: () => void;
    onSuperLike: () => void;
    onLike: () => void;
    accentColor?: string;
}

export default function ActionButtons({ onPass, onSuperLike, onLike, accentColor = "#4ade80" }: ActionButtonsProps) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            {/* Pass */}
            <motion.button whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.88 }} onClick={onPass}
                style={{ width: 56, height: 56, borderRadius: "50%", border: "1px solid rgba(232,97,74,0.35)", background: "rgba(232,97,74,0.08)", color: "#e8614a", fontSize: "1.4rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                ✕
            </motion.button>

            {/* SuperLike */}
            <motion.button whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.88 }} onClick={onSuperLike}
                style={{ width: 48, height: 48, borderRadius: "50%", border: "1px solid rgba(255,195,80,0.35)", background: "rgba(255,195,80,0.08)", color: "#ffc350", fontSize: "1.2rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                ⭐
            </motion.button>

            {/* Like */}
            <motion.button whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.88 }} onClick={onLike}
                style={{ width: 56, height: 56, borderRadius: "50%", border: "1px solid rgba(74,222,128,0.35)", background: "rgba(74,222,128,0.08)", color: "#4ade80", fontSize: "1.4rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                ♥
            </motion.button>
        </div>
    );
}
