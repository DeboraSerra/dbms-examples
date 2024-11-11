/*
  Warnings:

  - You are about to drop the column `statusId` on the `orders` table. All the data in the column will be lost.
  - Added the required column `status` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_statusId_fkey`;

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `statusId`,
    ADD COLUMN `status` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_status_fkey` FOREIGN KEY (`status`) REFERENCES `order_status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
