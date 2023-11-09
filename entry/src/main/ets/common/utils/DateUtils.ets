export function formatDateTime(date: Date | number, format: string): string {
  if (typeof date === 'number') {
    date = new Date(date)
  }
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
  return format;
}


export function isSameDay(date1: Date, date2: Date): boolean {
  return isSameMonth(date1, date2) &&
  date1.getDate() === date2.getDate()
}


export function isSameMonth(date1: Date, date2: Date): boolean {
  return date1.getFullYear() === date2.getFullYear() &&
  date1.getMonth() === date2.getMonth()
}

export function getEndOfTheDay(inputDate: Date | number): Date {
  if (typeof inputDate === 'number') {
    inputDate = new Date(inputDate)
  }
  const date = new Date(inputDate)
  date.setHours(23, 59, 59, 999);
  return date
}

export function getMondayOfWeek(inputDate: Date | number): Date {
  if (typeof inputDate === 'number') {
    inputDate = new Date(inputDate)
  }
  const date = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
  const dayOfWeek = date.getDay();
  const difference = dayOfWeek;

  const millisecondsInDay = 24 * 60 * 60 * 1000;
  const millisecondsToAdd = difference * millisecondsInDay;

  date.setTime(date.getTime() - millisecondsToAdd);
  return date;
}

export function getFirstDateOfThisMonth(date: Date | number): Date {
  if (typeof date === 'number') {
    date = new Date(date)
  }
  return new Date(date.getFullYear(), date.getMonth())
}


export function getFirstDateOfThisYear(date: Date | number): Date {
  if (typeof date === 'number') {
    date = new Date(date)
  }
  return new Date(date.getFullYear(), 0)
}