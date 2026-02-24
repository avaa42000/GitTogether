"use client";
import { useRouter } from "next/navigation";

interface ChatTopBarProps {
    title?: string;
}

export default function ChatTopBar({ title = "Chat" }: ChatTopBarProps) {
    const router = useRouter();
    return (
        <div style={{
            position: "sticky",
            top: 0,
            zIndex: 40,
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.75rem 1.25rem",
            background: "rgba(20,10,14,0.9)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid var(--border)",
        }}>
            <button
                onClick={() => router.push("/matches")}
                style={{ background: "none", border: "none", color: "var(--muted)", fontSize: "0.875rem", cursor: "pointer", padding: 0 }}
            >
                ← Back
            </button>
            <p style={{ fontWeight: 600, color: "white", fontSize: "0.95rem" }}>{title}</p>
        </div>
    );
}
