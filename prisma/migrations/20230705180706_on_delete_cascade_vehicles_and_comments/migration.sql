-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_vehicleId_fkey";

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
