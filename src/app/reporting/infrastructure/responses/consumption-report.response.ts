import { BaseResponse } from '../../../shared/infrastructure/responses/base.response';

export interface ConsumptionReportResponse extends BaseResponse<number> {
  userId: number;
  startDate: string;
  endDate: string;
  totalWatts: number;
  averageWatts: number;
  highestReading: number;
  recommendation: string;
}
