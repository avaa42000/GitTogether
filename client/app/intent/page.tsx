"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import api from "@/lib/api";
import IntentGrid from "@/components/intent/IntentGrid";

export default function IntentPage() {
    const router = useRouter();
    const [selected, setSelected] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSelect(id: string) {
        if (loading) return;
        setSelected(id);
        setLoading(true);
        // Save to localStorage so discover page knows the current mode
        localStorage.setItem("gt_intent", id);
        try {
            await api.patch(`/api/users/me`, { intentMode: id });
        } catch { /* non-fatal */ }
        finally {
            setLoading(false);
            router.push("/discover");
        }
    }

    return (
        <main style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2.5rem 1.5rem",
            background: "var(--bg-main)",
        }}>
            <motion.div
                initial={{ opacity: 0, y: -18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                style={{ textAlign: "center", marginBottom: "3rem" }}
            >
                <h1 style={{ 
                    fontSize: "2.6rem", 
                    fontWeight: 900, 
                    color: "var(--accent-pink)", 
                    marginBottom: "0.75rem", 
                    letterSpacing: "-0.03em",
                    filter: "drop-shadow(0 2px 10px rgba(255,107,154,0.2))"
                }}>
                    What are you looking for?
                </h1>
                <p style={{ color: "var(--text-secondary)", fontSize: "1rem", fontWeight: 500, opacity: 0.8 }}>
                    We&apos;ll match you with developers who share your intent.
                </p>
            </motion.div>

            <IntentGrid selected={selected} loading={loading} onSelect={handleSelect} />
        </main>
    );
}
