import { timelineRouter } from "~/server/api/routers/timeline";
import { profileRouter } from "~/server/api/routers/profile";

import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  timeline: timelineRouter,
  profile: profileRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
