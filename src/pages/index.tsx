import { NextSeo } from "next-seo";
import { z } from "zod";
import DotGrid from "../components/svg/DotGrid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "../utils/trpc";
import { useState } from "react";

const earlyAccessSignUpSchema = z.object({
  email: z.string().email(),
});

type EarlyAccesSignUp = z.infer<typeof earlyAccessSignUpSchema>;

export default function Home() {
  const [signedUp, setSignedUp] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { register, handleSubmit } = useForm<EarlyAccesSignUp>({
    resolver: zodResolver(earlyAccessSignUpSchema),
  });
  const joinWaitListMutation = trpc.waitList.joinWaitList.useMutation({
    onSuccess() {
      setSignedUp(true);
    },
    onSettled() {
      setHasError(true);
    },
  });

  const onSubmit = async (data: EarlyAccesSignUp) => {
    await joinWaitListMutation.mutateAsync(data);
  };

  return (
    <>
      <NextSeo
        title="I Made Dis"
        description="Whether you're trying to learn some new tech or building a project for your resume, we make it easy for you to share your side projects with the world!"
      />
      <div className="relative h-full flex-1">
        <div className="z-50 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl pt-20 pb-32 text-center sm:pt-48 sm:pb-40">
            <h1 className="mx-auto max-w-4xl text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
              Show off your{" "}
              <span className="text-yellow-500">side projects</span> with ease.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
              Whether you&apos;re trying to learn some new tech or building a
              project for your resume, we make it easy for you to share your
              side projects with the world!
            </p>
            {signedUp ? (
              <p className="my-6 text-lg text-slate-700">
                <span className="text-xl font-semibold text-yellow-500">
                  Success 🎉
                </span>
                <br />
                We&apos;ll send you an email when iMadeDis is ready for you.
              </p>
            ) : (
              <form
                className="my-6 mx-auto grid max-w-lg grid-cols-2 gap-3"
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  className="rounded-md border py-2 px-1"
                  {...register("email")}
                  placeholder="Enter your email"
                />
                <button className="rounded-md bg-yellow-400 py-2">
                  Join waiting list
                </button>
                {hasError && (
                  <p className="col-span-2 text-center text-sm text-red-600">
                    Uh oh! It looks like something went wrong. Try again in a
                    little while.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
        <DotGrid
          width={15}
          height={10}
          radius={3}
          space={30}
          className="fixed top-24 right-4 -z-10 hidden overflow-hidden opacity-20 sm:block"
          fill="#334155"
        />
        <DotGrid
          width={15}
          height={10}
          radius={3}
          space={30}
          className="fixed bottom-24 left-4 -z-10 hidden overflow-hidden opacity-20 sm:block"
          fill="#334155"
        />
      </div>
    </>
  );
}
