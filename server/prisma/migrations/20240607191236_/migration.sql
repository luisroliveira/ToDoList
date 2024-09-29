-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tarefa" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "finalizada" BOOLEAN NOT NULL DEFAULT false,
    "dataTermino" DATETIME,
    "prioridade" TEXT NOT NULL DEFAULT 'Baixa',
    "membroId" TEXT NOT NULL,
    CONSTRAINT "tarefa_membroId_fkey" FOREIGN KEY ("membroId") REFERENCES "membro" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tarefa" ("dataTermino", "descricao", "finalizada", "id", "membroId", "nome", "prioridade") SELECT "dataTermino", "descricao", "finalizada", "id", "membroId", "nome", "prioridade" FROM "tarefa";
DROP TABLE "tarefa";
ALTER TABLE "new_tarefa" RENAME TO "tarefa";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
