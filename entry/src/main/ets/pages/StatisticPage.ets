// 该组件用于展示统计页面，包括支出和收入的分类统计信息

// 引入常量、工具和组件
import CommonConstants from '../common/constants/CommonConstants';
import { getEndOfTheDay, getFirstDateOfThisMonth } from '../common/utils/DateUtils';
import { getRatios, statisticByType } from '../common/utils/StatisticalUtils';
import DateSelectComponent from '../view/DateSelectComponent';
import Account from '../common/beans/Account';
import { ImageList } from '../viewmodel/AccountList';
import ClassifiedStatistic from '../common/beans/ClassifiedStatistic';
import { panelColors } from '../viewmodel/PanelColors';

// 使用@Link和@State修饰符管理组件的数据和状态
@Component
export default struct StatisticPage {
  @Link @Watch('refreshClassifiedStatistics') accounts: Array<Account>;
  // 由于@State修饰Date类型可能出错，因此这里存储的是时间戳
  @State @Watch('refreshClassifiedStatistics') endDate: number = getEndOfTheDay(new Date()).getTime();
  @State @Watch('refreshClassifiedStatistics') beginDate: number = getFirstDateOfThisMonth(this.endDate).getTime();
  @State @Watch('refreshClassifiedStatistics') accountType: number = 0;
  @State classifiedStatistics: Array<ClassifiedStatistic> = statisticByType(this.accounts, this.accountType, this.beginDate, this.endDate);
  @State totalAmount: number = this.classifiedStatistics.map(classifiedStatistic => classifiedStatistic.amount)
    .reduce((total, cur) => total + cur, 0);
  @State ratios: Array<number> = getRatios(this.classifiedStatistics);
  private scroller: Scroller = new Scroller();

  // 刷新分类统计信息
  private refreshClassifiedStatistics() {
    this.classifiedStatistics = statisticByType(this.accounts, this.accountType, this.beginDate, this.endDate);
    this.totalAmount = this.classifiedStatistics
      .map(classifiedStatistic => classifiedStatistic.amount)
      .reduce((total, cur) => total + cur, 0);
    this.ratios = getRatios(this.classifiedStatistics);
  }

