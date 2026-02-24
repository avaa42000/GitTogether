"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";

export default function AuthCard() {
    const [tab, setTab] = useState<"login" | "signup">("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "1.1rem",
                padding: "1.5rem",
                width: "100%",
                maxWidth: 340,
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            }}
        >
            {/* Login / Sign Up tabs */}
            <div style={{ display: "flex", background: "rgba(255,255,255,0.04)", borderRadius: "0.55rem", padding: 3 }}>
                {(["login", "signup"] as const).map((t) => (
                    <button key={t} onClick={() => setTab(t)} style={{
                        flex: 1,
                        padding: "0.6rem",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        border: "none",
                        borderRadius: "0.4rem",
                        cursor: "pointer",
                        transition: "all 0.18s",
                        background: tab === t ? "linear-gradient(135deg, #e8614a, #d44a34)" : "transparent",
                        color: tab === t ? "white" : "rgba(255,255,255,0.42)",
                    }}>
                        {t === "login" ? "Login" : "Sign Up"}
                    </button>
                ))}
            </div>

            {/* Email + Password */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="gt-input" />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="gt-input" />
            </div>

            {/* Primary button */}
            <button className="gt-btn-coral">{tab === "login" ? "Login" : "Create Account"}</button>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
                <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.35)" }}>or</span>
                <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            </div>

            {/* GitHub button */}
            <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={() => signIn("github", { callbackUrl: "/intent" })}
                className="gt-btn-dark"
            >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                Continue with GitHub
            </motion.button>

            {/* Terms */}
            <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.32)", textAlign: "center" }}>
                By continuing, you agree to our{" "}
                <span style={{ color: "#e8614a", cursor: "pointer" }}>Terms of Service</span>
                {" "}and{" "}
                <span style={{ color: "#e8614a", cursor: "pointer" }}>Privacy Policy</span>
            </p>
        </motion.div>
    );
}
