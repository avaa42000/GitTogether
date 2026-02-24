import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
    ],
    pages: {
        signIn: "/",
        error: "/",
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 8, // 8 hours — session expires after 8h, not days
    },
    cookies: {
        sessionToken: {
            name: `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
                // Do NOT set maxAge here — browser session cookie (deleted on browser close)
            },
        },
    },
    callbacks: {
        async signIn({ account, profile }) {
            if (account?.provider !== "github") return false;
            try {
                await axios.post(`${API}/api/auth/sync`, {
                    accessToken: account.access_token,
                    githubId: String((profile as any).id),
                    username: (profile as any).login,
                    name: (profile as any).name,
                    avatarUrl: (profile as any).avatar_url,
                    bio: (profile as any).bio,
                    location: (profile as any).location,
                });
            } catch (err) {
                console.error("Backend sync failed:", (err as Error).message);
            }
            return true;
        },
        async jwt({ token, account, profile }) {
            if (account) {
                token.accessToken = account.access_token;
                token.githubId = String((profile as any)?.id);
                token.username = (profile as any)?.login;
            }
            return token;
        },
        async session({ session, token }) {
            (session as any).accessToken = token.accessToken;
            (session as any).user.githubId = token.githubId;
            (session as any).user.username = token.username;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
