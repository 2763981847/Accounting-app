// 引入日期生成工具和相关的数据模型
import { generateRandomDate } from '@bundle:com.example.rdb/entry/ets/common/utils/DateUtils';
import Account from '@bundle:com.example.rdb/entry/ets/common/beans/Account';
// 定义支出列表
export const PayList = [
    {
        icon: { "id": 0, "type": 30000, params: ['foods.png'], "bundleName": "com.example.rdb", "moduleName": "entry" },
        iconSelected: { "id": 0, "type": 30000, params: ['foods_selected.png'], "bundleName": "com.example.rdb", "moduleName": "entry" },
        accountType: 0,
        typeText: '吃饭'
    },
    {
        icon: { "id": 0, "type": 30000, params: ['snacks.png'], "bundleName": "com.example.rdb", "moduleName": "entry" },
        iconSelected: { "id": 0, "type": 30000, params: ['snacks_selected.png'], "bundleName": "com.example.rdb", "moduleName": "entry" },
        accountType: 0,
        typeText: '零食'
    },
    {
        icon: { "id": 0, "type": 30000, params: ['fuel.png'], "bundleName": "com.example.rdb", "moduleName": "entry" },
        iconSelected: { "id": 0, "type": 30000, params: ['fuel_selected.png'], "bundleName": "com.example.rdb", "moduleName": "entry" },
        accountType: 0,
        typeText: '汽车加油'
    },
    {
        icon: { "id": 0, "type": 30000, params: ['travel.png'], "bundleName": "com.example.rdb", "moduleName": "entry" },
        iconSelected: { "id": 0, "type": 30000, params: ['travel_selected.png'], "bundleName": "com.example.rdb", "moduleName": "entry" },
        accountType: 0,
        typeText: '旅游'
    },
    {
        icon: { "id": 0, "type": 30000, params: ['games.png'], "bundleName": "com.example.rdb", "moduleName": "entry" },
        iconSelected: { "id": 0, "type": 30000, params: ['games_selected.png'], "bundleName": "com.example.rdb", "moduleName": "entry" },
        accountType: 0,
        typeText: '娱乐'
    },
    {
        icon: { "id": 0, "type": 30000, params: ['pets.png'], "bundleName": "com.example.rdb", "moduleName": "entry" },
        iconSelected: { "id": 0, "type": 30000, params: ['pets_selected.png'], "bundleName": "com.example.rdb", "moduleName": "entry" },
        accountType: 0,
        typeText: '宠物'
    }
];
// 定义收入列表
export const EarnList = [
    {
        icon: { "id": 0, "type": 30000, params: ['income.png'], "bundleName": "com.example.rdb", "moduleName": "entry" },
        iconSelected: { "id": 0, "type": 30000, params: ['income_selected.png'], "bundleName": "com.example.rdb", "moduleName": "entry" },
        accountType: 1,
        typeText: '工作收入'
    },
    {
        icon: { "id": 0, "type": 30000, params: ['invest.png'], "bundleName": "com.example.rdb", "moduleName": "entry" },
        iconSelected: { "id": 0, "type": 30000, params: ['invest_selected.png'], "bundleName": "com.example.rdb", "moduleName": "entry" },
        accountType: 1,
        typeText: '投资'
    }
];
// 定义图像列表，用于关联支出/收入类型与图标资源
export const ImageList = {
    '吃饭': { "id": 0, "type": 30000, params: ['foods.png'], "bundleName": "com.example.rdb", "moduleName": "entry" },
    '零食': { "id": 0, "type": 30000, params: ['snacks.png'], "bundleName": "com.example.rdb", "moduleName": "entry" },
    '汽车加油': { "id": 0, "type": 30000, params: ['fuel.png'], "bundleName": "com.example.rdb", "moduleName": "entry" },
    '旅游': { "id": 0, "type": 30000, params: ['travel.png'], "bundleName": "com.example.rdb", "moduleName": "entry" },
    '娱乐': { "id": 0, "type": 30000, params: ['games.png'], "bundleName": "com.example.rdb", "moduleName": "entry" },
    '宠物': { "id": 0, "type": 30000, params: ['pets.png'], "bundleName": "com.example.rdb", "moduleName": "entry" },
    '工作收入': { "id": 0, "type": 30000, params: ['income.png'], "bundleName": "com.example.rdb", "moduleName": "entry" },
    '投资': { "id": 0, "type": 30000, params: ['invest.png'], "bundleName": "com.example.rdb", "moduleName": "entry" }
};
// 初始化日期和测试数据
const now = new Date(), testBeginDate = new Date(now.getFullYear() - 2, 0);
// 定义测试用的账单数据
export const testAccounts = [
    new Account(0, '吃饭', 100, new Date(), generateRandomString()),
    new Account(0, '零食', 99, new Date(), generateRandomString()),
    new Account(0, '汽车加油', 97, new Date(), generateRandomString()),
    new Account(0, '旅游', 96, new Date(), generateRandomString()),
    new Account(0, '宠物', 94, new Date(), generateRandomString()),
    new Account(0, '娱乐', 90, new Date(), generateRandomString()),
    new Account(0, '吃饭', 100, new Date(), generateRandomString()),
    new Account(1, '工作收入', 95, new Date(), generateRandomString()),
    new Account(1, '投资', 94, new Date(), generateRandomString()),
    new Account(1, '工作收入', 98, new Date(), generateRandomString()),
    new Account(1, '投资', 97, new Date(), generateRandomString()),
    new Account(1, '工作收入', 65, new Date(), generateRandomString()),
    new Account(1, '投资', 94, new Date(), generateRandomString()),
    new Account(0, '旅游', 96, generateRandomDate(testBeginDate, now), generateRandomString()),
    new Account(0, '宠物', 94, generateRandomDate(testBeginDate, now), generateRandomString()),
    new Account(0, '吃饭', 96, generateRandomDate(testBeginDate, now), generateRandomString()),
    new Account(0, '零食', 94, generateRandomDate(testBeginDate, now), generateRandomString()),
    new Account(1, '工作收入', 93, generateRandomDate(testBeginDate, now), generateRandomString()),
    new Account(1, '投资', 105, generateRandomDate(testBeginDate, now), generateRandomString()),
];
// 生成指定长度的随机字符串
function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = Math.floor(Math.random() * 10); // 生成长度小于十的随机数
    let randomString = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }
    return randomString;
}
//# sourceMappingURL=AccountList.js.map