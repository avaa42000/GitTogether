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
        <nav
            className="px-5 py-3 flex items-center justify-between sticky top-0 z-40"
            style={{
                background: "rgba(26, 10, 15, 0.85)",
                backdropFilter: "blur(20px)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
        >
            {/* Logo */}
            <Link href="/discover" className="flex items-center gap-2">
                <span className="text-xl">🔗</span>
                <span className="text-lg font-bold brand-coral">GitTogether</span>
            </Link>

            {/* Nav Links */}
            <div className="flex items-center gap-1">
                {LINKS.map((l) => (
                    <Link
                        key={l.href}
                        href={l.href}
                        className="px-3 py-2 rounded-xl text-sm flex items-center gap-1.5 transition-colors"
                        style={{
                            background: pathname === l.href ? "rgba(232, 97, 74, 0.15)" : "transparent",
                            color: pathname === l.href ? "var(--color-coral)" : "var(--color-text-muted)",
                        }}
                    >
                        <span>{l.icon}</span>
                        <span className="hidden sm:inline">{l.label}</span>
                    </Link>
                ))}
            </div>

            {/* User + Logout */}
            <div className="flex items-center gap-3">
                {session?.user?.image && (
                    <img
                        src={session.user.image}
                        alt={session.user.name || ""}
                        className="w-8 h-8 rounded-lg"
                        style={{ border: "1px solid rgba(232, 97, 74, 0.3)" }}
                    />
                )}
                <button
                    onClick={() => {
                        localStorage.clear();
                        sessionStorage.clear();
                        signOut({ callbackUrl: "/" });
                    }}
                    className="text-xs transition-colors hover:text-white"
                    style={{ color: "var(--color-text-muted)" }}
                >
                    Sign out
                </button>
            </div>
        </nav>
    );
}
