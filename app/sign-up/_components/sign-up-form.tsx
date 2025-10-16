"use client";

import Form from "next/form";
import { useEffect } from "react";
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
import { createUser } from "../actions";

export function SignUpForm() {
  const { state, dispatch, isPending } = useForm({
    action: createUser,
    defaultValues,
  });
  useEffect(() => {
    if (state.state === "other-error") {
      alert(state.errors);
    }
  }, [state]);
  return (
    <Form action={dispatch} className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>
            Enter your name, email, and password to create your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup className="gap-6">
            <Field
              className="gap-2"
              data-invalid={
                state.state === "field-error" && !!state.errors.name
              }
            >
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Enter your name"
                defaultValue={state.values.name}
                aria-invalid={
                  state.state === "field-error" && !!state.errors.name
                }
              />
              {state.state === "field-error" && state.errors.name && (
                <FieldError>{state.errors.name[0]}</FieldError>
              )}
            </Field>
            <Field
              className="gap-2"
              data-invalid={
                state.state === "field-error" && !!state.errors.email
              }
            >
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                defaultValue={state.values.email}
                aria-invalid={
                  state.state === "field-error" && !!state.errors.email
                }
              />
              {state.state === "field-error" && state.errors.email && (
                <FieldError>{state.errors.email[0]}</FieldError>
              )}
            </Field>
            <Field
              className="gap-2"
              data-invalid={
                state.state === "field-error" && !!state.errors.password
              }
            >
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Enter your password"
                defaultValue={state.values.password}
                aria-invalid={
                  state.state === "field-error" && !!state.errors.password
                }
              />
              {state.state === "field-error" && state.errors.password && (
                <FieldError>{state.errors.password[0]}</FieldError>
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
