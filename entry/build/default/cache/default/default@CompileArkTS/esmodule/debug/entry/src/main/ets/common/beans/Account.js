// 导出一个名为 Account 的类，该类用于表示记账应用中的一笔记账信息
export default class Account {
    // 构造函数，用于创建 Account 类的实例
    constructor(accountType = 0, // 初始化记账类型，默认为支出
    typeText = '', // 初始化类型文本，默认为空字符串
    amount = 0, // 初始化金额，默认为0
    date = new Date(), // 初始化日期，默认为当前日期
    desc = '' // 初始化描述，默认为空字符串
    ) {
        // 记账ID
        this.id = -1;
        // 记账类型，0 表示支出，1 表示收入
        this.accountType = 0;
        // 类型文本，用于描述记账类型
        this.typeText = '';
        // 金额，表示记账的金额
        this.amount = 0;
        // 日期，表示收入或支出发生的日期，默认为当前日期
        this.date = new Date();
        // 描述，用于记录收入或支出的详细信息
        this.desc = '';
        // 将传入的参数赋值给实例的各个属性
        this.accountType = accountType;
        this.typeText = typeText;
        this.amount = amount;
        this.date = date;
        this.desc = desc;
    }
}
//# sourceMappingURL=Account.js.map