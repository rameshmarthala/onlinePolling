/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Poll` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Response" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pollId" INTEGER NOT NULL,
    "optionId" INTEGER NOT NULL,
    CONSTRAINT "Response_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Response_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Poll" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question" TEXT NOT NULL
);
INSERT INTO "new_Poll" ("id", "question") SELECT "id", "question" FROM "Poll";
DROP TABLE "Poll";
ALTER TABLE "new_Poll" RENAME TO "Poll";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
