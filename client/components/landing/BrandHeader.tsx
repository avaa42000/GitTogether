"use client";
// Landing page brand header — "GitTogether" + subtitle
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
                color: "#e8614a",
                marginBottom: "0.4rem",
                letterSpacing: "-0.02em",
            }}>
                GitTogether
            </h1>
            <p style={{ color: "rgba(255,255,255,0.42)", fontSize: "0.9rem" }}>
                Connect with developers who code your language
            </p>
        </motion.div>
    );
}
