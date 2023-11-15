

// 引入常量、日期格式化、统计等工具
import CommonConstants from '../common/constants/CommonConstants';
import { formatDateTime } from '../common/utils/DateUtils';
import { totalAmount } from '../common/utils/StatisticalUtils';
import Account from '../common/beans/Account';

// 定义一个构建器函数，用于生成分组表头
@Builder
export default function groupHeader(accounts: Array<Account>) {
  // 创建横向布局
  Row() {
    // 显示日期信息
    Text(formatDateTime(accounts[0].date, 'yyyy.MM.dd'))
      .fontColor($r('app.color.black'))
      .fontSize($r('app.float.font_size_M'));

    // 创建横向布局，用于显示支出、收入、结余的统计信息
    Row() {
      // 显示支出总额
      Text('支 ' + totalAmount(accounts, 0))
        .fontColor($r('app.color.gray'))
        .fontSize($r('app.float.font_size_S'));

      // 显示收入总额
      Text('收 ' + totalAmount(accounts, 1))
        .fontColor($r('app.color.gray'))
        .fontSize($r('app.float.font_size_S'));

      // 显示结余信息（收入总额 - 支出总额）
      Text('结余 ' + (totalAmount(accounts, 1) - totalAmount(accounts, 0)))
        .fontColor($r('app.color.gray'))
        .fontSize($r('app.float.font_size_S'));
    }.justifyContent(FlexAlign.SpaceAround) // 设置横向布局的子元素排列方式
    .width('35%'); // 设置横向布局的宽度
  }.justifyContent(FlexAlign.SpaceBetween) // 设置主布局的子元素排列方式
  .width(CommonConstants.FULL_WIDTH) // 设置主布局的宽度为全屏
  .margin({
    top: $r('app.float.edge_size_L'), // 设置上边距
    bottom: $r('app.float.edge_size_L') // 设置下边距
  })
  .padding({
    left: $r('app.float.edge_size_M'), // 设置左内边距
    right: $r('app.float.edge_size_M') // 设置右内边距
  });
}
