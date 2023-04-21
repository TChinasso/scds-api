/*
  Warnings:

  - You are about to drop the `GhUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GhUser" DROP CONSTRAINT "GhUser_userId_fkey";

-- DropTable
DROP TABLE "GhUser";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gh_user" (
    "id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "login" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profile_picture" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "gh_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "gh_user_user_id_key" ON "gh_user"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "gh_user_login_key" ON "gh_user"("login");

-- CreateIndex
CREATE UNIQUE INDEX "gh_user_email_key" ON "gh_user"("email");

-- AddForeignKey
ALTER TABLE "gh_user" ADD CONSTRAINT "gh_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
