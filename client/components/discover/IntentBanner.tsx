"use client";
import { motion } from "framer-motion";
import type { IntentConfig } from "@/lib/intentConfig";

interface IntentBannerProps {
    config: IntentConfig;
    onChangeIntent: () => void;
}

export default function IntentBanner({ config, onChangeIntent }: IntentBannerProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.65rem 1rem",
                borderRadius: "0.75rem",
                background: config.accentBg,
                border: `1px solid ${config.accentColor}33`,
                width: "100%",
                maxWidth: 420,
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span style={{ fontSize: "1.3rem" }}>{config.emoji}</span>
                <div>
                    <p style={{ fontWeight: 700, fontSize: "0.8rem", color: config.accentColor }}>
                        {config.label}
                    </p>
                    <p style={{ fontSize: "0.72rem", color: "var(--muted)", marginTop: 1 }}>
                        {config.tagline}
                    </p>
                </div>
            </div>
            <button
                onClick={onChangeIntent}
                style={{
                    background: "none",
                    border: `1px solid ${config.accentColor}55`,
                    borderRadius: "0.4rem",
                    color: config.accentColor,
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    padding: "0.3rem 0.65rem",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                }}
            >
                Change
            </button>
        </motion.div>
    );
}
