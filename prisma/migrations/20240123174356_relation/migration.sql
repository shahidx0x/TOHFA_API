/*
  Warnings:

  - You are about to drop the column `type` on the `products` table. All the data in the column will be lost.
  - Added the required column `typeId` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` DROP COLUMN `type`,
    ADD COLUMN `typeId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `product_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `product_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
