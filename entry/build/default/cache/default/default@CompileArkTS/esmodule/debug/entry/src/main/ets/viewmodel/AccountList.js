import { generateRandomDate } from '@bundle:com.example.rdb/entry/ets/common/utils/DateUtils';
import Account from '@bundle:com.example.rdb/entry/ets/common/beans/Account';
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
const now = new Date(), testBeginDate = new Date(now.getFullYear() - 2, 0);
export const testAccounts = [
    new Account(0, '吃饭', 100, new Date(), generateRandomString()),
    new Account(0, '零食', 99, new Date(), generateRandomString()),
    new Account(0, '汽车加油', 97, new Date(), generateRandomString()),
    new Account(0, '旅游', 96, new Date(), generateRandomString()),
    new Account(0, '宠物', 94, new Date(), generateRandomString()),
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
function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = Math.floor(Math.random() * 10); // Random length less than ten
    let randomString = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }
    return randomString;
}
//# sourceMappingURL=AccountList.js.map