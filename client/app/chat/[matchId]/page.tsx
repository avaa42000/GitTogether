"use client";
import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import api from "@/lib/api";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ChatTopBar from "@/components/chat/ChatTopBar";
import MessageBubble from "@/components/chat/MessageBubble";
import ChatInput from "@/components/chat/ChatInput";


import { socket } from "@/lib/socket";

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
        api.get(`/api/users/me`).then((r) => setMyId(r.data.id)).catch(() => { });
    }, [status]);

    const [partnerName, setPartnerName] = useState<string>("Chat");

    const fetchMessages = async () => {
        try {
            const res = await api.get(`/api/messages/${matchId}`);
            setMessages(res.data);
            
            // Get partner name from the first message sent by them or from the match data
            // For now, let's just fetch it from the first message that's not from me
            const otherMsg = res.data.find((m: any) => m.sender.id !== myId);
            if (otherMsg) setPartnerName(otherMsg.sender.name || otherMsg.sender.username);

            setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 80);
        } catch { }
    };

    useEffect(() => {
        if (matchId && status === "authenticated" && myId) {
            fetchMessages();

            // Socket setup
            console.log("🔌 Attempting socket connection to room:", matchId);
            socket.connect();

            // Join room once connected
            socket.on("connect", () => {
                console.log("📝 Joining room:", matchId);
                socket.emit("join-room", matchId);
            });

            socket.on("new-message", (newMsg) => {
                console.log("📩 New real-time message received:", newMsg);
                setMessages((prev) => {
                    if (prev.find(m => m.id === newMsg.id)) return prev;
                    return [...prev, newMsg];
                });
                setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 80);
            });

            return () => {
                console.log("🔌 Cleaning up socket for room:", matchId);
                socket.off("connect");
                socket.off("new-message");
                socket.disconnect();
            };
        }
    }, [matchId, status, myId]);

    const handleSend = async (text: string) => {
        try {
            // Send to DB via API (which will broadcast via socket)
            await api.post(`/api/messages/${matchId}`, { messageText: text });
        } catch (err) {
            console.error("Failed to send message:", err);
        }
    };

    if (status === "loading") return <LoadingSpinner />;

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <ChatTopBar title={partnerName} matchId={matchId} />

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
