"use client";
import { motion } from "framer-motion";

interface ProfileHeaderProps {
    avatarUrl: string | null;
    name: string | null;
    username: string;
    bio: string | null;
    location: string | null;
    intentMode: string | null;
    primaryStack: string[];
    githubStats: {
        followers: number;
        following: number;
        publicRepos: number;
        company?: string;
        blog?: string;
        twitterUsername?: string;
        githubUrl?: string;
        createdAt?: string;
    };
}

const INTENT_LABELS: Record<string, string> = {
    networking: "💼 Professional Networking",
    collab: "🚀 Project Collaboration",
    hackathon: "🏆 Hackathon Partner",
    learning: "📚 Learning Buddy",
    dating: "💝 Dating Mode",
    casual: "🎮 Casual Dev Connect",
};

const LANG_COLORS: Record<string, string> = {
    JavaScript: "#f7df1e", TypeScript: "#3178c6", Python: "#3572a5",
    Go: "#00add8", Rust: "#dea584", Java: "#b07219", "C++": "#f34b7d",
    Ruby: "#701516", Swift: "#fa7343", Kotlin: "#a97bff",
};

export default function ProfileHeader({ avatarUrl, name, username, bio, location, intentMode, primaryStack, githubStats }: ProfileHeaderProps) {
    const joinYear = githubStats.createdAt ? new Date(githubStats.createdAt).getFullYear() : null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "1rem",
                overflow: "hidden",
                width: "100%",
            }}
        >
            {/* Banner */}
            <div style={{
                height: 120,
                background: "linear-gradient(135deg, rgba(180,40,60,0.6), rgba(100,20,80,0.4), rgba(180,40,60,0.3))",
            }} />

            {/* Avatar + info */}
            <div style={{ padding: "0 1.5rem 1.5rem", position: "relative" }}>
                {/* Avatar overlapping banner */}
                <div style={{ position: "relative", marginTop: -48 }}>
                    <img
                        src={avatarUrl || `https://ui-avatars.com/api/?name=${username}&background=3a1020&color=e8614a&size=128`}
                        alt={username}
                        style={{
                            width: 96, height: 96,
                            borderRadius: "1rem",
                            border: "3px solid var(--bg-card)",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                        }}
                    />
                </div>

                {/* Name */}
                <div style={{ marginTop: "0.75rem" }}>
                    <h1 style={{ fontSize: "1.4rem", fontWeight: 800, color: "white" }}>{name || username}</h1>
                    <a
                        href={githubStats.githubUrl || `https://github.com/${username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: "0.875rem", color: "#e8614a", textDecoration: "none" }}
                    >
                        @{username}
                    </a>
                </div>

                {/* Bio */}
                {bio && (
                    <p style={{ marginTop: "0.75rem", fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.55 }}>
                        {bio}
                    </p>
                )}

                {/* Meta info */}
                <div style={{ marginTop: "0.75rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                    {location && <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>📍 {location}</span>}
                    {githubStats.company && <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>🏢 {githubStats.company}</span>}
                    {githubStats.blog && (
                        <a href={githubStats.blog.startsWith("http") ? githubStats.blog : `https://${githubStats.blog}`}
                            target="_blank" rel="noopener noreferrer"
                            style={{ fontSize: "0.8rem", color: "#e8614a", textDecoration: "none" }}>
                            🔗 {githubStats.blog}
                        </a>
                    )}
                    {githubStats.twitterUsername && (
                        <a href={`https://twitter.com/${githubStats.twitterUsername}`} target="_blank" rel="noopener noreferrer"
                            style={{ fontSize: "0.8rem", color: "#1d9bf0", textDecoration: "none" }}>
                            𝕏 @{githubStats.twitterUsername}
                        </a>
                    )}
                    {joinYear && <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>📅 Joined {joinYear}</span>}
                </div>

                {/* GitHub Stats */}
                <div style={{
                    marginTop: "1rem",
                    display: "flex",
                    gap: "1.5rem",
                    padding: "0.75rem 1rem",
                    background: "rgba(255,255,255,0.04)",
                    borderRadius: "0.6rem",
                }}>
                    {[
                        { label: "Repositories", value: githubStats.publicRepos || 0 },
                        { label: "Followers", value: githubStats.followers || 0 },
                        { label: "Following", value: githubStats.following || 0 },
                    ].map(({ label, value }) => (
                        <div key={label} style={{ textAlign: "center" }}>
                            <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "white" }}>{value}</p>
                            <p style={{ fontSize: "0.72rem", color: "var(--muted)" }}>{label}</p>
                        </div>
                    ))}
                </div>

                {/* Tech Stack */}
                {primaryStack.length > 0 && (
                    <div style={{ marginTop: "1rem" }}>
                        <p style={{ fontSize: "0.72rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
                            Tech Stack
                        </p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                            {primaryStack.map((lang) => (
                                <span key={lang} style={{
                                    fontSize: "0.78rem", fontWeight: 600,
                                    padding: "0.3rem 0.8rem",
                                    borderRadius: "999px",
                                    background: `${LANG_COLORS[lang] || "#e8614a"}22`,
                                    color: LANG_COLORS[lang] || "#e8614a",
                                    border: `1px solid ${LANG_COLORS[lang] || "#e8614a"}44`,
                                }}>{lang}</span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Intent badge */}
                {intentMode && (
                    <div style={{ marginTop: "1rem" }}>
                        <span style={{
                            fontSize: "0.78rem", fontWeight: 600,
                            padding: "0.3rem 0.85rem",
                            borderRadius: "999px",
                            background: "rgba(232,97,74,0.12)",
                            color: "#e8614a",
                            border: "1px solid rgba(232,97,74,0.3)",
                        }}>
                            {INTENT_LABELS[intentMode] || intentMode}
                        </span>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
