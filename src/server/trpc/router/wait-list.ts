import { publicProcedure } from "./../trpc";
import { router } from "../trpc";
import { z } from "zod";
import { createContact, sendTransactionalEmail } from "../../../utils/sib";

export const waitListRouter = router({
  joinWaitList: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .mutation(async ({ input }) => {
      const { email } = input;

      // Create a new contact and send a transactional email
      await Promise.all([
        createContact({ email, listIds: [5] }),
        sendTransactionalEmail({ toEmail: email, templateId: 8 }),
      ]);
    }),
});