  // 渲染页面
  build() {
    Scroll(this.scroller) {
      Column({ space: CommonConstants.SPACE_M }) {
        Column() {
          // 日期选择组件
          DateSelectComponent({
            beginDate: $beginDate,
            endDate: $endDate,
            selectedIndex: 0
          }).width(CommonConstants.EIGHTY_PERCENT);

          Row() {
            Stack() {
              // 数据面板
              DataPanel({
                values: this.classifiedStatistics.map(classifiedStatistic => classifiedStatistic.amount),
                max: 0
              })
                .aspectRatio(1);
              Column({ space: CommonConstants.SPACE_S }) {
                // 总支出/收入文本
                Text('总' + (this.accountType === 0 ? '支出' : '收入'))
                  .fontColor($r('app.color.gray'))
                  .fontSize($r('app.float.font_size_M'));
                // 总金额文本
                Text(this.totalAmount.toString())
                  .fontColor($r('app.color.black'))
                  .fontSize($r('app.float.font_size_MP'));
                // 切换按钮
                Image($r('app.media.switch'))
                  .width($r('app.float.component_size_SM'))
                  .onClick(() => this.accountType = this.accountType === 0 ? 1 : 0);
              }.justifyContent(FlexAlign.Center);
            }.width('70%')
            .aspectRatio(1);

            // 列表展示分类统计信息
            List({ space: CommonConstants.SPACE_S }) {
              ForEach(this.classifiedStatistics, (classifiedStatistic: ClassifiedStatistic, index: number) => {
                ListItem() {
                  Row({ space: CommonConstants.SPACE_S }) {
                    // 分类面板
                    Text().backgroundColor(panelColors[index])
                      .aspectRatio(1)
                      .height($r('app.float.component_size_S'))
                      .borderRadius($r('app.float.radius_size_S'));
                    // 分类类型文本
                    Text(classifiedStatistic.typeText)
                      .fontColor(panelColors[index])
                      .fontSize($r('app.float.font_size_S'));
                  }
                }
              });
            }.width('25%');
          }.justifyContent(FlexAlign.SpaceBetween)
          .alignItems(VerticalAlign.Center)
          .width(CommonConstants.FULL_WIDTH);
        }
        .justifyContent(FlexAlign.Center)
        .padding($r('app.float.edge_size_M'))
        .width(CommonConstants.FULL_WIDTH)
        .borderRadius($r('app.float.radius_size_L'))
        .backgroundColor(Color.White);

        Column({ space: CommonConstants.SPACE_M }) {
          // 类别/比例标题行
          Row() {
            Text('类别/比例')
              .fontColor($r('app.color.gray'))
              .fontSize($r('app.float.font_size_M'));
            Text('金额')
              .fontColor($r('app.color.gray'))
              .fontSize($r('app.float.font_size_M'));
          }.justifyContent(FlexAlign.SpaceBetween)
          .width(CommonConstants.FULL_WIDTH);

          // 列表展示详细分类统计信息
          List({ space: CommonConstants.SPACE_S }) {
            ForEach(this.classifiedStatistics, (classifiedStatistic: ClassifiedStatistic, index: number) => {
              ListItem() {
                Row() {
                  // 排名文本
                  Text((index + 1).toString())
                    .fontSize($r('app.float.font_size_MP'))
                    .fontColor($r('app.color.gray'))
                    .margin({ right: $r('app.float.edge_size_M') });
                  // 分类图标
                  Image(ImageList[classifiedStatistic.typeText])
                    .width($r('app.float.component_size_M'))
                    .aspectRatio(CommonConstants.FULL_SIZE)
                    .margin({ right: $r('app.float.edge_size_MP') });
                  Column() {
                    // 分类类型文本
                    Text(classifiedStatistic.typeText)
                      .height($r('app.float.component_size_SM'))
                      .fontSize($r('app.float.font_size_M'));
                    // 笔数文本
                    Text(classifiedStatistic.count + '笔')
                      .fontSize($r('app.float.font_size_S'))
                      .fontColor($r('app.color.gray'));
                  }.alignItems(HorizontalAlign.Start)
                  .margin({ right: $r('app.float.edge_size_M') });
                  // 比例文本
                  Text('/' + (this.ratios[index] * 100).toFixed(2) + '%').height($r('app.float.component_size_SM'))
                    .fontSize($r('app.float.font_size_S'))
                    .fontColor($r('app.color.gray'));
                  // 占位
                  Blank()
                    .layoutWeight(1);
                  // 金额文本
                  Text(this.accountType === 0 ? '-' + classifiedStatistic.amount.toString() : '+' + classifiedStatistic.amount.toString())
                    .fontSize($r('app.float.font_size_M'))
                    .fontColor(this.accountType === 0 ? $r('app.color.pay_color') : $r('app.color.main_color'))
                    .align(Alignment.End)
                    .flexGrow(CommonConstants.FULL_SIZE);
                }
                .width(CommonConstants.FULL_WIDTH)
                .padding({ left: $r('app.float.edge_size_M'), right: $r('app.float.edge_size_M') });
              }
              .width(CommonConstants.FULL_WIDTH)
              .height($r('app.float.component_size_LM'));
            });
          }
          .width(CommonConstants.FULL_WIDTH);
        }
        .width(CommonConstants.FULL_WIDTH)
        .padding($r('app.float.edge_size_M'))
        .borderRadius($r('app.float.radius_size_L'))
        .backgroundColor(Color.White);
      }

      .width(CommonConstants.FULL_WIDTH)

    }
    // 整体布局设置
    .width(CommonConstants.FULL_WIDTH)
    .height(CommonConstants.FULL_HEIGHT)
    .align(Alignment.Top)
    .scrollBar(BarState.Off)
    .backgroundColor($r('app.color.background_color'))
    .padding({
      left: $r('app.float.edge_size_M'),
      right: $r('app.float.edge_size_M'),
      top: $r('app.float.edge_size_M')
    });
  }
}
