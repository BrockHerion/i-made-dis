import { publicProcedure } from "./../trpc";
import { router } from "../trpc";
import { z } from "zod";
import {
  createContact,
  getContact,
  sendTransactionalEmail,
} from "../../../utils/sib";

export const waitListRouter = router({
  joinWaitList: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .mutation(async ({ input }) => {
      const { email } = input;

      // Check if the user is already signed up
      const contact = await getContact({ email });
      if (contact && contact.body.listIds.includes(5)) {
        return;
      }

      // If we dont have a contact, create a new one and send welcome email
      if (!contact) {
        // Create a new contact and send a transactional email
        await Promise.all([
          createContact({ email, listIds: [5], updateContact: false }),
          sendTransactionalEmail({ toEmail: email, templateId: 8 }),
        ]);
        return;
      }

      // We have a contact, but they're not on this list
      await Promise.all([
        createContact({ email, listIds: [5], updateContact: true }),
        sendTransactionalEmail({ toEmail: email, templateId: 8 }),
      ]);
    }),
});
