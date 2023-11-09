import AccountData from '../../viewmodel/AccountData';
import ClassifiedStatistic from '../../viewmodel/ClassifiedStatistic';
import { isSameDay, isSameMonth } from './DateUtils';

export function dayStatistics(accounts: Array<AccountData>, accountType: number, date: Date = new Date()): number {
  return accounts.filter((account) => account.accountType === accountType && isSameDay(date, account.date))
    .map((account) => account.amount).reduce((total, cur) => total + cur, 0);
}

export function monthStatistics(accounts: Array<AccountData>, accountType: number, date: Date = new Date()): number {
  return accounts.filter((account) => account.accountType === accountType && isSameMonth(date, account.date))
    .map((account) => account.amount).reduce((total, cur) => total + cur, 0);
}

export function totalAmount(accounts: Array<AccountData>, accountType: number): number {
  return accounts.filter((account) => account.accountType === accountType)
    .map((account) => account.amount)
    .reduce((total, cur) => total + cur, 0)
}


export function statisticByType(accounts: Array<AccountData>, accountType: number, beginDate: Date | number, endDate: Date | number): Array<ClassifiedStatistic> {
  if (beginDate instanceof Date) {
    beginDate = beginDate.getTime()
  }
  if (endDate instanceof Date) {
    endDate = endDate.getTime()
  }
  const map: Map<string, ClassifiedStatistic> = new Map()
  accounts.filter((account) => account.accountType === accountType && account.date.getTime() <= endDate && account.date.getTime() >= beginDate)
    .forEach((account) => {
      const key = account.typeText
      if (!map.has(key)) {
        map.set(key, new ClassifiedStatistic(account.typeText, accountType))
      }
      const cs = map.get(key)
      cs.count += 1
      cs.amount += account.amount
    })
  const result = Array.from(map.values())
  return result.sort((a, b) => b.amount - a.amount)
}

export function getRatios(classifiedStatistics: Array<ClassifiedStatistic>): Array<number> {
  const amounts = classifiedStatistics.map(classifiedStatistic => classifiedStatistic.amount)
  const sum = amounts.reduce((total, amount) => total + amount, 0)
  return amounts.map(amount => amount / sum)
}