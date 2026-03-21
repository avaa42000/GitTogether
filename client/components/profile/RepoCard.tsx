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
    const langColor = LANG_COLORS[repo.language || ""] || "var(--accent-pink)";

    return (
        <motion.a
            href={`https://github.com/${username}/${repo.repoName}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            className="gt-card"
            style={{
                display: "block",
                textDecoration: "none",
                padding: "1.25rem",
                transition: "all 0.2s ease",
            }}
        >
            {/* Repo name */}
            <p style={{ fontWeight: 800, color: "var(--accent-pink)", fontSize: "0.95rem", marginBottom: "0.5rem" }}>
                {repo.repoName}
            </p>

            {/* Topics */}
            {repo.topics.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.75rem" }}>
                    {repo.topics.slice(0, 3).map((t) => (
                        <span key={t} style={{
                            fontSize: "0.7rem",
                            fontWeight: 500,
                            padding: "0.15rem 0.5rem",
                            borderRadius: "0.4rem",
                            background: "rgba(255,255,255,0.03)",
                            color: "var(--text-secondary)",
                            border: "1px solid var(--card-border)",
                        }}>{t}</span>
                    ))}
                </div>
            )}

            {/* Footer: lang + stars + forks */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "auto", opacity: 0.8 }}>
                {repo.language && (
                    <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: langColor, fontWeight: 600 }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: langColor, display: "inline-block" }} />
                        {repo.language}
                    </span>
                )}
                <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <span style={{opacity: 0.5}}>⭐</span> {repo.stars}
                </span>
                <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <span style={{opacity: 0.5}}>🍴</span> {repo.forks}
                </span>
            </div>
        </motion.a>
    );
}
