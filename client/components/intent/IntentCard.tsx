"use client";
import { motion } from "framer-motion";

interface IntentCardProps {
    id: string;
    emoji: string;
    label: string;
    selected: boolean;
    disabled: boolean;
    index: number;
    onSelect: (id: string) => void;
}

export default function IntentCard({ id, emoji, label, selected, disabled, index, onSelect }: IntentCardProps) {
    return (
        <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07 }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(id)}
            disabled={disabled}
            className={`intent-card ${selected ? "selected" : ""}`}
        >
            <span className="ic-emoji">{emoji}</span>
            <span className="ic-label">{label}</span>
        </motion.button>
    );
}
