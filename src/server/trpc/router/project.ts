import { TRPCError } from "@trpc/server";
import { protectedProcedure, publicProcedure } from "./../trpc";
import { router } from "../trpc";
import { z } from "zod";

export const projectRouter = router({
  getProjectByUser: publicProcedure
    .input(
      z.object({
        slug: z.string().nullish(),
      })
    )
    .query(({ ctx, input }) => {
      const { slug } = input;

      if (!slug) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Slug is required",
        });
      }

      return ctx.prisma.project.findUniqueOrThrow({
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
          likes: true,
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

      const project = await prisma?.$transaction(async (tx) => {
        const projectLike = await tx.projectLike.findUnique({
          where: { projectId_userId: { projectId, userId } },
        });

        // Create or update the like
        if (!projectLike) {
          await ctx.prisma.projectLike.create({
            data: {
              project: { connect: { id: projectId } },
              user: { connect: { id: userId } },
              liked: true,
            },
          });
        } else {
          await ctx.prisma.projectLike.update({
            where: {
              id: projectLike.id,
            },
            data: {
              liked: !projectLike.liked,
            },
          });
        }

        return tx.project.findUnique({
          where: { id: projectId },
          include: {
            user: true,
            tags: {
              include: {
                tag: true,
              },
            },
            likes: true,
          },
        });
      });

      if (!project) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }

      return project;
    }),
});
