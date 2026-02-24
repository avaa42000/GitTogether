"use client";
import Link from "next/link";
import { motion } from "framer-motion";

interface MatchListItemProps {
    matchId: string;
    partner: { avatarUrl: string | null; username: string; name: string | null };
    lastMessage: { messageText: string } | null;
    compatibilityScore: number;
    index: number;
}

export default function MatchListItem({ matchId, partner, lastMessage, compatibilityScore, index }: MatchListItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
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
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <p style={{ fontWeight: 700, color: "#e8614a", fontSize: "0.9rem" }}>{Math.round(compatibilityScore)}%</p>
                        <p style={{ fontSize: "0.75rem", color: "var(--muted)" }}>match</p>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
