import { SignUp } from "@clerk/clerk-react"

export default function SignUpPage() {
  return <div className="flex items-center justify-center w-full mt-14">
    <SignUp path="/sign-up" signInUrl="/sign-in"/>;
  </div>
}