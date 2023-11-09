import CommonConstants from '../common/constants/CommonConstants';
import { isSameDay, isSameMonth } from '../common/utils/DateUtils'
import { dayStatistics, monthStatistics } from '../common/utils/StatisticalUtils';
import AccountData from '../viewmodel/AccountData'


@Component
export default struct StatisticalCardComponent {
  @Link @Watch('onAccountsChange') accounts: Array<AccountData>
  @State dayPay: number = dayStatistics(this.accounts, 0)
  @State dayEarn: number = dayStatistics(this.accounts, 1)
  @State monthPay: number = monthStatistics(this.accounts, 0)
  @State monthEarn: number = monthStatistics(this.accounts, 1)

  onAccountsChange() {
    this.dayPay = dayStatistics(this.accounts, 0)
    this.dayEarn = dayStatistics(this.accounts, 1)
    this.monthPay = monthStatistics(this.accounts, 0)
    this.monthEarn = monthStatistics(this.accounts, 1)
  }

  build() {
    Column() {
      Row() {
        Column() {
          Text('今日支出')
            .fontSize($r('app.float.font_size_M'))
          Text(this.dayPay.toString())
            .fontSize($r('app.float.font_size_MP'))
            .fontWeight(FontWeight.Bold)
        }.alignItems(HorizontalAlign.Start)

        Column() {
          Text('今日收入')
            .fontSize($r('app.float.font_size_M'))
            .textAlign(TextAlign.Start)
          Text(this.dayEarn.toString())
            .fontSize($r('app.float.font_size_MP'))
            .fontWeight(FontWeight.Bold)
        }.alignItems(HorizontalAlign.Start)

        Column() {
          Text('今日结余')
            .fontSize($r('app.float.font_size_M'))
            .textAlign(TextAlign.Start)
          Text((this.dayEarn - this.dayPay).toString())
            .fontSize($r('app.float.font_size_MP'))
            .fontWeight(FontWeight.Bold)
        }.alignItems(HorizontalAlign.Start)
      }.height(CommonConstants.HALF_HEIGHT)
      .width(CommonConstants.FULL_WIDTH)
      .justifyContent(FlexAlign.SpaceAround)

      Row() {
        Column() {
          Text('本月支出')
            .fontSize($r('app.float.font_size_S'))
          Text(this.monthPay.toString())
            .fontSize($r('app.float.font_size_M'))
            .fontWeight(FontWeight.Bold)
        }.alignItems(HorizontalAlign.Start)

        Column() {
          Text('本月收入')
            .fontSize($r('app.float.font_size_S'))
          Text(this.monthEarn.toString())
            .fontSize($r('app.float.font_size_M'))
            .fontWeight(FontWeight.Bold)
        }.alignItems(HorizontalAlign.Start)

        Column() {
          Text('本月结余')
            .fontSize($r('app.float.font_size_S'))
          Text((this.monthEarn - this.monthPay).toString())
            .fontSize($r('app.float.font_size_M'))
            .fontWeight(FontWeight.Bold)
        }.alignItems(HorizontalAlign.Start)
      }.height(CommonConstants.HALF_HEIGHT)
      .width(CommonConstants.FULL_WIDTH)
      .justifyContent(FlexAlign.SpaceAround)
    }
    .backgroundImage($r('app.media.cardBackgroundImage'))
    .backgroundImageSize(ImageSize.Cover)
    .borderRadius($r('app.float.radius_size_M'))
    .width(CommonConstants.FULL_WIDTH)
    .height(CommonConstants.FULL_HEIGHT)
  }
}
