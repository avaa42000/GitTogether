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

    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (matchId && status === "authenticated" && myId) {
            fetchMessages();

            // Socket setup
            console.log("🔌 Initializing connection for room:", matchId);
            socket.io.opts.query = { matchId }; // Optional: pass matchId in query
            socket.connect();

            const onConnect = () => {
                console.log("✅ Socket connected. Joining room:", matchId);
                setIsConnected(true);
                socket.emit("join-room", matchId);
            };

            const onDisconnect = () => {
                console.log("❌ Socket disconnected.");
                setIsConnected(false);
            };

            const onNewMessage = (newMsg: any) => {
                console.log("📩 New real-time message received:", newMsg);
                setMessages((prev) => {
                    if (prev.find(m => m.id === newMsg.id)) return prev;
                    return [...prev, newMsg];
                });
                setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 80);
            };

            socket.on("connect", onConnect);
            socket.on("disconnect", onDisconnect);
            socket.on("new-message", onNewMessage);

            // If already connected when effect runs
            if (socket.connected) onConnect();

            return () => {
                console.log("🧹 Cleanup: removing listeners for room:", matchId);
                socket.off("connect", onConnect);
                socket.off("disconnect", onDisconnect);
                socket.off("new-message", onNewMessage);
                socket.disconnect();
            };
        }
    }, [matchId, status, myId]);

    const handleSend = async (text: string) => {
        try {
            await api.post(`/api/messages/${matchId}`, { messageText: text });
        } catch (err) {
            console.error("Failed to send message:", err);
        }
    };

    if (status === "loading") return <LoadingSpinner />;

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <ChatTopBar title={partnerName} matchId={matchId} />
            
            {/* Connection Status Indicator */}
            {!isConnected && (
                <div style={{ background: "rgba(232,97,74,0.1)", color: "#e8614a", fontSize: "0.7rem", textAlign: "center", padding: "0.25rem", borderBottom: "1px solid rgba(232,97,74,0.2)" }}>
                    Connecting to real-time chat...
                </div>
            )}
            {isConnected && (
                <div style={{ position: "absolute", top: "2.8rem", left: "4.5rem", zIndex: 100, display: "flex", alignItems: "center", gap: "4px" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80" }} />
                    <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>Live</span>
                </div>
            )}
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
