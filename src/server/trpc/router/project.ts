import { TRPCError } from "@trpc/server";
import { publicProcedure } from "./../trpc";
import { router } from "../trpc";
import { z } from "zod";

export const projectRouter = router({
  getProjectByUser: publicProcedure
    .input(
      z.object({
        user: z.string().nullish(),
        project: z.string().nullish(),
      })
    )
    .query(({ ctx, input }) => {
      const { user, project } = input;

      if (!user || !project) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Fields user and project are required",
        });
      }

      const slug = `${user}/${project}`;

      return ctx.prisma.project.findUniqueOrThrow({
        where: {
          slug,
        },
        include: {
          owner: true,
        },
      });
    }),
});
