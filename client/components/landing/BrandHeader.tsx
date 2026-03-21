"use client";
import { motion } from "framer-motion";

export default function BrandHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            style={{ textAlign: "center", marginBottom: "1.75rem" }}
        >
            <h1 style={{
                fontSize: "2.8rem",
                fontWeight: 800,
                color: "var(--accent-pink)",
                marginBottom: "0.4rem",
                letterSpacing: "-0.02em",
                filter: "drop-shadow(0 2px 8px rgba(255,107,154,0.2))"
            }}>
                GitTogether
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", fontWeight: 500, opacity: 0.8 }}>
                Connect with developers who code your language
            </p>
        </motion.div>
    );
}
