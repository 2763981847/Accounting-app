import CommonConstants from '../common/constants/CommonConstants'
import { formatDateTime, getEndOfTheDay, getFirstDateOfThisMonth } from '../common/utils/DateUtils'
import { getRatios, statisticByType } from '../common/utils/StatisticalUtils'
import DateSelectDialog from '../view/DateSelectDialog'
import AccountData from '../viewmodel/AccountData'
import { ImageList } from '../viewmodel/AccountList'
import ClassifiedStatistic from '../viewmodel/ClassifiedStatistic'
import { panelColors } from '../viewmodel/PanelColors'

@Component
export default struct StatisticPage {
  @Link @Watch('refreshClassifiedStatistics') accounts: Array<AccountData>
  // @State修饰Date类型会出错，所以我们这里储存的是时间戳
  @State @Watch('refreshClassifiedStatistics') endDate: number = getEndOfTheDay(new Date()).getTime()
  @State @Watch('refreshClassifiedStatistics') beginDate: number = getFirstDateOfThisMonth(this.endDate).getTime()
  @State @Watch('refreshClassifiedStatistics') accountType: number = 0
  @State classifiedStatistics: Array<ClassifiedStatistic> = statisticByType(this.accounts, this.accountType, this.beginDate, this.endDate)
  @State totalAmount: number = this.classifiedStatistics.map(classifiedStatistic => classifiedStatistic.amount)
    .reduce((total, cur) => total + cur, 0)
  @State ratios: Array<number> = getRatios(this.classifiedStatistics)
  private scroller: Scroller = new Scroller()
  private dateSelectDialog: CustomDialogController = new CustomDialogController({
    builder: DateSelectDialog({
      beginDate: this.beginDate,
      endDate: this.endDate,
      onConfirm: (beginDate: number, endDate: number) => {
        this.beginDate = beginDate
        this.endDate = endDate
      }
    }),
    customStyle: true,
    alignment: DialogAlignment.Bottom
  });

  private refreshClassifiedStatistics() {
    this.classifiedStatistics = statisticByType(this.accounts, this.accountType, this.beginDate, this.endDate)
    this.totalAmount = this.classifiedStatistics.map(classifiedStatistic => classifiedStatistic.amount)
      .reduce((total, cur) => total + cur, 0)
    this.ratios = getRatios(this.classifiedStatistics)
  }

