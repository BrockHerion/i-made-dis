import { z } from "zod";
import { publicProcedure } from "./../trpc";
import { router } from "../trpc";
import { TRPCError } from "@trpc/server";

export const viewsRouter = router({
  getViews: publicProcedure
    .input(
      z.object({
        slug: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!input.slug) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Slug is required",
        });
      }

      const view = ctx.prisma.view.findUnique({
        where: {
          slug: input.slug,
        },
      });

      return view;
    }),
  updateViews: publicProcedure
    .input(
      z.object({
        slug: z.string().nullish(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { slug } = input;

      if (!slug) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Slug is required",
        });
      }

      return ctx.prisma.view.upsert({
        where: { slug },
        update: { count: { increment: 1 } },
        create: {
          slug,
          count: 1,
        },
      });
    }),
});
