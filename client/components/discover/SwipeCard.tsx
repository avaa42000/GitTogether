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
    networking: "Professional Networking",
    collab: "Project Collaboration",
    hackathon: "Hackathon Partner",
    learning: "Learning Buddy",
    dating: "Dating Mode",
    casual: "Casual Dev Connect",
};

export function SwipeCard({ developer, onSwipe, isTop, stackIndex, intentConfig }: SwipeCardProps) {
    const accentColor = "var(--accent-pink)";
    const likeLabel = intentConfig?.likeLabel || "LIKE";
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-15, 15]);
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
            className="dev-card"
            style={{
                x, rotate,
                position: "absolute",
                width: "100%",
                height: "100%",
                top: `${stackIndex * 8}px`,
                scale: isTop ? 1 : 0.96 - stackIndex * 0.02,
                zIndex: 10 - stackIndex,
                cursor: isTop ? "grab" : "default",
                background: "var(--bg-card)",
                border: "1px solid var(--card-border)",
                borderRadius: "1.25rem",
                boxShadow: "var(--soft-shadow)",
            }}
            drag={isTop ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
        >
            {/* Stamps */}
            {isTop && (
                <motion.div style={{
                    opacity: likeOpacity,
                    position: "absolute", top: 30, left: 30, zIndex: 20,
                    transform: "rotate(-15deg)",
                    border: `4px solid ${accentColor}`,
                    color: accentColor,
                    fontWeight: 900, fontSize: "1.6rem",
                    padding: "0.25rem 1rem",
                    borderRadius: "0.75rem",
                    pointerEvents: "none",
                    textShadow: "0 0 10px rgba(255,107,154,0.3)",
                }}>{likeLabel}</motion.div>
            )}
            {isTop && (
                <motion.div style={{
                    opacity: passOpacity,
                    position: "absolute", top: 30, right: 30, zIndex: 20,
                    transform: "rotate(15deg)",
                    border: "4px solid #555",
                    color: "#555",
                    fontWeight: 900, fontSize: "1.6rem",
                    padding: "0.25rem 1rem",
                    borderRadius: "0.75rem",
                    pointerEvents: "none",
                }}>NOPE</motion.div>
            )}

            {/* Card Content */}
            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
                {/* Header */}
                <div style={{
                    position: "relative",
                    height: 180,
                    display: "flex",
                    alignItems: "flex-end",
                    padding: "1.5rem",
                    background: "linear-gradient(180deg, rgba(255,107,154,0.05) 0%, rgba(18,18,18,0) 100%)",
                    flexShrink: 0,
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", width: "100%", zIndex: 1 }}>
                        <img
                            src={developer.avatarUrl || `https://ui-avatars.com/api/?name=${developer.username}\u0026background=242424\u0026color=FF6B9A`}
                            alt={developer.username}
                            style={{ 
                                width: 80, height: 80, 
                                borderRadius: "1rem", 
                                border: "2px solid var(--card-border)", 
                                flexShrink: 0,
                                boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
                            }}
                        />
                        <div style={{ minWidth: 0 }}>
                            <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                {developer.name || developer.username}
                            </h2>
                            <p style={{ fontSize: "0.9rem", color: "var(--accent-pink)", fontWeight: 600 }}>@{developer.username}</p>
                            {developer.location && (
                                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: 4, display: "flex", alignItems: "center", gap: "0.25rem" }}>
                                   <span style={{opacity: 0.6}}>📍</span> {developer.location}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div style={{ flex: 1, padding: "0 1.5rem 1.5rem", display: "flex", flexDirection: "column", gap: "1rem", overflow: "hidden" }}>
                    {developer.bio && (
                        <p style={{ 
                            fontSize: "0.9rem", 
                            color: "var(--text-secondary)", 
                            lineHeight: 1.6, 
                            display: "-webkit-box", 
                            WebkitLineClamp: 3, 
                            WebkitBoxOrient: "vertical", 
                            overflow: "hidden" 
                        }}>
                            {developer.bio}
                        </p>
                    )}

                    <div>
                        <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem", opacity: 0.4 }}>Primary Stack</p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                            {(developer.primaryStack as string[]).map((lang) => (
                                <span key={lang} style={{
                                    fontSize: "0.75rem", fontWeight: 600,
                                    padding: "0.3rem 0.75rem",
                                    borderRadius: "0.5rem",
                                    background: "rgba(255,255,255,0.03)",
                                    color: LANG_COLORS[lang] || "var(--text-primary)",
                                    border: `1px solid ${(LANG_COLORS[lang] || "#ffffff") + "22"}`,
                                }}>{lang}</span>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", opacity: 0.6 }}>Seeking:</span>
                        <span style={{ 
                            fontSize: "0.8rem", 
                            fontWeight: 700, 
                            color: "var(--accent-pink)",
                            background: "rgba(255,107,154,0.05)",
                            padding: "0.2rem 0.6rem",
                            borderRadius: "0.4rem"
                        }}>
                            {INTENT_LABELS[developer.intentMode] || developer.intentMode}
                        </span>
                    </div>
                </div>
                
                {/* Score badge (Floating) */}
                <div style={{
                    position: "absolute", top: 20, right: 20,
                    padding: "0.4rem 0.8rem",
                    fontSize: "0.8rem", fontWeight: 800,
                    background: "var(--bg-card)",
                    border: "1px solid var(--card-border)",
                    color: "var(--accent-pink)",
                    borderRadius: "0.6rem",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}>
                    {developer.compatibilityScore}%
                </div>
            </div>
        </motion.div>
    );
}
