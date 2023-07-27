-- AlterTable
ALTER TABLE "user" ADD COLUMN     "refreshToken" TEXT NOT NULL DEFAULT 'empty';

-- CreateTable
CREATE TABLE "users_password_recovery" (
    "id" TEXT NOT NULL,
    "is_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "recovery_code" TEXT NOT NULL,
    "expr_date" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "users_password_recovery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile_page" (
    "id" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "birthdayDate" TIMESTAMP(3) NOT NULL,
    "city" TEXT NOT NULL,
    "aboutMe" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "profile_page_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_password_recovery_recovery_code_key" ON "users_password_recovery"("recovery_code");

-- CreateIndex
CREATE UNIQUE INDEX "users_password_recovery_user_id_key" ON "users_password_recovery"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "profile_page_photo_key" ON "profile_page"("photo");

-- CreateIndex
CREATE UNIQUE INDEX "profile_page_firstName_key" ON "profile_page"("firstName");

-- CreateIndex
CREATE UNIQUE INDEX "profile_page_lastName_key" ON "profile_page"("lastName");

-- CreateIndex
CREATE UNIQUE INDEX "profile_page_birthdayDate_key" ON "profile_page"("birthdayDate");

-- CreateIndex
CREATE UNIQUE INDEX "profile_page_city_key" ON "profile_page"("city");

-- CreateIndex
CREATE UNIQUE INDEX "profile_page_aboutMe_key" ON "profile_page"("aboutMe");

-- CreateIndex
CREATE UNIQUE INDEX "profile_page_user_id_key" ON "profile_page"("user_id");

-- AddForeignKey
ALTER TABLE "users_password_recovery" ADD CONSTRAINT "users_password_recovery_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_page" ADD CONSTRAINT "profile_page_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
