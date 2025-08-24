import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

let prisma;

// Initialize Prisma Client based on environment
(async () => {
  if (process.env.NODE_ENV === "production") {
    prisma =  prismaClientSingleton();
  } else {
    // Handle development environment (consider caching or reuse)
    if (!globalThis.prisma) {
      globalThis.prisma =  prismaClientSingleton();
    }
    prisma = globalThis.prisma;
  }
})();

export default prisma;
