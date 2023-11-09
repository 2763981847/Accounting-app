export default class ClassifiedStatistic {
  typeText: string = '';
  accountType: number = 0;
  amount: number = 0;
  count: number = 0;

  constructor(typeText: string, accountType: number, amount: number = 0, count = 0) {
    this.typeText = typeText
    this.accountType = accountType
    this.amount = amount
    this.count = count
  }
}