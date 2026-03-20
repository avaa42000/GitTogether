"use client";
import Link from "next/link";
import { motion } from "framer-motion";

interface MatchListItemProps {
    matchId: string;
    partner: { avatarUrl: string | null; username: string; name: string | null };
    lastMessage: { messageText: string } | null;
    compatibilityScore: number;
    index: number;
    onUnmatch: () => void;
}

import api from "@/lib/api";
import { useState } from "react";

export default function MatchListItem({ matchId, partner, lastMessage, compatibilityScore, index, onUnmatch }: MatchListItemProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleUnmatch = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!confirm(`Unmatch with ${partner.name || partner.username}?`)) return;

        setIsDeleting(true);
        try {
            await api.delete(`/api/matches/${matchId}`);
            onUnmatch();
        } catch (err) {
            console.error("Failed to unmatch:", err);
            alert("Failed to unmatch. Please try again.");
            setIsDeleting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            style={{ opacity: isDeleting ? 0.5 : 1, pointerEvents: isDeleting ? "none" : "auto" }}
        >
            <Link href={`/chat/${matchId}`} style={{ textDecoration: "none" }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        padding: "1rem",
                        background: "var(--bg-card)",
                        border: "1px solid var(--border)",
                        borderRadius: "0.875rem",
                        cursor: "pointer",
                        transition: "background 0.15s, border-color 0.15s",
                        position: "relative",
                    }}
                    onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.background = "#281828";
                        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(232,97,74,0.3)";
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.background = "var(--bg-card)";
                        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
                    }}
                >
                    <img
                        src={partner.avatarUrl || `https://ui-avatars.com/api/?name=${partner.username}&background=3a1020&color=e8614a`}
                        alt={partner.username}
                        style={{ width: 48, height: 48, borderRadius: "0.75rem", border: "1px solid rgba(232,97,74,0.2)", flexShrink: 0 }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontWeight: 600, color: "white", marginBottom: "0.2rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {partner.name || partner.username}
                        </p>
                        <p style={{ fontSize: "0.85rem", color: "var(--muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {lastMessage ? lastMessage.messageText : "Say hello! 👋"}
                        </p>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0, display: "flex", alignItems: "center", gap: "1rem" }}>
                        <div style={{ textAlign: "right" }}>
                            <p style={{ fontWeight: 700, color: "#e8614a", fontSize: "0.9rem" }}>{Math.round(compatibilityScore)}%</p>
                            <p style={{ fontSize: "0.75rem", color: "var(--muted)" }}>match</p>
                        </div>
                        <button
                            onClick={handleUnmatch}
                            style={{
                                background: "rgba(232,97,74,0.1)",
                                border: "1px solid rgba(232,97,74,0.2)",
                                color: "#e8614a",
                                padding: "0.5rem",
                                borderRadius: "0.5rem",
                                cursor: "pointer",
                                fontSize: "0.8rem",
                                transition: "all 0.15s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(232,97,74,0.25)")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(232,97,74,0.1)")}
                            title="Unmatch"
                        >
                            🗑️
                        </button>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
