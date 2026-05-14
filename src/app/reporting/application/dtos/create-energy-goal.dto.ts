export interface CreateEnergyGoalDto {
  title: string;
  targetWatts: number;
  currentWatts: number;
  startDate: string;
  endDate: string;
}
