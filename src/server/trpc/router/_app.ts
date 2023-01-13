import { projectRouter } from "./project";
import { router } from "../trpc";
import { authRouter } from "./auth";

export const appRouter = router({
  auth: authRouter,
  projects: projectRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
