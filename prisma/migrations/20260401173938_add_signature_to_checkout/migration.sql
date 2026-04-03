/*
  Warnings:

  - You are about to drop the column `houseRulesUrl` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `poolRulesUrl` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `sendHouseRules` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `sendPoolRules` on the `Property` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CheckOut" ADD COLUMN     "signatureDataUrl" TEXT;

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "houseRulesUrl",
DROP COLUMN "poolRulesUrl",
DROP COLUMN "sendHouseRules",
DROP COLUMN "sendPoolRules";
