/*
  Warnings:

  - Added the required column `role` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `StaffType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "role" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StaffType" ADD COLUMN     "role" TEXT NOT NULL;
