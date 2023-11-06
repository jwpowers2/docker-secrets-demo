-- CreateTable
CREATE TABLE "Rock" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "texture" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "Rock_pkey" PRIMARY KEY ("id")
);
