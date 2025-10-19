import type React from "react";
import * as z from "zod";

type FieldError = { message: string };

type Fields<T extends z.ZodObject> = {
  [K in keyof z.infer<T>]:
    | { invalid: false }
    | { invalid: true; errors: FieldError[] };
};

export type FormState<T extends z.ZodObject, U = FieldError> = {
  success: boolean;
  values: z.infer<T>;
  fields: Fields<T>;
  customError?: U;
};

const createDefaultFields = <T extends z.ZodObject>(
  keys: (keyof z.infer<T>)[],
): Fields<T> =>
  keys.reduce(
    (acc, key) => {
      acc[key] = { invalid: false };
      return acc;
    },
    {} as Fields<T>,
  );

export const useForm = <T extends z.ZodObject, U>({
  useActionState,
  action,
  defaultValues,
  permalink,
}: {
  useActionState: typeof React.useActionState;
  action: (
    prevState: FormState<T, U>,
    formData: FormData,
  ) => Promise<FormState<T, U>>;
  defaultValues: z.infer<T>;
  permalink?: string;
}) => {
  const keys = Object.keys(defaultValues) as (keyof typeof defaultValues)[];
  const [state, formAction, isPending] = useActionState(
    action,
    {
      success: false,
      values: defaultValues,
      fields: createDefaultFields<T>(keys),
    },
    permalink,
  );
  return { state, formAction, isPending };
};

export const safeParse = <T extends z.ZodObject>(
  schema: T,
  data: z.infer<T>,
): FormState<T, never> => {
  const result = schema.safeParse(data);
  const keys = Object.keys(data) as (keyof typeof data)[];

  if (!result.success) {
    const fieldErrors = z.flattenError(result.error).fieldErrors;
    const fields = keys.reduce(
      (acc, key) => {
        const fieldError = fieldErrors[key];
        acc[key] = fieldError?.length
          ? {
              invalid: true,
              errors: fieldError.map((message) => ({ message })),
            }
          : { invalid: false };
        return acc;
      },
      {} as Fields<T>,
    );
    return { success: false, values: data, fields };
  }
  return {
    success: true,
    values: result.data,
    fields: createDefaultFields<T>(keys),
  };
};
