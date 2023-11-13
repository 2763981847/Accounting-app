import { generateRandomDate } from '../common/utils/DateUtils';
import AccountData from './AccountData';
import AccountItem from './AccountItem';

export const PayList: Array<AccountItem> = [
  {
    icon: $rawfile('foods.png'),
    iconSelected: $rawfile('foods_selected.png'),
    accountType: 0,
    typeText: '吃饭'
  },
  {
    icon: $rawfile('snacks.png'),
    iconSelected: $rawfile('snacks_selected.png'),
    accountType: 0,
    typeText: '零食'
  },
  {
    icon: $rawfile('fuel.png'),
    iconSelected: $rawfile('fuel_selected.png'),
    accountType: 0,
    typeText: '汽车加油'
  },
  {
    icon: $rawfile('travel.png'),
    iconSelected: $rawfile('travel_selected.png'),
    accountType: 0,
    typeText: '旅游'
  },
  {
    icon: $rawfile('games.png'),
    iconSelected: $rawfile('games_selected.png'),
    accountType: 0,
    typeText: '娱乐'
  },
  {
    icon: $rawfile('pets.png'),
    iconSelected: $rawfile('pets_selected.png'),
    accountType: 0,
    typeText: '宠物'
  }
]

export const EarnList: Array<AccountItem> = [
  {
    icon: $rawfile('income.png'),
    iconSelected: $rawfile('income_selected.png'),
    accountType: 1,
    typeText: '工作收入'
  },
  {
    icon: $rawfile('invest.png'),
    iconSelected: $rawfile('invest_selected.png'),
    accountType: 1,
    typeText: '投资'
  }
]

export const ImageList: Record<string, Resource> = {
  '吃饭': $rawfile('foods.png'),
  '零食': $rawfile('snacks.png'),
  '汽车加油': $rawfile('fuel.png'),
  '旅游': $rawfile('travel.png'),
  '娱乐': $rawfile('games.png'),
  '宠物': $rawfile('pets.png'),
  '工作收入': $rawfile('income.png'),
  '投资': $rawfile('invest.png')
}

const now = new Date(), testBeginDate = new Date(now.getFullYear() - 2, 0)

export const testAccounts: AccountData[] =
  [
    new AccountData(0, '吃饭', 100, new Date(), generateRandomString()),
    new AccountData(0, '零食', 99, new Date(), generateRandomString()),
    new AccountData(0, '汽车加油', 97, new Date(), generateRandomString()),
    new AccountData(0, '旅游', 96, new Date(), generateRandomString()),
    new AccountData(0, '宠物', 94, new Date(), generateRandomString()),
    new AccountData(0, '吃饭', 100, new Date(), generateRandomString()),
    new AccountData(1, '工作收入', 95, new Date(), generateRandomString()),
    new AccountData(1, '投资', 94, new Date(), generateRandomString()),
    new AccountData(1, '工作收入', 98, new Date(), generateRandomString()),
    new AccountData(1, '投资', 97, new Date(), generateRandomString()),
    new AccountData(1, '工作收入', 65, new Date(), generateRandomString()),
    new AccountData(1, '投资', 94, new Date(), generateRandomString()),
    new AccountData(0, '旅游', 96, generateRandomDate(testBeginDate, now), generateRandomString()),
    new AccountData(0, '宠物', 94, generateRandomDate(testBeginDate, now), generateRandomString()),
    new AccountData(0, '吃饭', 96, generateRandomDate(testBeginDate, now), generateRandomString()),
    new AccountData(0, '零食', 94, generateRandomDate(testBeginDate, now), generateRandomString()),
    new AccountData(1, '工作收入', 93, generateRandomDate(testBeginDate, now), generateRandomString()),
    new AccountData(1, '投资', 105, generateRandomDate(testBeginDate, now), generateRandomString()),
  ]

function generateRandomString(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length = Math.floor(Math.random() * 10); // Random length less than ten

  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}
