// 导入相关模块和工具函数
import Account from '../beans/Account';
import ClassifiedStatistic from '../beans/ClassifiedStatistic';
import { isSameDay, isSameMonth } from './DateUtils';

// 计算特定类型账目在指定日期的日收支统计
export function dayStatistics(accounts: Array<Account>, accountType: number, date: Date = new Date()): number {
  return accounts
    .filter((account) => account.accountType === accountType && isSameDay(date, account.date))
    .map((account) => account.amount)
    .reduce((total, cur) => total + cur, 0);
}

// 计算特定类型账目在指定日期的月收支统计
export function monthStatistics(accounts: Array<Account>, accountType: number, date: Date = new Date()): number {
  return accounts
    .filter((account) => account.accountType === accountType && isSameMonth(date, account.date))
    .map((account) => account.amount)
    .reduce((total, cur) => total + cur, 0);
}

// 计算特定类型账目的总收支金额
export function totalAmount(accounts: Array<Account>, accountType: number): number {
  return accounts
    .filter((account) => account.accountType === accountType)
    .map((account) => account.amount)
    .reduce((total, cur) => total + cur, 0);
}

// 根据账目类型和日期范围统计收支数据，返回分类统计信息数组
export function statisticByType(
    accounts: Array<Account>,
    accountType: number,
    beginDate: Date | number,
    endDate: Date | number
): Array<ClassifiedStatistic> {
  // 将日期对象转换为时间戳
  if (beginDate instanceof Date) {
    beginDate = beginDate.getTime()
  }
  if (endDate instanceof Date) {
    endDate = endDate.getTime()
  }

  // 使用 Map 存储分类统计信息，键为类型文本，值为 ClassifiedStatistic 对象
  const map: Map<string, ClassifiedStatistic> = new Map()

  // 筛选符合条件的账目，并遍历进行统计
  accounts
    .filter((account) => account.accountType === accountType && account.date.getTime() <= endDate && account.date.getTime() >= beginDate)
    .forEach((account) => {
      const key = account.typeText

      // 如果 Map 中没有该类型的统计信息，创建一个新的 ClassifiedStatistic 对象
      if (!map.has(key)) {
        map.set(key, new ClassifiedStatistic(account.typeText, accountType))
      }

      // 获取并更新该类型的统计信息
      const cs = map.get(key)
      cs.count += 1
      cs.amount += account.amount
    })

  // 将 Map 转换为数组，并按金额降序排序
  const result = Array.from(map.values())
  return result.sort((a, b) => b.amount - a.amount)
}

// 根据分类统计信息计算比例，返回比例数组
export function getRatios(classifiedStatistics: Array<ClassifiedStatistic>): Array<number> {
  // 获取金额数组，并计算总金额
  const amounts = classifiedStatistics.map(classifiedStatistic => classifiedStatistic.amount)
  const sum = amounts.reduce((total, amount) => total + amount, 0)

  // 计算比例数组并返回
  return amounts.map(amount => amount / sum)
}
