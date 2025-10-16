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
  const [formState, formAction, pending] = useForm({
    action: createUser,
    defaultValues,
  });
  useEffect(() => {
    if (formState.state === "other-error") {
      alert(formState.errors);
    }
  }, [formState]);
  return (
    <Form action={formAction} className="w-full max-w-md mx-auto">
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
                formState.state === "field-error" && !!formState.errors.name
              }
            >
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Enter your name"
                defaultValue={formState.values.name}
                aria-invalid={
                  formState.state === "field-error" && !!formState.errors.name
                }
              />
              {formState.state === "field-error" && formState.errors.name && (
                <FieldError>{formState.errors.name[0]}</FieldError>
              )}
            </Field>
            <Field
              className="gap-2"
              data-invalid={
                formState.state === "field-error" && !!formState.errors.email
              }
            >
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                defaultValue={formState.values.email}
                aria-invalid={
                  formState.state === "field-error" && !!formState.errors.email
                }
              />
              {formState.state === "field-error" && formState.errors.email && (
                <FieldError>{formState.errors.email[0]}</FieldError>
              )}
            </Field>
            <Field
              className="gap-2"
              data-invalid={
                formState.state === "field-error" && !!formState.errors.password
              }
            >
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Enter your password"
                defaultValue={formState.values.password}
                aria-invalid={
                  formState.state === "field-error" &&
                  !!formState.errors.password
                }
              />
              {formState.state === "field-error" &&
                formState.errors.password && (
                  <FieldError>{formState.errors.password[0]}</FieldError>
                )}
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit" disabled={pending}>
            {pending ? "Signing up..." : "Sign up"}
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
}
