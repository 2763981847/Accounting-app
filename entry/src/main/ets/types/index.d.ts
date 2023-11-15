// 定义接口 DateRange，表示日期范围，包括开始日期和结束日期
export interface DateRange {
  beginDate: number; // 开始日期的时间戳
  endDate: number;   // 结束日期的时间戳
}

// 定义接口 AccountTable，表示数据库中的账户表结构
export interface AccountTable {
  tableName: string; // 表名
  sqlCreate: string; // 创建表的 SQL 语句
  columns: string[]; // 表的列名数组
}
