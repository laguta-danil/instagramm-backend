/*
  Warnings:

  - You are about to drop the `profile_page` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "profile_page" DROP CONSTRAINT "profile_page_user_id_fkey";

-- DropIndex
DROP INDEX "user_pass_hash_key";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "aboutMe" TEXT,
ADD COLUMN     "birthdayDate" TIMESTAMP(3),
ADD COLUMN     "city" TEXT,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "photo" TEXT,
ALTER COLUMN "login" DROP NOT NULL;

-- DropTable
DROP TABLE "profile_page";

-- CreateTable
CREATE TABLE "users_post" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "likes" INTEGER DEFAULT 0,
    "share" TEXT[],
    "image" TEXT[],
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users_post" ADD CONSTRAINT "users_post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
