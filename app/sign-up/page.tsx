import { R } from "@praha/byethrow";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { SignUpForm } from "./_components/sign-up-form";

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

export default function SignUpPage() {
  async function signUp(_: unknown, formData: FormData) {
    "use server";
    const [name, email, password] = [
      formData.get("name")?.toString() || "",
      formData.get("email")?.toString() || "",
      formData.get("password")?.toString() || "",
    ];

    const result = await signUpEmail({ name, email, password });
    if (R.isFailure(result)) {
      return {
        message: result.error.message,
        formData,
      };
    }
    redirect("/");
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <SignUpForm action={signUp} />
    </div>
  );
}
