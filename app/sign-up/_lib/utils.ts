import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(8).max(128),
});

export const defaultValues = { name: "", email: "", password: "" };
