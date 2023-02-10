import * as SibApiV3Sdk from "@sendinblue/client";
import { env } from "../env/server.mjs";

export interface EmailParams {
  toEmail: string;
  name?: string;
  templateId: number;
  params?: {
    [k: string]: string;
  };
  headers?: {
    [k: string]: string;
  };
}

export async function sendTransactionalEmail(params: EmailParams) {
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  apiInstance.setApiKey(
    SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
    env.SIB_API_KEY
  );

  let smtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  smtpEmail = {
    to: [
      {
        email: params.toEmail,
        name: params.name,
      },
    ],
    templateId: params.templateId,
    params: params.params,
    headers: params.headers,
  };

  try {
    await apiInstance.sendTransacEmail(smtpEmail);
  } catch (e) {
    console.error(`An error occured while sending email: ${e}`);
  }
}

export interface GetContactParams {
  email: string;
}

export async function getContact(params: GetContactParams) {
  const apiInstance = new SibApiV3Sdk.ContactsApi();
  apiInstance.setApiKey(SibApiV3Sdk.ContactsApiApiKeys.apiKey, env.SIB_API_KEY);

  try {
    const response = await apiInstance.getContactInfo(params.email);
    return response;
  } catch (e) {
    return null;
  }
}

export interface CreateContactParams {
  email: string;
  listIds: number[];
  updateContact: boolean;
}

export async function createContact(params: CreateContactParams) {
  const apiInstance = new SibApiV3Sdk.ContactsApi();
  apiInstance.setApiKey(SibApiV3Sdk.ContactsApiApiKeys.apiKey, env.SIB_API_KEY);

  // Create a new contact
  const contact = new SibApiV3Sdk.CreateContact();
  contact.email = params.email;
  contact.listIds = params.listIds;

  await apiInstance.createContact(contact);
}
