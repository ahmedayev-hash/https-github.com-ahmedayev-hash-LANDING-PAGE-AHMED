export interface ExchangeRateData {
  success: boolean;
  base: string;
  target: string;
  referenceRate: number;
  adjustment: number;
  transactionRate: number;
  source: string;
  updatedAt: string;
  nextRefreshAt: string;
  isFallback: boolean;
  isStale: boolean;
}
