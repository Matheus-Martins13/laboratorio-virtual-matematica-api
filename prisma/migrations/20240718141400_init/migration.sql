-- CreateTable
CREATE TABLE "person" (
    "id_person" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "person_pkey" PRIMARY KEY ("id_person")
);

-- CreateTable
CREATE TABLE "address" (
    "id_address" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "numero" TEXT,
    "complemento" TEXT,
    "cidade" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "logradouro" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "id_person" TEXT NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id_address")
);

-- CreateTable
CREATE TABLE "contact" (
    "id_contact" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "id_person" TEXT NOT NULL,

    CONSTRAINT "contact_pkey" PRIMARY KEY ("id_contact")
);

-- CreateTable
CREATE TABLE "user" (
    "id_user" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passowrd_hash" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ATIVO',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "id_person" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "profile" (
    "id_profile" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "id_user" TEXT NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id_profile")
);

-- CreateTable
CREATE TABLE "profile_picture" (
    "id_profile_picture" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "id_user" TEXT NOT NULL,

    CONSTRAINT "profile_picture_pkey" PRIMARY KEY ("id_profile_picture")
);

-- CreateTable
CREATE TABLE "object" (
    "id_object" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_category" TEXT NOT NULL,
    "id_subcategory" TEXT NOT NULL,

    CONSTRAINT "object_pkey" PRIMARY KEY ("id_object")
);

-- CreateTable
CREATE TABLE "object_picture" (
    "id_object_picture" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "id_object" TEXT NOT NULL,

    CONSTRAINT "object_picture_pkey" PRIMARY KEY ("id_object_picture")
);

-- CreateTable
CREATE TABLE "object_file" (
    "id_object_file" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "id_object" TEXT NOT NULL,

    CONSTRAINT "object_file_pkey" PRIMARY KEY ("id_object_file")
);

-- CreateTable
CREATE TABLE "comment" (
    "id_user" TEXT NOT NULL,
    "id_object" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id_user","id_object")
);

-- CreateTable
CREATE TABLE "favorite" (
    "id_user" TEXT NOT NULL,
    "id_object" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "favorite_pkey" PRIMARY KEY ("id_user","id_object")
);

-- CreateTable
CREATE TABLE "category" (
    "id_category" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id_category")
);

-- CreateTable
CREATE TABLE "subcategory" (
    "id_subcategory" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "id_category" TEXT NOT NULL,

    CONSTRAINT "subcategory_pkey" PRIMARY KEY ("id_subcategory")
);

-- CreateTable
CREATE TABLE "tag" (
    "id_tag" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id_tag")
);

-- CreateTable
CREATE TABLE "_ObjectToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "person_cpf_key" ON "person"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "address_id_person_key" ON "address"("id_person");

-- CreateIndex
CREATE UNIQUE INDEX "contact_phone_key" ON "contact"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "contact_id_person_key" ON "contact"("id_person");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_person_key" ON "user"("id_person");

-- CreateIndex
CREATE UNIQUE INDEX "profile_id_user_key" ON "profile"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "profile_picture_id_user_key" ON "profile_picture"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "object_id_user_key" ON "object"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "object_id_category_key" ON "object"("id_category");

-- CreateIndex
CREATE UNIQUE INDEX "object_id_subcategory_key" ON "object"("id_subcategory");

-- CreateIndex
CREATE UNIQUE INDEX "object_picture_id_object_key" ON "object_picture"("id_object");

-- CreateIndex
CREATE UNIQUE INDEX "object_file_id_object_key" ON "object_file"("id_object");

-- CreateIndex
CREATE UNIQUE INDEX "comment_id_user_key" ON "comment"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "comment_id_object_key" ON "comment"("id_object");

-- CreateIndex
CREATE UNIQUE INDEX "favorite_id_user_key" ON "favorite"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "favorite_id_object_key" ON "favorite"("id_object");

-- CreateIndex
CREATE UNIQUE INDEX "subcategory_id_category_key" ON "subcategory"("id_category");

-- CreateIndex
CREATE UNIQUE INDEX "_ObjectToTag_AB_unique" ON "_ObjectToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ObjectToTag_B_index" ON "_ObjectToTag"("B");

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_id_person_fkey" FOREIGN KEY ("id_person") REFERENCES "person"("id_person") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact" ADD CONSTRAINT "contact_id_person_fkey" FOREIGN KEY ("id_person") REFERENCES "person"("id_person") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_id_person_fkey" FOREIGN KEY ("id_person") REFERENCES "person"("id_person") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_picture" ADD CONSTRAINT "profile_picture_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "object" ADD CONSTRAINT "object_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "object" ADD CONSTRAINT "object_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "category"("id_category") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "object" ADD CONSTRAINT "object_id_subcategory_fkey" FOREIGN KEY ("id_subcategory") REFERENCES "subcategory"("id_subcategory") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "object_picture" ADD CONSTRAINT "object_picture_id_object_fkey" FOREIGN KEY ("id_object") REFERENCES "object"("id_object") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "object_file" ADD CONSTRAINT "object_file_id_object_fkey" FOREIGN KEY ("id_object") REFERENCES "object"("id_object") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_id_object_fkey" FOREIGN KEY ("id_object") REFERENCES "object"("id_object") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_id_object_fkey" FOREIGN KEY ("id_object") REFERENCES "object"("id_object") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subcategory" ADD CONSTRAINT "subcategory_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "category"("id_category") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ObjectToTag" ADD CONSTRAINT "_ObjectToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "object"("id_object") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ObjectToTag" ADD CONSTRAINT "_ObjectToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tag"("id_tag") ON DELETE CASCADE ON UPDATE CASCADE;
