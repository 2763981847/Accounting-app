// 导出一个名为 Account 的类，该类用于表示记账应用中的一笔记账信息
export default class Account {
  // 记账ID
  id: number = -1;

  // 记账类型，0 表示支出，1 表示收入
  accountType: number = 0;

  // 类型文本，用于描述记账类型
  typeText: string = '';

  // 金额，表示记账的金额
  amount: number = 0;

  // 日期，表示收入或支出发生的日期，默认为当前日期
  date: Date = new Date();

  // 描述，用于记录收入或支出的详细信息
  desc: string = '';

  // 构造函数，用于创建 Account 类的实例
  constructor(
    accountType: number = 0, // 初始化记账类型，默认为支出
    typeText: string = '', // 初始化类型文本，默认为空字符串
    amount: number = 0, // 初始化金额，默认为0
    date: Date = new Date(), // 初始化日期，默认为当前日期
    desc: string = '' // 初始化描述，默认为空字符串
  ) {
    // 将传入的参数赋值给实例的各个属性
    this.accountType = accountType;
    this.typeText = typeText;
    this.amount = amount;
    this.date = date;
    this.desc = desc;
  }
}