import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <>
      <button onClick={() => signIn("github", { callbackUrl: "/" })}>
        Sign in with Github
      </button>
    </>
  );
}
