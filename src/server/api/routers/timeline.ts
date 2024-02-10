import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const timelineRouter = createTRPCRouter({
  infiniteFeed: publicProcedure.input(
    z.object({
      limit: z.number().optional(),
      cursor: z.object({ id: z.string(), createdAt: z.date() }).
      optional(),
    })).query(async ({ input: { limit = 10, cursor }, ctx }) =>{
      const currentUserId = ctx.session?.user.id
      const timeline = await ctx.db.timeline.findMany({
        take: limit + 1,
        cursor: cursor ? {createdAt_id: cursor} : undefined,
        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
        select: {
          id: true,
          content: true,
          createdAt: true,
          _count: { select : {likes: true}},
          likes: currentUserId == null ? false : { where: {
            userId: currentUserId
          }},
          user: {
            select: {name: true, id: true, image: true}
          }
        }
      })
      let nextCursor: typeof cursor | undefined
      if (timeline.length > limit){
      const nextItem = timeline.pop();
      if (nextItem != null){
        nextCursor = { id: nextItem.id, createdAt: nextItem.createdAt}
      }
      }
    return { timeline: timeline.map(timeline =>{
      return {
        id:timeline.id,
        content: timeline.content,
        createdAt: timeline.createdAt,
        likeCount: timeline._count.likes,
        user: timeline.user,
        likedByMe: timeline.likes?.length > 0,
      };
    }), nextCursor };
      
    }),
  create: protectedProcedure
    .input(z.object({ content: z.string() }))
    .mutation(async ({ input: { content }, ctx }) => {
      const timeline = await ctx.db.timeline.create({
        data: { content, userId: ctx.session.user.id },
      });
      return timeline;
    }),
    toggleLike: protectedProcedure.input(z.object({id: z.string()})).mutation(async ({ input: { id }, ctx }) =>{
      const data = { TimelineId: id, userId: ctx.session.user.id }
      const existingPost = await ctx.db.like.findUnique({
        where: { userId_TimelineId: data }
      })
    if(existingPost == null){
      await ctx.db.like.create({ data })
      return { addedLike: true }
    }else{
      await ctx.db.like.delete({ where: { userId_TimelineId: data } })
      return { addedLike: true }
    }
    }),
});
