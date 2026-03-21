"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const LINKS = [
    { href: "/discover", label: "Discover", icon: "⚡" },
    { href: "/matches", label: "Matches", icon: "💝" },
];

export default function Navbar() {
    const { data: session } = useSession();
    const pathname = usePathname();

    return (
        <nav className="gt-nav" style={{
            background: "var(--bg-nav)",
            borderBottom: "1px solid var(--card-border)",
        }}>
            {/* Logo */}
            <Link href="/discover" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
                <span style={{ fontSize: "1.2rem", filter: "drop-shadow(0 2px 4px rgba(255,107,154,0.3))" }}>🔗</span>
                <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--accent-pink)", letterSpacing: "-0.02em" }}>GitTogether</span>
            </Link>

            {/* Nav links */}
            <div style={{ display: "flex", gap: "0.5rem" }}>
                {LINKS.map((l) => (
                    <Link key={l.href} href={l.href} style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.5rem 1rem",
                        borderRadius: "0.75rem",
                        textDecoration: "none",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        background: pathname === l.href ? "rgba(255,107,154,0.08)" : "transparent",
                        color: pathname === l.href ? "var(--accent-pink)" : "var(--text-secondary)",
                        transition: "all 0.2s ease",
                        boxShadow: pathname === l.href ? "0 0 15px rgba(255,107,154,0.1)" : "none",
                    }}>
                        <span style={{ opacity: pathname === l.href ? 1 : 0.6 }}>{l.icon}</span>
                        <span>{l.label}</span>
                    </Link>
                ))}
            </div>

            {/* Avatar + sign out */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                {session?.user?.image && (
                    <Link href="/profile" title="View Profile">
                        <img src={session.user.image} alt=""
                            style={{
                                width: 36, height: 36,
                                borderRadius: "0.75rem",
                                border: "1px solid var(--card-border)",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                boxShadow: "var(--soft-shadow)",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = "var(--accent-pink)";
                                e.currentTarget.style.boxShadow = "0 0 10px var(--accent-glow)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "var(--card-border)";
                                e.currentTarget.style.boxShadow = "var(--soft-shadow)";
                            }}
                        />
                    </Link>
                )}
                <button
                    onClick={() => { localStorage.clear(); sessionStorage.clear(); signOut({ callbackUrl: "/" }); }}
                    style={{ 
                        background: "none", 
                        border: "none", 
                        color: "var(--text-secondary)", 
                        fontSize: "0.85rem", 
                        fontWeight: 500,
                        cursor: "pointer",
                        opacity: 0.7,
                        transition: "opacity 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
                >
                    Sign out
                </button>
            </div>
        </nav>
    );
}
