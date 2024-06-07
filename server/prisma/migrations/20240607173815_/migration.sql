-- CreateTable
CREATE TABLE "membro" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT,
    "nome" TEXT,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "tarefa" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "finalizada" BOOLEAN NOT NULL,
    "dataTermino" DATETIME,
    "prioridade" TEXT NOT NULL DEFAULT 'Baixa',
    "membroId" TEXT NOT NULL,
    CONSTRAINT "tarefa_membroId_fkey" FOREIGN KEY ("membroId") REFERENCES "membro" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "membro_email_key" ON "membro"("email");
