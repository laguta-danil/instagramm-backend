-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "pass_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_confirm_email" (
    "id" TEXT NOT NULL,
    "is_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "confirm_code" TEXT NOT NULL,
    "expr_date" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "users_confirm_email_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_login_key" ON "user"("login");

-- CreateIndex
CREATE UNIQUE INDEX "user_pass_hash_key" ON "user"("pass_hash");

-- CreateIndex
CREATE UNIQUE INDEX "users_confirm_email_confirm_code_key" ON "users_confirm_email"("confirm_code");

-- CreateIndex
CREATE UNIQUE INDEX "users_confirm_email_user_id_key" ON "users_confirm_email"("user_id");

-- AddForeignKey
ALTER TABLE "users_confirm_email" ADD CONSTRAINT "users_confirm_email_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
