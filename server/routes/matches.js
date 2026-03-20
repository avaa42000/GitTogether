const express = require("express");
const router = express.Router();
const prisma = require("../lib/prisma");
const requireAuth = require("../middleware/requireAuth");

// GET /api/matches
router.get("/", requireAuth, async (req, res) => {
    try {
        const matches = await prisma.match.findMany({
            where: {
                OR: [{ user1Id: req.userId }, { user2Id: req.userId }],
            },
            include: {
                user1: { select: { id: true, username: true, name: true, avatarUrl: true, primaryStack: true, intentMode: true } },
                user2: { select: { id: true, username: true, name: true, avatarUrl: true, primaryStack: true, intentMode: true } },
                messages: { orderBy: { createdAt: "desc" }, take: 1 },
            },
            orderBy: { createdAt: "desc" },
        });

        // Return the "other" user for each match
        const formatted = matches.map((m) => ({
            matchId: m.id,
            compatibilityScore: m.compatibilityScore,
            createdAt: m.createdAt,
            lastMessage: m.messages[0] || null,
            partner: m.user1Id === req.userId ? m.user2 : m.user1,
        }));

        console.log("DEBUG: Formatted matches:", JSON.stringify(formatted, null, 2));
        res.json(formatted);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE /api/matches/:matchId — Unmatch
router.delete("/:matchId", requireAuth, async (req, res) => {
    const { matchId } = req.params;
    try {
        const match = await prisma.match.findUnique({
            where: { id: matchId },
        });

        if (!match) return res.status(404).json({ error: "Match not found" });
        if (match.user1Id !== req.userId && match.user2Id !== req.userId) {
            return res.status(403).json({ error: "Unauthorized to unmatch" });
        }

        // Delete the match (cascades to messages)
        await prisma.match.delete({ where: { id: matchId } });

        // IMPORTANT: Also delete the reciprocal swipes so they can match again later
        await prisma.swipe.deleteMany({
            where: {
                OR: [
                    { swiperId: match.user1Id, targetId: match.user2Id },
                    { swiperId: match.user2Id, targetId: match.user1Id },
                ],
            },
        });

        res.json({ success: true, message: "Unmatched successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
