"use client";
import { motion, AnimatePresence } from "framer-motion";

interface MatchPopupProps {
    visible: boolean;
}

export default function MatchPopup({ visible }: MatchPopupProps) {
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.7, y: -40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.7, y: -40 }}
                    style={{
                        position: "fixed",
                        top: "5.5rem",
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 999,
                        padding: "1.25rem 2.5rem",
                        textAlign: "center",
                        background: "var(--bg-card)",
                        border: "1px solid rgba(232,97,74,0.4)",
                        borderRadius: "1rem",
                        boxShadow: "0 20px 60px rgba(232,97,74,0.2)",
                    }}
                >
                    <p style={{ fontSize: "2rem", marginBottom: "0.25rem" }}>🎉</p>
                    <p style={{ fontSize: "1.2rem", fontWeight: 800, color: "#e8614a" }}>It&apos;s a GitTogether!</p>
                    <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginTop: "0.25rem" }}>You have a new match!</p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
