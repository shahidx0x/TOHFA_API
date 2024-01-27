-- CreateTable
CREATE TABLE `products` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL DEFAULT 'https://asa-groundhandling.com/wp-content/uploads/2019/10/placeholder-person-square.png',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `product_id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
