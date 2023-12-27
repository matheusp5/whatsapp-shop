/*
  Warnings:

  - Added the required column `userEmail` to the `tb_orders` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tb_orders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userNumber" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "total" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_tb_orders" ("createdAt", "id", "total", "userNumber") SELECT "createdAt", "id", "total", "userNumber" FROM "tb_orders";
DROP TABLE "tb_orders";
ALTER TABLE "new_tb_orders" RENAME TO "tb_orders";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
