/*
  Warnings:

  - Made the column `email` on table `membro` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nome` on table `membro` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dataTermino` on table `tarefa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `descricao` on table `tarefa` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_membro" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_membro" ("email", "id", "nome", "password") SELECT "email", "id", "nome", "password" FROM "membro";
DROP TABLE "membro";
ALTER TABLE "new_membro" RENAME TO "membro";
CREATE UNIQUE INDEX "membro_email_key" ON "membro"("email");
CREATE TABLE "new_tarefa" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "finalizada" BOOLEAN NOT NULL DEFAULT false,
    "dataTermino" DATETIME NOT NULL,
    "prioridade" TEXT NOT NULL DEFAULT 'Baixa',
    "membroId" TEXT NOT NULL,
    CONSTRAINT "tarefa_membroId_fkey" FOREIGN KEY ("membroId") REFERENCES "membro" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tarefa" ("dataTermino", "descricao", "finalizada", "id", "membroId", "nome", "prioridade") SELECT "dataTermino", "descricao", "finalizada", "id", "membroId", "nome", "prioridade" FROM "tarefa";
DROP TABLE "tarefa";
ALTER TABLE "new_tarefa" RENAME TO "tarefa";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
