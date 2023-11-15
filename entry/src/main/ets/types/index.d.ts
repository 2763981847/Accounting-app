export interface DateRange {
  beginDate: number;
  endDate: number;
}

export interface AccountTable {
  tableName: string;
  sqlCreate: string;
  columns: string[];
}