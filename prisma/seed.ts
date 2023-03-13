import { PrismaClient, ProjectStatus } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import pino from "pino";

// Initialization
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});
const logger = pino();

//#region Entity Types

async function createEntityTypes() {
  await prisma.entityType.createMany({
    data: [{ name: "project" }, { name: "comment" }],
  });
}

//#endregion

//#region Users

const jonSnowId = uuidv4();
const jonSnowSlug = "/jon-snow";

async function createUsers() {
  logger.info("Seeding users...");
  await prisma.user.upsert({
    where: { slug: jonSnowSlug },
    update: {},
    create: {
      id: jonSnowId,
      email: "jon.snow@imadedis.dev",
      name: "Jon Snow",
      slug: jonSnowSlug,
      emailVerified: new Date(),
      image: null,
    },
  });
  logger.info("Done seeding users.");
}

//#endregion

//#region Projects

const todoSlug = `${jonSnowSlug}/todo-app`;

async function createProjects() {
  logger.info("Seeding projects...");
  await prisma.project.upsert({
    where: { slug: todoSlug },
    update: {},
    create: {
      id: uuidv4(),
      name: "To-Do App",
      slug: todoSlug,
      version: "0.1.0",
      description:
        "A simple to-do app I made because I'm learning to code. This whole 'King in the North' thing is getting to be too much for me.",
      websiteUrl: null,
      repositoryUrl: null,
      downloadUrl: null,
      status: ProjectStatus.PUBLIC,
      createdAt: new Date(),
      createdBy: jonSnowId,
      modifiedAt: new Date(),
      modifiedBy: jonSnowId,
      user: { connect: { id: jonSnowId } },
    },
  });
  logger.info("Done seeding projects.");
}

//#endregion

//#region Tags

async function createTags() {
  const tag1Content = "Web Development";
  await prisma.tag.upsert({
    where: { content: tag1Content },
    update: {},
    create: {
      id: uuidv4(),
      content: tag1Content,
      projects: { create: { project: { connect: { slug: todoSlug } } } },
    },
  });

  const tag2Content = "React";
  await prisma.tag.upsert({
    where: { content: tag2Content },
    update: {},
    create: {
      id: uuidv4(),
      content: tag2Content,
      projects: { create: { project: { connect: { slug: todoSlug } } } },
    },
  });

  const tag3Content = "TypeScript";
  await prisma.tag.upsert({
    where: { content: tag3Content },
    update: {},
    create: {
      id: uuidv4(),
      content: tag3Content,
      projects: { create: { project: { connect: { slug: todoSlug } } } },
    },
  });
}

//#endregion

//#region Tech

const applicationAndData = "Application and Data";
const hosting = "Hosting";
const devOps = "DevOps";
const utils = "Utils";
const other = "Other";

async function createTechTypes() {
  await prisma.techType.createMany({
    data: [
      { name: applicationAndData },
      { name: hosting },
      { name: devOps },
      { name: utils },
      { name: other },
    ],
  });
}

async function createTech() {}

//#endregion

async function main() {
  logger.info("Beginning database seeding...");

  // Seed entity types
  //await createEntityTypes();

  // Seed users
  await createUsers();

  // Seed projects
  await createProjects();

  // Seed tags
  await createTags();

  // Seed Tech
  //await createTechTypes();

  logger.info("Done seeding database.");
}

main().then(async () => {
  await prisma.$disconnect();
});
