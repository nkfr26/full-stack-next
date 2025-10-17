"use server";

import { R } from "@praha/byethrow";
import { redirect } from "next/navigation";
import type * as z from "zod";
import { auth } from "@/lib/auth";
import { type FormState, safeParse } from "@/lib/react-server-actions-form";
import { formSchema } from "./_lib/utils";

type Args = { name: string; email: string; password: string };

const signUpEmail = R.try({
  try: ({ name, email, password }: Args) =>
    auth.api.signUpEmail({ body: { name, email, password } }),
  catch: (error) => error as Error,
});

export async function createUser(
  _prevState: FormState<typeof formSchema>,
  formData: FormData,
): Promise<FormState<typeof formSchema>> {
  const values: z.infer<typeof formSchema> = {
    name: formData.get("name")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };

  const parsed = safeParse(formSchema, values);
  if (!parsed.success) {
    return parsed;
  }

  const result = await signUpEmail(parsed.values);
  if (R.isFailure(result)) {
    return {
      ...parsed,
      success: false,
      customError: { message: result.error.message },
    };
  }

  return redirect("/");
  // return { ...parsed, values: defaultValues };
}
