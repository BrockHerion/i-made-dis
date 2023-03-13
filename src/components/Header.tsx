import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import Dropdown from "./Dropdown";
import Image from "next/image";

const dropdownLinks = [
  {
    text: "My profile",
    href: "/my-profile",
  },
  {
    text: "Notifications",
    href: "/my-profile/notifications",
  },
  {
    text: "Settings",
    href: "/settings",
  },
  {
    text: "Logout",
    href: "/logout",
  },
];

const HeaderDropdownLink: React.FC<{ text: string; href: string }> = ({
  text,
  href,
}) => (
  <Link className="w-full" href={href}>
    {text}
  </Link>
);

const Header: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <header className="bg-slate-800 text-white">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none">
          <div className="flex items-center">
            <Link href="/" className="mr-4 text-lg font-semibold">
              <div className="flex items-center">
                <Image
                  src="/logo-2.png"
                  width={35}
                  height={35}
                  alt=""
                  className="mr-1"
                />
                <span>iMadeDis</span>
              </div>
            </Link>
            <div className="mr-3 flex items-center space-x-3">
              <Link
                href="/explore"
                className="hover:text-gray-200 hover:underline"
              >
                Explore
              </Link>
              <Link
                href="/about"
                className="hover:text-gray-200 hover:underline"
              >
                About
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {sessionData ? (
              <>
                <button>
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </button>
                <Dropdown
                  button={
                    <div className="ml-1 flex items-center rounded-md py-1 px-2 text-lg hover:bg-slate-900">
                      <span>{sessionData.user?.name}</span>
                    </div>
                  }
                  items={dropdownLinks.map((link) => (
                    <HeaderDropdownLink
                      key={link.text}
                      text={link.text}
                      href={link.href}
                    />
                  ))}
                />
              </>
            ) : (
              <>
                <Link
                  className="ml-1 py-1 px-2 hover:text-gray-200 hover:underline"
                  href="/auth/signin"
                >
                  Sign in
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
