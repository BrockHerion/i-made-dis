import { TRPCError } from "@trpc/server";
import { protectedProcedure, publicProcedure } from "./../trpc";
import { router } from "../trpc";
import { z } from "zod";

export const projectRouter = router({
  getProjectBySlug: publicProcedure
    .input(
      z.object({
        slug: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { slug } = input;

      if (!slug) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Slug is required",
        });
      }

      const project = await ctx.prisma.project.findUniqueOrThrow({
        where: {
          slug,
        },
        include: {
          user: true,
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });

      if (!project) {
        return null;
      }

      // Load likes and views
      const result = await ctx.prisma.$transaction([
        ctx.prisma.view.findUnique({
          where: { slug },
        }),
        ctx.prisma.like.findMany({
          where: { entityId: project.id, liked: true },
        }),
      ]);

      const { id, ...details } = project;

      return {
        id,
        details,
        views: result[0],
        likes: result[1],
      };
    }),
  getProjectLikes: publicProcedure
    .input(
      z.object({
        projectId: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { projectId } = input;

      if (!projectId) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      return ctx.prisma.like.findMany({
        where: {
          entityId: projectId,
          liked: true,
        },
      });
    }),
  likeProject: protectedProcedure
    .input(
      z.object({
        projectId: z.string().nullish(),
        userId: z.string().nullish(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, projectId } = input;

      if (!userId || !projectId) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      const entityType = await ctx.prisma.entityType.findUnique({
        where: {
          name: "project",
        },
      });

      const like = await ctx.prisma.like.findUnique({
        where: {
          userId_entityId: {
            userId,
            entityId: projectId,
          },
        },
      });

      if (!like) {
        await ctx.prisma.like.create({
          data: {
            entityId: projectId,
            user: {
              connect: {
                id: userId,
              },
            },
            liked: true,
            entityType: {
              connect: {
                id: entityType?.id,
              },
            },
          },
        });
      } else {
        await ctx.prisma.like.update({
          where: {
            userId_entityId: {
              userId,
              entityId: projectId,
            },
          },
          data: {
            liked: !like.liked,
          },
        });
      }

      return ctx.prisma.like.findMany({
        where: {
          entityId: projectId,
          liked: true,
        },
      });
    }),
});
