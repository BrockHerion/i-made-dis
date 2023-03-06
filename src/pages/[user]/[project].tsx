import {
  ArrowDownCircleIcon,
  CodeBracketIcon,
  EyeIcon,
  HeartIcon,
  LinkIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import format from "date-fns/format";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ProjectDescription from "../../components/ProjectDescription";
import { trpc } from "../../utils/trpc";

type ProjectTabs = "Description" | "Tech" | "Updates" | "Comments";

type TabProps =
  | { content?: string; projectId?: never }
  | { content?: never; projectId?: string };

type Tab<Props> = {
  name: ProjectTabs;
  component: React.FC<Props> | null;
};

const tabs: Array<Tab<TabProps>> = [
  {
    name: "Description",
    component: ProjectDescription,
  },
  { name: "Tech", component: null },
  { name: "Updates", component: null },
  {
    name: "Comments",
    component: null,
    // (
    //   <div className="divide-y-gray-200 divide-y">
    //     <div className="pb-2">
    //       <div className="mb-1 flex items-center space-x-2 text-sm">
    //         <Link
    //           href="#"
    //           className="hover: text-gray-700 hover:text-yellow-500 hover:underline"
    //         >
    //           Brock Herion
    //         </Link>
    //         <p className="text-gray-500">10/01/2023</p>
    //       </div>

    //       <p className="text-gray-700">
    //         OMG this is such a cool project! Keep it up!
    //       </p>

    //       <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
    //         <button>Reply</button>
    //         <button>Like</button>
    //       </div>
    //     </div>
    //     <div className="py-2">
    //       <div className="mb-1 flex items-center space-x-2 text-sm">
    //         <Link
    //           href="#"
    //           className="hover: text-gray-700 hover:text-yellow-500 hover:underline"
    //         >
    //           Brock Herion
    //         </Link>
    //         <p className="text-gray-500">10/01/2023</p>
    //       </div>

    //       <p className="text-gray-700">
    //         Really nailed this one. Love the idea and the growth of the
    //         platform!
    //       </p>

    //       <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
    //         <button>Reply</button>
    //         <button>Like</button>
    //       </div>
    //     </div>
    //   </div>
    // ),
  },
];

const ProjectDetail: React.FC<{
  name: string;
  value: string;
  url?: string;
  icon?: React.ReactNode;
}> = ({ name, value, url, icon }) => (
  <div className="py-1.5">
    <h3 className="text-sm text-gray-500">{name}</h3>
    <div className="flex items-center text-gray-700">
      {icon ? icon : null}
      {url ? (
        <Link className="hover:underline" href={url}>
          {value}
        </Link>
      ) : (
        <p>{value}</p>
      )}
    </div>
  </div>
);

export default function Project() {
  const router = useRouter();
  const userUrl = router.query.user as string;
  const projectUrl = router.query.project as string;

  const [selectedTab, setSelectedTab] = useState<Tab<TabProps> | undefined>(
    tabs[0]
  );
  const { data: project } = trpc.projects.getProjectByUser.useQuery(
    {
      user: userUrl,
      project: projectUrl,
    },
    { enabled: router.isReady }
  );

  const onTabClick = (tab: Tab<TabProps>) => {
    setSelectedTab(tab);
  };

  if (!project) {
    return <>Loading...</>;
  }

  let tabComponent: React.ReactNode = null;
  if (selectedTab?.component) {
    const Component = selectedTab.component;

    if (selectedTab.name === "Description") {
      tabComponent = <Component content={project.description || undefined} />;
    } else {
      tabComponent = <Component projectId={project.id} />;
    }
  }

  return (
    <div>
      <header>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            {project.name}
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
              <div className="pt-4 text-gray-700">{tabComponent}</div>
            </div>
          </div>
          <div className="col-span-3">
            <div className="mb-6 flex flex-col divide-y divide-gray-200">
              {project.version ? (
                <ProjectDetail name="Version" value={project.version} />
              ) : null}
              {project.websiteUrl ? (
                <ProjectDetail
                  name="Website"
                  value={project.websiteUrl}
                  url={project.websiteUrl}
                  icon={<LinkIcon className="mr-1 h-4 w-4" />}
                />
              ) : null}
              {project.downloadUrl ? (
                <ProjectDetail
                  name="Download"
                  value={project.downloadUrl}
                  url={project.downloadUrl}
                  icon={<ArrowDownCircleIcon className="mr-1 h-4 w-4" />}
                />
              ) : null}
              {project.repositoryUrl ? (
                <ProjectDetail
                  name="Repository"
                  value={project.repositoryUrl}
                  url={project.repositoryUrl}
                  icon={<CodeBracketIcon className="mr-1 h-4 w-4" />}
                />
              ) : null}
              <ProjectDetail
                name="Created by"
                value={project.owner.name ?? ""}
                url={project.owner.url ?? ""}
              />
              <ProjectDetail
                name="Last updated"
                value={format(project.modifiedAt, "MMMM dd, yyyy")}
              />

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
}
