import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <>
      <button onClick={() => signIn("github", { callbackUrl: "/" })}>
        Sign in with Github
      </button>
    </>
  );
}
