import { PrismaClient, ProjectStatus } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import pino from "pino";

// Initialization
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});
const logger = pino();

//#region Users

const jonSnowId = uuidv4();
const jonSnowUrl = "/jon-snow";

async function createUsers() {
  logger.info("Seeding users...");
  await prisma.user.upsert({
    where: { url: jonSnowUrl },
    update: {},
    create: {
      id: jonSnowId,
      email: "jon.snow@imadedis.dev",
      name: "Jon Snow",
      url: jonSnowUrl,
      emailVerified: new Date(),
      image: null,
    },
  });
  logger.info("Done seeding users.");
}

//#endregion

//#region Projects

const todoAppId = uuidv4();
const todoUrl = `${jonSnowUrl}/todo-app`;

async function createProjects() {
  logger.info("Seeding projects...");
  await prisma.project.upsert({
    where: { url: todoUrl },
    update: {},
    create: {
      id: todoAppId,
      name: "To-Do App",
      url: todoUrl,
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
      ownerId: jonSnowId,
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
      projects: { create: { project: { connect: { id: todoAppId } } } },
    },
  });
}

//#endregion

async function main() {
  logger.info("Beginning database seeding...");

  // Seed users
  await createUsers();

  // Seed projects
  await createProjects();

  logger.info("Done seeding database.");
}

main().then(async () => {
  await prisma.$disconnect();
});
