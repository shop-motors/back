-- DropForeignKey
ALTER TABLE "gallery" DROP CONSTRAINT "gallery_vehicleId_fkey";

-- AddForeignKey
ALTER TABLE "gallery" ADD CONSTRAINT "gallery_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
