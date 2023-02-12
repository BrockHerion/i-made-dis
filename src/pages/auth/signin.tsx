import { signIn } from "next-auth/react";
import Image from "next/image";

export default function SignIn() {
  return (
    <>
      <button
        className="flex space-x-2 rounded-md border py-1 px-2"
        onClick={() => signIn("github", { callbackUrl: "/" })}
      >
        <span>Sign in with Github</span>
        <Image src="/github-mark.png" width={24} height={20} alt="" />
      </button>
    </>
  );
}
