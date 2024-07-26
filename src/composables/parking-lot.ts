import { PARKING_LOT_STATUS, type ParkingLot } from '@/types/ParkingLot';
import { useI18n } from 'vue-i18n';

export default function useParkingLot() {
  const { t } = useI18n();

  function calculatePercentage(filledSlots: number, totalSlots: number) {
    return (filledSlots * 100) / totalSlots;
  }

  function getStatusColor(parkingLot: ParkingLot) {
    const status = getParkingLotStatus(parkingLot);
    switch (status) {
      case 'FULL':
        return 'error';
      case 'ALMOST_FULL':
        return 'warning';
      default:
        return 'green';
    }
  }

  function getParkingLotStatus(parkingLot: ParkingLot) {
    const i = calculatePercentage(
      parkingLot.filled_slots,
      parkingLot.total_slots
    );
    if (i >= 100) {
      return PARKING_LOT_STATUS.FULL;
    } else if (i > 80) {
      return PARKING_LOT_STATUS.ALMOST_FULL;
    }
    return PARKING_LOT_STATUS.FREE;
  }

  function getParkingLotStatusText(parkingLot: ParkingLot) {
    const status = getParkingLotStatus(parkingLot);
    switch (status) {
      case 'FULL':
        return t('labels.parking_lot.full');
      case 'ALMOST_FULL':
        return t('labels.parking_lot.almost_full');
      default:
        return t('labels.parking_lot.free');
    }
  }

  return {
    calculatePercentage,
    getStatusColor,
    getParkingLotStatus,
    getParkingLotStatusText
  };
}
