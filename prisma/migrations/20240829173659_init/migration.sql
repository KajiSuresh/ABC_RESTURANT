-- CreateTable
CREATE TABLE "DiningTable" (
    "id" TEXT NOT NULL,
    "diningName" TEXT NOT NULL,
    "diningImage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DiningTable_pkey" PRIMARY KEY ("id")
);
