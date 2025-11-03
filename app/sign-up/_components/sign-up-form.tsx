"use client";

import Form from "next/form";
import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@/lib/react-server-actions-form";
import { defaultValues } from "../_lib/utils";
import { createUser as action } from "../actions";

export function SignUpForm() {
  const { state, formAction, isPending } = useForm({
    useActionState,
    action,
    defaultValues,
  });
  useEffect(() => {
    if (state.customError !== undefined) {
      alert(state.customError);
    }
  }, [state.customError]);
  return (
    <Form action={formAction} className="mx-auto w-full max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>
            Enter your name, email, and password to create your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup className="gap-6">
            <Field className="gap-2" data-invalid={state.fields.name.invalid}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Enter your name"
                defaultValue={state.values.name}
                aria-invalid={state.fields.name.invalid}
              />
              {state.fields.name.invalid && (
                <FieldError errors={state.fields.name.errors} />
              )}
            </Field>
            <Field className="gap-2" data-invalid={state.fields.email.invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                defaultValue={state.values.email}
                aria-invalid={state.fields.email.invalid}
              />
              {state.fields.email.invalid && (
                <FieldError errors={state.fields.email.errors} />
              )}
            </Field>
            <Field
              className="gap-2"
              data-invalid={state.fields.password.invalid}
            >
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Enter your password"
                defaultValue={state.values.password}
                aria-invalid={state.fields.password.invalid}
              />
              {state.fields.password.invalid && (
                <FieldError errors={state.fields.password.errors} />
              )}
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending ? "Signing up..." : "Sign up"}
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
}
