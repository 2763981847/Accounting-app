import ClassifiedStatistic from '@bundle:com.example.rdb/entry/ets/common/beans/ClassifiedStatistic';
import { isSameDay, isSameMonth } from '@bundle:com.example.rdb/entry/ets/common/utils/DateUtils';
export function dayStatistics(accounts, accountType, date = new Date()) {
    return accounts.filter((account) => account.accountType === accountType && isSameDay(date, account.date))
        .map((account) => account.amount).reduce((total, cur) => total + cur, 0);
}
export function monthStatistics(accounts, accountType, date = new Date()) {
    return accounts.filter((account) => account.accountType === accountType && isSameMonth(date, account.date))
        .map((account) => account.amount).reduce((total, cur) => total + cur, 0);
}
export function totalAmount(accounts, accountType) {
    return accounts.filter((account) => account.accountType === accountType)
        .map((account) => account.amount)
        .reduce((total, cur) => total + cur, 0);
}
export function statisticByType(accounts, accountType, beginDate, endDate) {
    if (beginDate instanceof Date) {
        beginDate = beginDate.getTime();
    }
    if (endDate instanceof Date) {
        endDate = endDate.getTime();
    }
    const map = new Map();
    accounts.filter((account) => account.accountType === accountType && account.date.getTime() <= endDate && account.date.getTime() >= beginDate)
        .forEach((account) => {
        const key = account.typeText;
        if (!map.has(key)) {
            map.set(key, new ClassifiedStatistic(account.typeText, accountType));
        }
        const cs = map.get(key);
        cs.count += 1;
        cs.amount += account.amount;
    });
    const result = Array.from(map.values());
    return result.sort((a, b) => b.amount - a.amount);
}
export function getRatios(classifiedStatistics) {
    const amounts = classifiedStatistics.map(classifiedStatistic => classifiedStatistic.amount);
    const sum = amounts.reduce((total, amount) => total + amount, 0);
    return amounts.map(amount => amount / sum);
}
//# sourceMappingURL=StatisticalUtils.js.map