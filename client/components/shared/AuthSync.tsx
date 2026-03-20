"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import api from "@/lib/api";

export default function AuthSync({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated" && (session as any)?.accessToken) {
            // Exchange GitHub access token for Express JWT cookie
            api.post("/api/auth/cookie", { 
                accessToken: (session as any).accessToken 
            }).catch(err => {
                console.error("Auth sync failed:", err);
            });
        }
    }, [session, status]);

    return <>{children}</>;
}
