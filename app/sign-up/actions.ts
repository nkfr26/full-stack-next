"use server";

import { R } from "@praha/byethrow";
import { redirect } from "next/navigation";
import * as z from "zod";
import { auth } from "@/lib/auth";
import type { FormState } from "@/lib/react-server-actions-form";
import { formSchema } from "./_lib/utils";

type Args = {
  name: string;
  email: string;
  password: string;
};

const signUpEmail = R.try({
  try: ({ name, email, password }: Args) =>
    auth.api.signUpEmail({
      body: { name, email, password },
    }),
  catch: (error) => error as Error,
});

export const createUser = async (
  _prevState: FormState<typeof formSchema>,
  formData: FormData,
) => {
  const values: z.infer<typeof formSchema> = {
    name: formData.get("name")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };

  const parsed = formSchema.safeParse(values);
  if (!parsed.success) {
    return {
      state: "field-error" as const,
      values,
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  const result = await signUpEmail(parsed.data);
  if (R.isFailure(result)) {
    return {
      state: "other-error" as const,
      values,
      errors: result.error.message,
    };
  }

  redirect("/");
};
