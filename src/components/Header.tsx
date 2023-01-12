import { useSession } from "next-auth/react";
import Link from "next/link";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import Dropdown from "./Dropdown";

const dropdownLinks = [
  {
    text: "My profile",
    href: "/my-profile",
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
          <div>
            <Link href="/">
              <span>I Made Dis</span>
            </Link>
          </div>
          <div>
            {sessionData ? (
              <Dropdown
                button={
                  <div className="flex items-center rounded-md py-1 pl-3 text-lg font-semibold hover:bg-slate-900">
                    <span>{sessionData.user?.name}</span>
                    <EllipsisVerticalIcon className="h-6 w-6" />
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
            ) : (
              <>
                <Link href="/auth/signin">Sign in</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
