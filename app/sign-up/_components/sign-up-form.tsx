"use client";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
      alert(formState.error);
    }
  }, [formState]);
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>
          Enter your name, email, and password to create your account.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-4 pb-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Enter your name"
              defaultValue={formState.values.name}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              defaultValue={formState.values.email}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Enter your password"
              defaultValue={formState.values.password}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit" disabled={pending}>
            {pending ? "Signing up..." : "Sign up"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