  build() {
    Scroll(this.scroller) {
      Column({ space: CommonConstants.SPACE_M }) {
        Column() {
          Text(formatDateTime(this.beginDate, 'yyyy.MM.dd') + '  -  ' + formatDateTime(this.endDate, 'yyyy.MM.dd'))
            .fontColor($r('app.color.gray'))
            .fontSize($r('app.float.font_size_M'))
            .onClick(() => this.dateSelectDialog.open())

          Row() {
            Stack() {
              DataPanel({
                values: this.classifiedStatistics.map(classifiedStatistic => classifiedStatistic.amount),
                max: 0
              })
                .aspectRatio(1)
              Column({ space: CommonConstants.SPACE_S }) {
                Text('总' + (this.accountType === 0 ? '支出' : '收入'))
                  .fontColor($r('app.color.gray'))
                  .fontSize($r('app.float.font_size_M'))
                Text(this.totalAmount.toString())
                  .fontColor($r('app.color.black'))
                  .fontSize($r('app.float.font_size_MP'))
                Image($r('app.media.switch'))
                  .width($r('app.float.component_size_SM'))
                  .onClick(() => this.accountType = this.accountType === 0 ? 1 : 0)
              }.justifyContent(FlexAlign.Center)
            }.width('70%')
            .aspectRatio(1)

            List({ space: CommonConstants.SPACE_S }) {
              ForEach(this.classifiedStatistics, (classifiedStatistic: ClassifiedStatistic, index: number) => {
                ListItem() {
                  Row({ space: CommonConstants.SPACE_S }) {
                    Text().backgroundColor(panelColors[index])
                      .aspectRatio(1)
                      .height($r('app.float.component_size_S'))
                      .borderRadius($r('app.float.radius_size_S'))
                    Text(classifiedStatistic.typeText)
                      .fontColor(panelColors[index])
                      .fontSize($r('app.float.font_size_S'))
                  }
                }
              })
            }.width('25%')
          }.justifyContent(FlexAlign.SpaceBetween)
          .alignItems(VerticalAlign.Center)
          .width(CommonConstants.FULL_WIDTH)

        }
        .justifyContent(FlexAlign.Center)
        .padding($r('app.float.edge_size_M'))
        .width(CommonConstants.FULL_WIDTH)
        .borderRadius($r('app.float.radius_size_L'))
        .backgroundColor(Color.White)

        Column({ space: CommonConstants.SPACE_M }) {
          Row() {
            Text('类别/比例')
              .fontColor($r('app.color.gray'))
              .fontSize($r('app.float.font_size_M'))
            Text('金额')
              .fontColor($r('app.color.gray'))
              .fontSize($r('app.float.font_size_M'))
          }.justifyContent(FlexAlign.SpaceBetween)
          .width(CommonConstants.FULL_WIDTH)

          List({ space: CommonConstants.SPACE_S }) {
            ForEach(this.classifiedStatistics, (classifiedStatistic: ClassifiedStatistic, index: number) => {
              ListItem() {
                Row() {
                  Text((index + 1).toString())
                    .fontSize($r('app.float.font_size_MP'))
                    .fontColor($r('app.color.gray'))
                    .margin({ right: $r('app.float.edge_size_M') })
                  Image(ImageList[classifiedStatistic.typeText])
                    .width($r('app.float.component_size_M'))
                    .aspectRatio(CommonConstants.FULL_SIZE)
                    .margin({ right: $r('app.float.edge_size_MP') })
                  Column() {
                    Text(classifiedStatistic.typeText)
                      .height($r('app.float.component_size_SM'))
                      .fontSize($r('app.float.font_size_M'))
                    Text(classifiedStatistic.count + '笔')
                      .fontSize($r('app.float.font_size_S'))
                      .fontColor($r('app.color.gray'))
                  }.alignItems(HorizontalAlign.Start)

                  Text('/' + (this.ratios[index] * 100).toFixed(2) + '%').height($r('app.float.component_size_SM'))
                    .fontSize($r('app.float.font_size_S'))
                    .fontColor($r('app.color.gray'))
                  Blank()
                    .layoutWeight(1)

                  Text(this.accountType === 0 ? '-' + classifiedStatistic.amount.toString() : '+' + classifiedStatistic.amount.toString())
                    .fontSize($r('app.float.font_size_M'))
                    .fontColor(this.accountType === 0 ? $r('app.color.pay_color') : $r('app.color.main_color'))
                    .align(Alignment.End)
                    .flexGrow(CommonConstants.FULL_SIZE)
                }
                .width(CommonConstants.FULL_WIDTH)
                .padding({ left: $r('app.float.edge_size_M'), right: $r('app.float.edge_size_M') })
              }
              .width(CommonConstants.FULL_WIDTH)
              .height($r('app.float.component_size_LM'))
            })
          }
          .width(CommonConstants.FULL_WIDTH)
        }
        .width(CommonConstants.FULL_WIDTH)
        .padding($r('app.float.edge_size_M'))
        .borderRadius($r('app.float.radius_size_L'))
        .backgroundColor(Color.White)
      }

      .width(CommonConstants.FULL_WIDTH)
    }
    .width(CommonConstants.FULL_WIDTH)
    .height(CommonConstants.FULL_HEIGHT)
    .align(Alignment.Top)
    .scrollBar(BarState.Off)
    .backgroundColor($r('app.color.background_color'))
    .padding({
      left: $r('app.float.edge_size_M'),
      right: $r('app.float.edge_size_M'),
      top: $r('app.float.edge_size_M')
    })
  }
}