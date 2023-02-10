import { HeartIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const Footer: React.FC = () => (
  <footer className="bg-gray-100 text-gray-900">
    <nav className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="py-6">
        <div className="space-y-2 text-center">
          <p className="flex items-center justify-center ">
            Built with <HeartIcon className="mx-1 h-4 w-4" /> by Brock Herion
          </p>
        </div>
      </div>
    </nav>
  </footer>
);

export default Footer;
