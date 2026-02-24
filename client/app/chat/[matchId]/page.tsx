"use client";
import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ChatTopBar from "@/components/chat/ChatTopBar";
import MessageBubble from "@/components/chat/MessageBubble";
import ChatInput from "@/components/chat/ChatInput";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function ChatPage() {
    const { status } = useSession();
    const router = useRouter();
    const params = useParams();
    const matchId = params.matchId as string;

    const [messages, setMessages] = useState<any[]>([]);
    const [myId, setMyId] = useState<string | null>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => { if (status === "unauthenticated") router.replace("/"); }, [status, router]);

    useEffect(() => {
        if (status !== "authenticated") return;
        axios.get(`${API}/api/users/me`, { withCredentials: true }).then((r) => setMyId(r.data.id)).catch(() => { });
    }, [status]);

    const fetchMessages = async () => {
        try {
            const res = await axios.get(`${API}/api/messages/${matchId}`, { withCredentials: true });
            setMessages(res.data);
            setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 80);
        } catch { }
    };

    useEffect(() => {
        if (matchId && status === "authenticated") {
            fetchMessages();
            const t = setInterval(fetchMessages, 3000);
            return () => clearInterval(t);
        }
    }, [matchId, status]);

    const handleSend = async (text: string) => {
        await axios.post(`${API}/api/messages/${matchId}`, { messageText: text }, { withCredentials: true });
        fetchMessages();
    };

    if (status === "loading") return <LoadingSpinner />;

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <ChatTopBar />

            <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem 1rem", display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: 680, margin: "0 auto", width: "100%" }}>
                {messages.map((msg, i) => (
                    <MessageBubble
                        key={msg.id}
                        text={msg.messageText}
                        isMe={msg.sender.id === myId}
                        avatarUrl={msg.sender.avatarUrl}
                        username={msg.sender.username}
                        index={i}
                    />
                ))}
                <div ref={bottomRef} />
            </div>

            <ChatInput onSend={handleSend} />
        </div>
    );
}
