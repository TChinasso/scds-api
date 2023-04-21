-- CreateTable
CREATE TABLE "GhUser" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "login" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profile_picture" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "GhUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GhUser_userId_key" ON "GhUser"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "GhUser_login_key" ON "GhUser"("login");

-- CreateIndex
CREATE UNIQUE INDEX "GhUser_email_key" ON "GhUser"("email");

-- AddForeignKey
ALTER TABLE "GhUser" ADD CONSTRAINT "GhUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
