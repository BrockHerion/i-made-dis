import { publicProcedure } from "./../trpc";
import { router } from "../trpc";
import { z } from "zod";
import * as SibApiV3Sdk from "@sendinblue/client";
import { env } from "../../../env/server.mjs";
import { sendTransactionalEmail } from "../../common/email";

const apiInstance = new SibApiV3Sdk.ContactsApi();

apiInstance.setApiKey(SibApiV3Sdk.ContactsApiApiKeys.apiKey, env.SIB_API_KEY);

export const waitListRouter = router({
  joinWaitList: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .mutation(async ({ input }) => {
      const { email } = input;

      // Create a new contact
      const contact = new SibApiV3Sdk.CreateContact();
      contact.email = email;
      contact.listIds = [5];

      console.log("creating contact");
      await apiInstance.createContact(contact);

      // Send a welcome email
      console.log("trying to send email");
      await sendTransactionalEmail({ toEmail: email, templateId: 8 });
    }),
});
