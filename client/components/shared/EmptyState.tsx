import Link from "next/link";

interface EmptyStateProps {
    emoji: string;
    title: string;
    subtitle: string;
    actionLabel?: string;
    actionHref?: string;
    onAction?: () => void;
}

export default function EmptyState({ emoji, title, subtitle, actionLabel, actionHref, onAction }: EmptyStateProps) {
    return (
        <div style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "1rem",
            padding: "3rem",
            textAlign: "center",
            maxWidth: 400,
            margin: "0 auto",
        }}>
            <p style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>{emoji}</p>
            <p style={{ fontWeight: 700, color: "white", marginBottom: "0.4rem" }}>{title}</p>
            <p style={{ fontSize: "0.875rem", color: "var(--muted)" }}>{subtitle}</p>

            {actionLabel && (
                actionHref ? (
                    <Link href={actionHref}
                        style={{
                            display: "inline-block",
                            marginTop: "1.25rem",
                            padding: "0.6rem 1.4rem",
                            background: "linear-gradient(135deg, #e8614a, #d44a34)",
                            color: "white",
                            fontWeight: 600,
                            fontSize: "0.875rem",
                            borderRadius: "0.55rem",
                            textDecoration: "none",
                        }}
                    >{actionLabel}</Link>
                ) : (
                    <button onClick={onAction} style={{
                        marginTop: "1.25rem",
                        padding: "0.6rem 1.4rem",
                        background: "linear-gradient(135deg, #e8614a, #d44a34)",
                        color: "white",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                        borderRadius: "0.55rem",
                        border: "none",
                        cursor: "pointer",
                    }}>{actionLabel}</button>
                )
            )}
        </div>
    );
}
