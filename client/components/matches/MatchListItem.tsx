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
                    className="gt-card"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1.25rem",
                        padding: "1.25rem",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                    }}
                >
                    <img
                        src={partner.avatarUrl || `https://ui-avatars.com/api/?name=${partner.username}\u0026background=242424\u0026color=FF6B9A`}
                        alt={partner.username}
                        style={{ 
                            width: 52, height: 52, 
                            borderRadius: "0.85rem", 
                            border: "1px solid var(--card-border)", 
                            flexShrink: 0,
                            boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
                        }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontWeight: 800, color: "var(--text-primary)", fontSize: "1rem", marginBottom: "0.25rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {partner.name || partner.username}
                        </p>
                        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", opacity: 0.7, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {lastMessage ? lastMessage.messageText : "Double tap to say hello!"}
                        </p>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <p style={{ fontWeight: 900, color: "var(--accent-pink)", fontSize: "1rem" }}>{Math.round(compatibilityScore)}%</p>
                        <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", opacity: 0.5, letterSpacing: "0.05em" }}>match</p>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
