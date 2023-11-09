import CommonConstants from '../common/constants/CommonConstants';
import { formatDateTime } from '../common/utils/DateUtils';
import { totalAmount } from '../common/utils/StatisticalUtils';
import AccountData from '../viewmodel/AccountData';


@Builder
export default function groupHeader(accounts: Array<AccountData>) {
  Row() {
    Text(formatDateTime(accounts[0].date, 'yyyy.MM.dd'))
      .fontColor($r('app.color.black'))
      .fontSize($r('app.float.font_size_M'))
    Row() {
      Text('支 ' + totalAmount(accounts, 0))
        .fontColor($r('app.color.gray'))
        .fontSize($r('app.float.font_size_S'))
      Text('收 ' + totalAmount(accounts, 1))
        .fontColor($r('app.color.gray'))
        .fontSize($r('app.float.font_size_S'))
      Text('结余 ' + (totalAmount(accounts, 1) - totalAmount(accounts, 0)))
        .fontColor($r('app.color.gray'))
        .fontSize($r('app.float.font_size_S'))
    }.justifyContent(FlexAlign.SpaceAround)
    .width('35%')
  }.justifyContent(FlexAlign.SpaceBetween)
  .width(CommonConstants.FULL_WIDTH)
  .margin({
    top: $r('app.float.edge_size_L'), bottom: $r('app.float.edge_size_L')
  })
  .padding({
    left: $r('app.float.edge_size_M'), right: $r('app.float.edge_size_M')
  })
}