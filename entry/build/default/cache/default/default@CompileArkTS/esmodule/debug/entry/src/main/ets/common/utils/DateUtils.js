import CommonConstants from '@bundle:com.example.rdb/entry/ets/common/constants/CommonConstants';
export function formatDateTime(date, format) {
    if (typeof date === 'number') {
        date = new Date(date);
    }
    const o = {
        'y+': date.getFullYear(),
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds(),
        a: date.getHours() < 12 ? '上午' : '下午',
        A: date.getHours() < 12 ? 'AM' : 'PM', // AM/PM
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    return format;
}
export function isSameDay(date1, date2) {
    if (typeof date1 === 'number') {
        date1 = new Date(date1);
    }
    if (typeof date2 === 'number') {
        date2 = new Date(date2);
    }
    return isSameMonth(date1, date2) &&
        date1.getDate() === date2.getDate();
}
export function isSameMonth(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth();
}
export function getEndOfTheDay(inputDate) {
    if (typeof inputDate === 'number') {
        inputDate = new Date(inputDate);
    }
    const nextDay = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate() + 1);
    return new Date(nextDay.getTime() - 1);
}
export function getMondayOfWeek(inputDate) {
    if (typeof inputDate === 'number') {
        inputDate = new Date(inputDate);
    }
    const date = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
    const dayOfWeek = date.getDay();
    const difference = dayOfWeek;
    const millisecondsToAdd = difference * CommonConstants.MILLISECONDS_IN_DAY;
    date.setTime(date.getTime() - millisecondsToAdd);
    return date;
}
export function getFirstDateOfThisMonth(date) {
    if (typeof date === 'number') {
        date = new Date(date);
    }
    return new Date(date.getFullYear(), date.getMonth());
}
export function getFirstDateOfThisYear(date) {
    if (typeof date === 'number') {
        date = new Date(date);
    }
    return new Date(date.getFullYear(), 0);
}
export function getDateRangeOfThisWeek(date) {
    const beginDate = getMondayOfWeek(date);
    const nextWeek = new Date(beginDate.getTime());
    nextWeek.setDate(nextWeek.getDate() + 7);
    return { beginDate: beginDate.getTime(), endDate: nextWeek.getTime() - 1 };
}
export function getDateRangeOfThisMonth(date) {
    const beginDate = getFirstDateOfThisMonth(date);
    const nextMonth = new Date(beginDate.getTime());
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return { beginDate: beginDate.getTime(), endDate: nextMonth.getTime() - 1 };
}
export function getDateRangeOfThisYear(date) {
    const beginDate = getFirstDateOfThisYear(date);
    const nextYear = new Date(beginDate.getTime());
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    return { beginDate: beginDate.getTime(), endDate: nextYear.getTime() - 1 };
}
export function generateRandomDate(startDate, endDate) {
    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime();
    const randomTimestamp = startTimestamp + Math.random() * (endTimestamp - startTimestamp);
    return new Date(randomTimestamp);
}
//# sourceMappingURL=DateUtils.js.map