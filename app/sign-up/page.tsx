import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { SignUpForm } from "./_components/sign-up-form";

export default function SignUpPage() {
  async function signUp(formData: FormData) {
    "use server";
    const [name, email, password] = [
      formData.get("name")?.toString(),
      formData.get("email")?.toString(),
      formData.get("password")?.toString(),
    ];
    if (!name || !email || !password) return;
    await auth.api.signUpEmail({
      body: { name, email, password },
    });
    redirect("/");
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <SignUpForm action={signUp} />
    </div>
  );
}
