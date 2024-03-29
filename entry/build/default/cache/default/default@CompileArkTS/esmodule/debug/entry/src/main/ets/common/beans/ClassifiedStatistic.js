// 导出一个名为 ClassifiedStatistic 的类，用于表示记账应用中的分类统计信息
export default class ClassifiedStatistic {
    // 构造函数，用于创建 ClassifiedStatistic 类的实例
    constructor(typeText, accountType, amount = 0, count = 0) {
        // 类型文本，用于描述统计项的类型
        this.typeText = '';
        // 账目类型，0 表示支出，1 表示收入
        this.accountType = 0;
        // 金额，表示该类型下的账目总金额，初始为0
        this.amount = 0;
        // 账目数量，表示该类型下的账目数量，初始为0
        this.count = 0;
        // 将传入的参数赋值给实例的各个属性
        this.typeText = typeText;
        this.accountType = accountType;
        this.amount = amount;
        this.count = count;
    }
}
//# sourceMappingURL=ClassifiedStatistic.js.map