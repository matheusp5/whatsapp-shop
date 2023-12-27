import { Prisma, PrismaClient } from "@prisma/client";

let prisma: PrismaClient
export default function DatabaseProvider() {
  if(!prisma) prisma = new PrismaClient();
  return prisma;
}