"use client";
import { useRouter } from "next/navigation";

interface ChatTopBarProps {
    title?: string;
    matchId?: string;
}

import api from "@/lib/api";

export default function ChatTopBar({ title = "Chat", matchId }: ChatTopBarProps) {
    const router = useRouter();

    const handleUnmatch = async () => {
        if (!matchId) return;
        if (!confirm(`Unmatch with this user? This will delete the chat history.`)) return;

        try {
            await api.delete(`/api/matches/${matchId}`);
            router.push("/matches");
        } catch (err) {
            console.error("Failed to unmatch:", err);
            alert("Failed to unmatch. Please try again.");
        }
    };

    return (
        <div style={{
            position: "sticky",
            top: 0,
            zIndex: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.75rem 1.25rem",
            background: "rgba(20,10,14,0.9)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid var(--border)",
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <button
                    onClick={() => router.push("/matches")}
                    style={{ background: "none", border: "none", color: "var(--muted)", fontSize: "0.875rem", cursor: "pointer", padding: 0 }}
                >
                    ← Back
                </button>
                <p style={{ fontWeight: 600, color: "white", fontSize: "0.95rem" }}>{title}</p>
            </div>
            {matchId && (
                <button
                    onClick={handleUnmatch}
                    style={{
                        background: "none",
                        border: "1px solid rgba(232,97,74,0.3)",
                        color: "#e8614a",
                        fontSize: "0.75rem",
                        padding: "0.4rem 0.8rem",
                        borderRadius: "0.5rem",
                        cursor: "pointer",
                        fontWeight: 500,
                        transition: "all 0.15s"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(232,97,74,0.1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                >
                    Unmatch
                </button>
            )}
        </div>
    );
}
