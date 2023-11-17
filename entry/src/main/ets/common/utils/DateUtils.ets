// 导入通用常量模块
import CommonConstants from '../constants/CommonConstants';

// 格式化日期时间的函数
export function formatDateTime(date: Date | number, format: string): string {
  // 如果输入的日期是数字，将其转换为日期对象
  if (typeof date === 'number') {
    date = new Date(date)
  }

  // 定义日期格式化的参数对象
  const o = {
    'y+': date.getFullYear(), // 年份
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
    a: date.getHours() < 12 ? '上午' : '下午', // 上午/下午
    A: date.getHours() < 12 ? 'AM' : 'PM', // AM/PM
  };

  // 替换日期格式中的占位符
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(
        RegExp.$1,
          RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }

  // 返回格式化后的日期字符串
  return format;
}

// 判断两个日期是否是同一天
export function isSameDay(date1: Date | number, date2: Date | number): boolean {
  // 如果输入的日期是数字，将其转换为日期对象
  if (typeof date1 === 'number') {
    date1 = new Date(date1)
  }
  if (typeof date2 === 'number') {
    date2 = new Date(date2)
  }

  // 判断两个日期的年、月、日是否相同
  return isSameMonth(date1, date2) &&
  date1.getDate() === date2.getDate()
}

// 判断两个日期是否是同一个月
export function isSameMonth(date1: Date, date2: Date): boolean {
  return date1.getFullYear() === date2.getFullYear() &&
  date1.getMonth() === date2.getMonth()
}

// 获取一天的最后时刻
export function getEndOfTheDay(inputDate: Date | number): Date {
  // 如果输入的日期是数字，将其转换为日期对象
  if (typeof inputDate === 'number') {
    inputDate = new Date(inputDate)
  }
  // 获取下一天的起始时刻，然后减去1毫秒
  const nextDay = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate() + 1)
  return new Date(nextDay.getTime() - 1)
}

// 获取一周的第一天（周一）的日期
export function getMondayOfWeek(inputDate: Date | number): Date {
  // 如果输入的日期是数字，将其转换为日期对象
  if (typeof inputDate === 'number') {
    inputDate = new Date(inputDate)
  }
  // 获取当前日期对象
  const date = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
  // 获取当前日期是一周的第几天
  const dayOfWeek = date.getDay();
  // 计算需要减去的毫秒数，使得日期变为本周的周一
  const difference = dayOfWeek;
  const millisecondsToAdd = difference * CommonConstants.MILLISECONDS_IN_DAY;

  // 将日期对象设置为周一并返回
  date.setTime(date.getTime() - millisecondsToAdd);
  return date;
}

// 获取本月的第一天的日期
export function getFirstDateOfThisMonth(date: Date | number): Date {
  // 如果输入的日期是数字，将其转换为日期对象
  if (typeof date === 'number') {
    date = new Date(date)
  }
  // 返回本月的第一天的日期
  return new Date(date.getFullYear(), date.getMonth())
}

// 获取本年的第一天的日期
export function getFirstDateOfThisYear(date: Date | number): Date {
  // 如果输入的日期是数字，将其转换为日期对象
  if (typeof date === 'number') {
    date = new Date(date)
  }
  // 返回本年的第一天的日期
  return new Date(date.getFullYear(), 0)
}

// 获取本周的日期范围
export function getDateRangeOfThisWeek(date: Date | number) {
  // 获取本周的第一天和下一周的第一天
  const beginDate = getMondayOfWeek(date)
  const nextWeek = new Date(beginDate.getTime())
  nextWeek.setDate(nextWeek.getDate() + 7)
  // 返回日期范围对象
  return { beginDate: beginDate.getTime(), endDate: nextWeek.getTime() - 1 };
}

// 获取本月的日期范围
export function getDateRangeOfThisMonth(date: Date | number) {
  // 获取本月的第一天和下个月的第一天
  const beginDate = getFirstDateOfThisMonth(date)
  const nextMonth = new Date(beginDate.getTime())
  nextMonth.setMonth(nextMonth.getMonth() + 1)
  // 返回日期范围对象
  return { beginDate: beginDate.getTime(), endDate: nextMonth.getTime() - 1 };
}

// 获取本年的日期范围
export function getDateRangeOfThisYear(date: Date | number) {
  // 获取本年的第一天和下一年的第一天
  const beginDate = getFirstDateOfThisYear(date)
  const nextYear = new Date(beginDate.getTime())
  nextYear.setFullYear(nextYear.getFullYear() + 1)
  // 返回日期范围对象
  return { beginDate: beginDate.getTime(), endDate: nextYear.getTime() - 1 };
}

// 生成指定日期范围内的随机日期
export function generateRandomDate(startDate: Date, endDate: Date): Date {
  // 计算起始日期和结束日期的时间戳范围
  const startTimestamp = startDate.getTime();
  const endTimestamp = endDate.getTime();
  // 生成在范围内的随机时间戳，并转换为日期对象返回
  const randomTimestamp = startTimestamp + Math.random() * (endTimestamp - startTimestamp);
  return new Date(randomTimestamp);
}
