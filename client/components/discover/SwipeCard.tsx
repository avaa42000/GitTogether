"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef } from "react";
import type { IntentConfig } from "@/lib/intentConfig";

interface Developer {
    id: string;
    username: string;
    name: string | null;
    avatarUrl: string | null;
    bio: string | null;
    location: string | null;
    primaryStack: string[];
    compatibilityScore: number;
    intentMode: string;
}

interface SwipeCardProps {
    developer: Developer;
    onSwipe: (id: string, type: "like" | "pass" | "superlike") => void;
    isTop: boolean;
    stackIndex: number;
    intentConfig?: IntentConfig;
}

const LANG_COLORS: Record<string, string> = {
    JavaScript: "#f7df1e",
    TypeScript: "#3178c6",
    Python: "#3572a5",
    Go: "#00add8",
    Rust: "#dea584",
    Java: "#b07219",
    "C++": "#f34b7d",
    Ruby: "#701516",
    Swift: "#fa7343",
    Kotlin: "#a97bff",
};

const INTENT_LABELS: Record<string, string> = {
    networking: "💼 Professional Networking",
    collab: "🚀 Project Collaboration",
    hackathon: "🏆 Hackathon Partner",
    learning: "📚 Learning Buddy",
    dating: "💝 Dating Mode",
    casual: "🎮 Casual Dev Connect",
};

export function SwipeCard({ developer, onSwipe, isTop, stackIndex, intentConfig }: SwipeCardProps) {
    const accentColor = intentConfig?.accentColor || "#4ade80";
    const likeLabel = intentConfig?.likeLabel || "LIKE";
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-20, 20]);
    const likeOpacity = useTransform(x, [30, 120], [0, 1]);
    const passOpacity = useTransform(x, [-120, -30], [1, 0]);
    const cardRef = useRef<HTMLDivElement>(null);

    async function handleDragEnd(_: unknown, info: { offset: { x: number } }) {
        const threshold = 120;
        if (info.offset.x > threshold) {
            await animate(x, 600, { duration: 0.3 });
            onSwipe(developer.id, "like");
        } else if (info.offset.x < -threshold) {
            await animate(x, -600, { duration: 0.3 });
            onSwipe(developer.id, "pass");
        } else {
            animate(x, 0, { type: "spring", stiffness: 300 });
        }
    }

    return (
        <motion.div
            ref={cardRef}
            style={{
                x, rotate,
                position: "absolute",
                width: "100%",
                height: "100%",
                top: `${stackIndex * 8}px`,
                scale: isTop ? 1 : 0.96 - stackIndex * 0.02,
                zIndex: 10 - stackIndex,
                cursor: isTop ? "grab" : "default",
            }}
            drag={isTop ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
        >
            {/* Stamps */}
            {isTop && (
                <motion.div style={{
                    opacity: likeOpacity,
                    position: "absolute", top: 20, left: 20, zIndex: 20,
                    transform: "rotate(-20deg)",
                    border: `3px solid ${accentColor}`,
                    color: accentColor,
                    fontWeight: 900, fontSize: "1.4rem",
                    padding: "0.2rem 0.75rem",
                    borderRadius: "0.6rem",
                    pointerEvents: "none",
                }}>{likeLabel}</motion.div>
            )}
            {isTop && (
                <motion.div style={{
                    opacity: passOpacity,
                    position: "absolute", top: 20, right: 20, zIndex: 20,
                    transform: "rotate(20deg)",
                    border: "3px solid #e8614a",
                    color: "#e8614a",
                    fontWeight: 900, fontSize: "1.4rem",
                    padding: "0.2rem 0.75rem",
                    borderRadius: "0.6rem",
                    pointerEvents: "none",
                }}>NOPE</motion.div>
            )}

            {/* Card body */}
            <div style={{
                width: "100%", height: "100%",
                display: "flex", flexDirection: "column",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "1rem",
                overflow: "hidden",
                boxShadow: "0 24px 64px rgba(0,0,0,0.55)",
                userSelect: "none",
            }}>
                {/* Header */}
                <div style={{
                    position: "relative",
                    height: 176,
                    display: "flex",
                    alignItems: "flex-end",
                    padding: "1.25rem",
                    background: "linear-gradient(135deg, rgba(180,40,60,0.5), rgba(100,20,40,0.5))",
                    flexShrink: 0,
                }}>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: "1rem", width: "100%", zIndex: 1 }}>
                        <img
                            src={developer.avatarUrl || `https://ui-avatars.com/api/?name=${developer.username}&background=3a1020&color=e8614a`}
                            alt={developer.username}
                            style={{ width: 72, height: 72, borderRadius: "0.75rem", border: "2px solid rgba(232,97,74,0.4)", flexShrink: 0 }}
                        />
                        <div style={{ minWidth: 0 }}>
                            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "white", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                {developer.name || developer.username}
                            </h2>
                            <p style={{ fontSize: "0.85rem", color: "#e8614a" }}>@{developer.username}</p>
                            {developer.location && (
                                <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: 2 }}>📍 {developer.location}</p>
                            )}
                        </div>
                    </div>
                    {/* Score badge */}
                    <div style={{
                        position: "absolute", top: 16, right: 16,
                        padding: "0.3rem 0.75rem",
                        fontSize: "0.75rem", fontWeight: 700,
                        background: "rgba(232,97,74,0.15)",
                        border: "1px solid rgba(232,97,74,0.3)",
                        color: "#e8614a",
                        borderRadius: "0.5rem",
                    }}>
                        {developer.compatibilityScore}% match
                    </div>
                </div>

                {/* Body */}
                <div style={{ flex: 1, padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem", overflow: "hidden" }}>
                    {developer.bio && (
                        <p style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                            {developer.bio}
                        </p>
                    )}

                    <div>
                        <p style={{ fontSize: "0.7rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>Tech Stack</p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                            {(developer.primaryStack as string[]).map((lang) => (
                                <span key={lang} style={{
                                    fontSize: "0.75rem", fontWeight: 500,
                                    padding: "0.2rem 0.65rem",
                                    borderRadius: "999px",
                                    background: `${LANG_COLORS[lang] || "#e8614a"}22`,
                                    color: LANG_COLORS[lang] || "#e8614a",
                                    border: `1px solid ${LANG_COLORS[lang] || "#e8614a"}44`,
                                }}>{lang}</span>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginTop: "auto" }}>
                        <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>Looking for: </span>
                        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#e8614a" }}>
                            {INTENT_LABELS[developer.intentMode] || developer.intentMode}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
