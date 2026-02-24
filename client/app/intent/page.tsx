"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";
import IntentGrid from "@/components/intent/IntentGrid";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

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
            await axios.patch(`${API}/api/users/me`, { intentMode: id }, { withCredentials: true });
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
            padding: "2rem 1rem",
        }}>
            <motion.div
                initial={{ opacity: 0, y: -18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                style={{ textAlign: "center", marginBottom: "2rem" }}
            >
                <h1 style={{ fontSize: "2.4rem", fontWeight: 800, color: "#e8614a", marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>
                    What are you looking for?
                </h1>
                <p style={{ color: "rgba(255,255,255,0.42)", fontSize: "0.9rem" }}>
                    We&apos;ll match you with developers who share your intent.
                </p>
            </motion.div>

            <IntentGrid selected={selected} loading={loading} onSelect={handleSelect} />
        </main>
    );
}
