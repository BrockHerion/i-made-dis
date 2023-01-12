import {
  ArrowDownCircleIcon,
  CodeBracketIcon,
  EyeIcon,
  HeartIcon,
  LinkIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Tab = {
  name: string;
  component: React.ReactNode;
};

const tabs: Array<Tab> = [
  {
    name: "Description",
    component: (
      <>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget
          volutpat nunc, at cursus sapien. Sed at pulvinar enim. Proin purus
          ante, porta quis erat non, rhoncus feugiat est. Sed vehicula arcu et
          massa eleifend, sit amet venenatis diam bibendum. Fusce bibendum purus
          ut magna pellentesque sodales. Nulla ullamcorper, turpis in laoreet
          sodales, ante sem blandit metus, sit amet sodales ex dui non mi.
          Quisque quam erat, ultrices et lacus id, lacinia finibus enim. Donec
          placerat a nisl iaculis posuere. Praesent non orci vehicula, sagittis
          magna a, cursus neque. In lacinia augue vel facilisis maximus. Duis
          mollis eleifend commodo. Vivamus placerat scelerisque augue, sed
          condimentum erat finibus vitae. Fusce a tellus sem. Suspendisse
          elementum odio quis erat pharetra, et tempor tellus rhoncus. Cras
          vitae nisl lectus.
        </p>
        <br />
        <p>
          Sed gravida arcu non malesuada laoreet. Sed lacus nibh, consequat at
          felis non, condimentum accumsan massa. Cras rutrum tempor consectetur.
          Cras vulputate arcu et lectus laoreet, et ultricies nisi posuere.
          Pellentesque metus lacus, sollicitudin in accumsan in, mattis in erat.
          Mauris nec posuere enim. Donec accumsan malesuada massa, nec molestie
          nisl interdum id. Nulla volutpat enim eget dui aliquam pellentesque.
          Ut rutrum sapien justo, quis interdum ante condimentum id. Suspendisse
          potenti. Sed lobortis dignissim lorem, eu porta ligula lobortis sed.
          Mauris diam mauris, finibus vel scelerisque aliquet, malesuada nec
          leo.
        </p>
      </>
    ),
  },
  { name: "Tech", component: <>Tech</> },
  { name: "Updates", component: <>Updates</> },
  {
    name: "Comments",
    component: (
      <div className="divide-y-gray-200 divide-y">
        <div className="pb-2">
          <div className="mb-1 flex items-center space-x-2 text-sm">
            <Link
              href="#"
              className="hover: text-gray-700 hover:text-yellow-500 hover:underline"
            >
              Brock Herion
            </Link>
            <p className="text-gray-500">10/01/2023</p>
          </div>

          <p className="text-gray-700">
            OMG this is such a cool project! Keep it up!
          </p>

          <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
            <button>Reply</button>
            <button>Like</button>
          </div>
        </div>
        <div className="py-2">
          <div className="mb-1 flex items-center space-x-2 text-sm">
            <Link
              href="#"
              className="hover: text-gray-700 hover:text-yellow-500 hover:underline"
            >
              Brock Herion
            </Link>
            <p className="text-gray-500">10/01/2023</p>
          </div>

          <p className="text-gray-700">
            Really nailed this one. Love the idea and the growth of the
            platform!
          </p>

          <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
            <button>Reply</button>
            <button>Like</button>
          </div>
        </div>
      </div>
    ),
  },
];

const Project: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<Tab | undefined>(tabs[0]);

  const onTabClick = (tab: Tab) => {
    setSelectedTab(tab);
  };

  return (
    <div>
      <header>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            I Made Dis
          </h1>
          <button className="text-red-500">
            <HeartIcon className="h-6 w-6" />
          </button>
        </div>
      </header>
      <main>
        <div className="grid grid-cols-9 gap-x-12 py-8">
          <div className="col-span-6">
            <div className="relative aspect-video w-full overflow-hidden rounded-md">
              <Image src="/placeholder.jpg" alt="" fill />
            </div>
            <div className="pt-4">
              <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex space-x-8">
                    {tabs.map((tab) => (
                      <div
                        key={tab.name}
                        className={clsx(
                          tab === selectedTab
                            ? "border-yellow-400 text-yellow-500"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                          "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium"
                        )}
                      >
                        <button onClick={() => onTabClick(tab)}>
                          {tab.name}
                        </button>
                      </div>
                    ))}
                  </nav>
                </div>
              </div>
              {/* Began page content */}
              <div className="pt-4 text-gray-700">{selectedTab?.component}</div>
            </div>
          </div>
          <div className="col-span-3">
            <div className="mb-6 divide-y divide-gray-200">
              <div className="pb-2">
                <h3 className="text-sm text-gray-500">Version</h3>
                <p className="text-gray-700">v0.0.1</p>
              </div>
              <div className="py-2">
                <h3 className="text-sm text-gray-500">Website</h3>
                <div className="flex items-center text-gray-700">
                  <LinkIcon className="mr-1 h-4 w-4" />
                  <Link href="https://imadedis.dev">https://imadedis.dev</Link>
                </div>
              </div>
              <div className="py-2">
                <h3 className="text-sm text-gray-500">Download</h3>
                <div className="flex items-center text-gray-700">
                  <ArrowDownCircleIcon className="mr-1 h-4 w-4" />
                  <Link href="https://imadedis.dev">https://imadedis.dev</Link>
                </div>
              </div>
              <div className="py-2">
                <h3 className="text-sm text-gray-500">Repository</h3>
                <div className="flex items-center text-gray-700">
                  <CodeBracketIcon className="mr-1 h-4 w-4" />
                  <Link href="https://imadedis.dev">https://imadedis.dev</Link>
                </div>
              </div>
              <div className="py-2">
                <h3 className="text-sm text-gray-500">Created By</h3>
                <p className="text-gray-700">Brock Herion</p>
              </div>
              <div className="py-2">
                <h3 className="text-sm text-gray-500">Last updated</h3>
                <p className="text-gray-700">10/01/2023</p>
              </div>
              <div className="grid grid-cols-2 py-2">
                <div>
                  <h3 className="text-sm text-gray-500">Views</h3>
                  <p className="flex items-center text-gray-700">
                    <EyeIcon className="mr-1 h-4 w-4" /> 420
                  </p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Likes</h3>
                  <p className="flex items-center text-gray-700">
                    <HeartIcon className="mr-1 h-4 w-4" /> 69
                  </p>
                </div>
              </div>
            </div>
            <button className="flex w-full items-center justify-center space-x-1 rounded-md bg-yellow-400 py-2">
              <span>Share</span>
              <ShareIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Project;
