import type { StandardSchemaV1 } from "@standard-schema/spec";
import { useActionState } from "react";

export type FormState<T extends StandardSchemaV1, U = string> =
  | { state: "init" | "success"; values: StandardSchemaV1.InferOutput<T> }
  | {
      state: "field-error";
      values: StandardSchemaV1.InferOutput<T>;
      errors: Partial<Record<keyof StandardSchemaV1.InferOutput<T>, string[]>>;
    }
  | {
      state: "other-error";
      values: StandardSchemaV1.InferOutput<T>;
      errors: U;
    };

export const useForm = <T extends StandardSchemaV1, U = string>({
  action,
  defaultValues,
}: {
  action: (
    prevState: FormState<T, U>,
    formData: FormData,
  ) => Promise<FormState<T, U>>;
  defaultValues: StandardSchemaV1.InferOutput<T>;
}) => useActionState(action, { state: "init", values: defaultValues });
