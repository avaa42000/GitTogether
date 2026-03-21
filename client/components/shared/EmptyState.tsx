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
        <div className="gt-card" style={{
            padding: "3.5rem 2rem",
            textAlign: "center",
            maxWidth: 420,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
        }}>
            <p style={{ fontSize: "3rem", marginBottom: "0.5rem", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.2))" }}>{emoji}</p>
            <p style={{ fontWeight: 800, color: "var(--text-primary)", fontSize: "1.2rem", letterSpacing: "-0.01em" }}>{title}</p>
            <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", opacity: 0.7, lineHeight: 1.5 }}>{subtitle}</p>

            {actionLabel && (
                actionHref ? (
                    <Link href={actionHref}
                        className="gt-btn-coral"
                        style={{
                            display: "inline-block",
                            marginTop: "1.5rem",
                            textDecoration: "none",
                            width: "auto",
                            padding: "0.75rem 2rem",
                        }}
                    >{actionLabel}</Link>
                ) : (
                    <button onClick={onAction} className="gt-btn-coral" style={{
                        marginTop: "1.5rem",
                        width: "auto",
                        padding: "0.75rem 2rem",
                    }}>{actionLabel}</button>
                )
            )}
        </div>
    );
}
