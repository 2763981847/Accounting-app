// 引入常量和统计工具
import CommonConstants from '../common/constants/CommonConstants';
import { dayStatistics, monthStatistics } from '../common/utils/StatisticalUtils';
import Account from '../common/beans/Account';

// 定义统计卡组件
@Component
export default struct StatisticalCardComponent {
  // 使用@Link和@Watch修饰属性，监视accounts属性的变化
  @Link @Watch('onAccountsChange') accounts: Array<Account>;

  // 使用@State修饰属性，声明一些状态变量
  @State dayPay: number = dayStatistics(this.accounts, 0); // 今日支出
  @State dayEarn: number = dayStatistics(this.accounts, 1); // 今日收入
  @State monthPay: number = monthStatistics(this.accounts, 0); // 本月支出
  @State monthEarn: number = monthStatistics(this.accounts, 1); // 本月收入

  // 监听accounts属性的变化，触发onAccountsChange方法
  onAccountsChange() {
    // 更新状态变量，以反映最新的统计数据
    this.dayPay = dayStatistics(this.accounts, 0);
    this.dayEarn = dayStatistics(this.accounts, 1);
    this.monthPay = monthStatistics(this.accounts, 0);
    this.monthEarn = monthStatistics(this.accounts, 1);
  }

  // 构建组件
  build() {
    // 使用Column布局，嵌套Row布局来展示统计信息
    Column() {
      // 第一行，展示今日支出、收入、结余
      Row() {
        Column() {
          Text('今日支出')
            .fontSize($r('app.float.font_size_M'));
          Text(this.dayPay.toString())
            .fontSize($r('app.float.font_size_MP'))
            .fontWeight(FontWeight.Bold);
        }.alignItems(HorizontalAlign.Start);

        Column() {
          Text('今日收入')
            .fontSize($r('app.float.font_size_M'))
            .textAlign(TextAlign.Start);
          Text(this.dayEarn.toString())
            .fontSize($r('app.float.font_size_MP'))
            .fontWeight(FontWeight.Bold);
        }.alignItems(HorizontalAlign.Start);

        Column() {
          Text('今日结余')
            .fontSize($r('app.float.font_size_M'))
            .textAlign(TextAlign.Start);
          Text((this.dayEarn - this.dayPay).toString())
            .fontSize($r('app.float.font_size_MP'))
            .fontWeight(FontWeight.Bold);
        }.alignItems(HorizontalAlign.Start);
      }.height(CommonConstants.HALF_HEIGHT) // 设置行的高度
      .width(CommonConstants.FULL_WIDTH) // 设置行的宽度
      .justifyContent(FlexAlign.SpaceAround); // 设置子元素排列方式

      // 第二行，展示本月支出、收入、结余
      Row() {
        Column() {
          Text('本月支出')
            .fontSize($r('app.float.font_size_S'));
          Text(this.monthPay.toString())
            .fontSize($r('app.float.font_size_M'))
            .fontWeight(FontWeight.Bold);
        }.alignItems(HorizontalAlign.Start);

        Column() {
          Text('本月收入')
            .fontSize($r('app.float.font_size_S'));
          Text(this.monthEarn.toString())
            .fontSize($r('app.float.font_size_M'))
            .fontWeight(FontWeight.Bold);
        }.alignItems(HorizontalAlign.Start);

        Column() {
          Text('本月结余')
            .fontSize($r('app.float.font_size_S'));
          Text((this.monthEarn - this.monthPay).toString())
            .fontSize($r('app.float.font_size_M'))
            .fontWeight(FontWeight.Bold);
        }.alignItems(HorizontalAlign.Start);
      }.height(CommonConstants.HALF_HEIGHT) // 设置行的高度
      .width(CommonConstants.FULL_WIDTH) // 设置行的宽度
      .justifyContent(FlexAlign.SpaceAround); // 设置子元素排列方式
    }
    .backgroundImage($r('app.media.cardBackgroundImage')) // 设置背景图片
    .backgroundImageSize(ImageSize.Cover) // 设置背景图片大小
    .borderRadius($r('app.float.radius_size_M')) // 设置组件的圆角半径
    .width(CommonConstants.FULL_WIDTH) // 设置组件的宽度
    .height(CommonConstants.FULL_HEIGHT); // 设置组件的高度
  }
}
