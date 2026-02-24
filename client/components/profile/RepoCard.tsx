"use client";
import { motion } from "framer-motion";

interface Repo {
    id: string;
    repoName: string;
    language: string | null;
    stars: number;
    forks: number;
    topics: string[];
}

interface RepoCardProps {
    repo: Repo;
    index: number;
    username: string;
}

const LANG_COLORS: Record<string, string> = {
    JavaScript: "#f7df1e", TypeScript: "#3178c6", Python: "#3572a5",
    Go: "#00add8", Rust: "#dea584", Java: "#b07219", "C++": "#f34b7d",
    Ruby: "#701516", Swift: "#fa7343", Kotlin: "#a97bff",
};

export default function RepoCard({ repo, index, username }: RepoCardProps) {
    const langColor = LANG_COLORS[repo.language || ""] || "#e8614a";

    return (
        <motion.a
            href={`https://github.com/${username}/${repo.repoName}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            whileHover={{ y: -2 }}
            style={{
                display: "block",
                textDecoration: "none",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "0.75rem",
                padding: "1rem 1.1rem",
                transition: "border-color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(232,97,74,0.35)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
        >
            {/* Repo name */}
            <p style={{ fontWeight: 700, color: "#e8614a", fontSize: "0.9rem", marginBottom: "0.3rem" }}>
                📁 {repo.repoName}
            </p>

            {/* Topics */}
            {repo.topics.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginBottom: "0.6rem" }}>
                    {repo.topics.slice(0, 3).map((t) => (
                        <span key={t} style={{
                            fontSize: "0.68rem",
                            padding: "0.15rem 0.5rem",
                            borderRadius: "999px",
                            background: "rgba(232,97,74,0.08)",
                            color: "rgba(255,255,255,0.55)",
                            border: "1px solid rgba(232,97,74,0.2)",
                        }}>{t}</span>
                    ))}
                </div>
            )}

            {/* Footer: lang + stars + forks */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "auto" }}>
                {repo.language && (
                    <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.78rem", color: langColor }}>
                        <span style={{ width: 10, height: 10, borderRadius: "50%", background: langColor, display: "inline-block" }} />
                        {repo.language}
                    </span>
                )}
                <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>⭐ {repo.stars}</span>
                <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>🍴 {repo.forks}</span>
            </div>
        </motion.a>
    );
}
