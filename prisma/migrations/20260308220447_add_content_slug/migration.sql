/*
  Warnings:

  - You are about to drop the column `lessonSlug` on the `Question` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Question" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" TEXT NOT NULL,
    "contentSlug" TEXT,
    "contentType" TEXT,
    "questionText" TEXT NOT NULL,
    "answerText" TEXT,
    "links" TEXT,
    "status" TEXT NOT NULL DEFAULT 'new',
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Question_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Question" ("answerText", "createdAt", "id", "links", "published", "questionText", "status", "studentId", "updatedAt") SELECT "answerText", "createdAt", "id", "links", "published", "questionText", "status", "studentId", "updatedAt" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
