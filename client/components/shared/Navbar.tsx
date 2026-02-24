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
        <nav style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.75rem 1.25rem",
            background: "rgba(20,10,14,0.88)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid var(--border)",
        }}>
            {/* Logo */}
            <Link href="/discover" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
                <span style={{ fontSize: "1.2rem" }}>🔗</span>
                <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#e8614a" }}>GitTogether</span>
            </Link>

            {/* Nav links */}
            <div style={{ display: "flex", gap: "0.25rem" }}>
                {LINKS.map((l) => (
                    <Link key={l.href} href={l.href} style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        padding: "0.45rem 0.85rem",
                        borderRadius: "0.6rem",
                        textDecoration: "none",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        background: pathname === l.href ? "rgba(232,97,74,0.12)" : "transparent",
                        color: pathname === l.href ? "#e8614a" : "var(--muted)",
                        transition: "all 0.15s",
                    }}>
                        <span>{l.icon}</span>
                        <span>{l.label}</span>
                    </Link>
                ))}
            </div>

            {/* Avatar + sign out */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                {session?.user?.image && (
                    <Link href="/profile" title="View Profile">
                        <img src={session.user.image} alt=""
                            style={{
                                width: 32, height: 32,
                                borderRadius: "0.5rem",
                                border: "1px solid rgba(232,97,74,0.25)",
                                cursor: "pointer",
                                transition: "border-color 0.15s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#e8614a")}
                            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(232,97,74,0.25)")}
                        />
                    </Link>
                )}
                <button
                    onClick={() => { localStorage.clear(); sessionStorage.clear(); signOut({ callbackUrl: "/" }); }}
                    style={{ background: "none", border: "none", color: "var(--muted)", fontSize: "0.8rem", cursor: "pointer" }}
                >
                    Sign out
                </button>
            </div>
        </nav>
    );
}
