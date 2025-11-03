"use server";

import { R } from "@praha/byethrow";
import { redirect } from "next/navigation";
import type * as z from "zod";
import { auth } from "@/lib/auth";
import {
  type FormState,
  fail,
  parseAndThen,
} from "@/lib/react-server-actions-form";
import { formSchema } from "./_lib/utils";

type Args = { name: string; email: string; password: string };

const signUpEmail = R.try({
  try: ({ name, email, password }: Args) =>
    auth.api.signUpEmail({ body: { name, email, password } }),
  catch: (error) => error as Error,
});

export async function createUser(
  _: unknown,
  formData: FormData,
): Promise<FormState<typeof formSchema>> {
  const data: z.infer<typeof formSchema> = {
    name: formData.get("name")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };

  return parseAndThen(formSchema, data, async (parsed) => {
    const result = await signUpEmail(parsed.values);
    if (R.isFailure(result)) {
      return fail(parsed, {
        customError: result.error.message,
        fields: {
          ...parsed.fields,
          email: {
            invalid: true,
            errors: [result.error.message, result.error.message],
          },
        },
      });
    }
    redirect("/");
  });
}
