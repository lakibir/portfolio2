import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(80),
  email: z.email("Enter a valid email address."),
  message: z.string().min(20, "Message must be at least 20 characters.").max(2000),
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
