"use client";
import IntentCard from "./IntentCard";

const INTENTS = [
    { id: "networking", emoji: "💼", label: "Professional Networking" },
    { id: "collab", emoji: "🚀", label: "Project Collaboration" },
    { id: "hackathon", emoji: "🏆", label: "Hackathon Partner" },
    { id: "learning", emoji: "📚", label: "Learning Buddy" },
    { id: "dating", emoji: "💝", label: "Dating Mode" },
    { id: "casual", emoji: "🎮", label: "Casual Dev Connect" },
];

interface IntentGridProps {
    selected: string | null;
    loading: boolean;
    onSelect: (id: string) => void;
}

export default function IntentGrid({ selected, loading, onSelect }: IntentGridProps) {
    return (
        <div className="intent-grid">
            {INTENTS.map((intent, i) => (
                <IntentCard
                    key={intent.id}
                    id={intent.id}
                    emoji={intent.emoji}
                    label={intent.label}
                    selected={selected === intent.id}
                    disabled={loading}
                    index={i}
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
}
