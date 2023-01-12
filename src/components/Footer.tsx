import { HeartIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const Footer: React.FC = () => (
  <footer className="bg-slate-800 text-white">
    <nav className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="py-6">
        <div className="space-y-2 text-center text-gray-200">
          <p className="flex items-center justify-center ">
            Built with <HeartIcon className="mx-1 h-4 w-4" /> by Brock Herion
          </p>
          <small>&copy; Copyright I Made Dis 2023. All rights reserved.</small>
        </div>
      </div>
    </nav>
  </footer>
);

export default Footer;
