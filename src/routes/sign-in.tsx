import { SignIn } from "@clerk/clerk-react"

export default function SignInPage() {
  return <div className="flex items-center justify-center w-full mt-14">
    <SignIn path="/sign-in"  signUpUrl="/sign-up"/>
  </div>;
}