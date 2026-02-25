import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
    ],
    pages: { signIn: "/", error: "/" },
    session: { strategy: "jwt", maxAge: 60 * 60 * 8 },
    callbacks: {
        async signIn({ account, profile }) {
            if (account?.provider !== "github") return false;
            try {
                // Lightweight sync — just upsert user (no GitHub API repo call)
                // Repo sync happens lazily on profile page load
                await prisma.user.upsert({
                    where: { githubId: String((profile as any).id) },
                    update: {
                        username: (profile as any).login,
                        name: (profile as any).name,
                        avatarUrl: (profile as any).avatar_url,
                        bio: (profile as any).bio,
                        location: (profile as any).location,
                        updatedAt: new Date(),
                    },
                    create: {
                        githubId: String((profile as any).id),
                        username: (profile as any).login,
                        name: (profile as any).name,
                        avatarUrl: (profile as any).avatar_url,
                        bio: (profile as any).bio,
                        location: (profile as any).location,
                        primaryStack: [],
                    },
                });
            } catch (err) {
                console.error("DB sync failed (non-fatal):", err);
                // Still return true — login succeeds even if DB sync fails
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
