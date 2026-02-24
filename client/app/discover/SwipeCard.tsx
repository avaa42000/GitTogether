"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef } from "react";

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

export function SwipeCard({ developer, onSwipe, isTop, stackIndex }: SwipeCardProps) {
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
                x,
                rotate,
                position: "absolute",
                width: "100%",
                height: "100%",
                top: `${stackIndex * 8}px`,
                scale: isTop ? 1 : 0.96 - stackIndex * 0.02,
                zIndex: 10 - stackIndex,
            }}
            drag={isTop ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            className="cursor-grab active:cursor-grabbing"
        >
            {/* Stamps */}
            {isTop && (
                <motion.div style={{ opacity: likeOpacity }}
                    className="absolute top-5 left-5 z-20 rotate-[-20deg] text-2xl font-black px-3 py-1 rounded-xl pointer-events-none"
                    style={{ opacity: likeOpacity, border: "3px solid #4ade80", color: "#4ade80" } as any}
                >
                    LIKE
                </motion.div>
            )}
            {isTop && (
                <motion.div
                    style={{ opacity: passOpacity, border: "3px solid #e8614a", color: "#e8614a" } as any}
                    className="absolute top-5 right-5 z-20 rotate-[20deg] text-2xl font-black px-3 py-1 rounded-xl pointer-events-none"
                >
                    NOPE
                </motion.div>
            )}

            <div
                className="w-full h-full flex flex-col overflow-hidden select-none"
                style={{ background: "var(--bg-card)", border: "1px solid var(--color-border)", borderRadius: "1rem", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
            >
                {/* Header */}
                <div
                    className="relative h-44 flex items-end p-5"
                    style={{ background: "linear-gradient(135deg, rgba(180,40,60,0.5), rgba(100,20,40,0.5))" }}
                >
                    <div className="flex items-end gap-4 z-10 w-full">
                        <img
                            src={developer.avatarUrl || `https://ui-avatars.com/api/?name=${developer.username}&background=3a1020&color=e8614a`}
                            alt={developer.username}
                            className="w-18 h-18 rounded-2xl shrink-0"
                            style={{ width: 72, height: 72, border: "2px solid rgba(232,97,74,0.4)" }}
                        />
                        <div className="min-w-0">
                            <h2 className="text-lg font-bold text-white truncate">{developer.name || developer.username}</h2>
                            <p className="text-sm" style={{ color: "var(--color-coral)" }}>@{developer.username}</p>
                            {developer.location && (
                                <p className="text-xs mt-0.5 truncate" style={{ color: "var(--color-text-muted)" }}>📍 {developer.location}</p>
                            )}
                        </div>
                    </div>
                    {/* Score badge */}
                    <div
                        className="absolute top-4 right-4 px-3 py-1.5 text-xs font-bold rounded-lg"
                        style={{ background: "rgba(232,97,74,0.15)", border: "1px solid rgba(232,97,74,0.3)", color: "var(--color-coral)" }}
                    >
                        {developer.compatibilityScore}% match
                    </div>
                </div>

                {/* Body */}
                <div className="flex-1 p-5 flex flex-col gap-3">
                    {developer.bio && (
                        <p className="text-sm leading-relaxed line-clamp-3" style={{ color: "var(--color-text-muted)" }}>
                            {developer.bio}
                        </p>
                    )}

                    <div>
                        <p className="text-xs mb-2 uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>Tech Stack</p>
                        <div className="flex flex-wrap gap-2">
                            {(developer.primaryStack as string[]).map((lang) => (
                                <span
                                    key={lang}
                                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                                    style={{
                                        backgroundColor: `${LANG_COLORS[lang] || "#e8614a"}22`,
                                        color: LANG_COLORS[lang] || "#e8614a",
                                        border: `1px solid ${LANG_COLORS[lang] || "#e8614a"}44`,
                                    }}
                                >
                                    {lang}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-auto">
                        <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>Looking for: </span>
                        <span className="text-xs font-semibold" style={{ color: "var(--color-coral)" }}>
                            {INTENT_LABELS[developer.intentMode] || developer.intentMode}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
