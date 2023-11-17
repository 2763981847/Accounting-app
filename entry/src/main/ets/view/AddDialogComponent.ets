// 引入 Prompt 模块
import prompt from '@ohos.promptAction';
import Account from '../common/beans/Account';
import AccountClassification from '../common/beans/AccountClassification';
import CommonConstants from '../common/constants/CommonConstants';
import { EarnList, PayList } from '../viewmodel/AccountList';
import { formatDateTime } from '../common/utils/DateUtils';

// 声明一个 CustomDialog，用于创建自定义对话框组件
@CustomDialog
export default struct AddDialogComponent {
  controller?: CustomDialogController; // 对话框控制器
  @Link isInsert: boolean; // 是否插入新记录的标志
  @Link newAccount: Account; // 新账户的数据
  confirm?: (isInsert: boolean, newAccount: Account) => void; // 确认操作的回调函数
  private scroller: Scroller = new Scroller(); // 滚动器实例
  private inputAmount = ''; // 输入的金额字符串
  private inputDesc = ''; // 输入的描述字符串
  @State payList: Array<AccountClassification> = PayList; // 支出列表
  @State earnList: Array<AccountClassification> = EarnList; // 收入列表
  @State bgColor: string = ''; // 背景颜色
  @State curIndex: number = 0; // 当前选中的支付或收入索引
  @State curType: string = ''; // 当前选中的支付或收入类型
  private selectedDate: Date = this.newAccount.date // 选中的日期，默认为新账户的日期
  // 由于@State修饰Date类型时会出现错误，所以这里声明两个辅助变量
  @State dateString: string = formatDateTime(this.selectedDate, 'yyyy.MM.dd') // 日期字符串
  @State timeString: string = formatDateTime(this.selectedDate, 'HH:mm') // 时间字符串

  // 构建 Tab 标签页
  @Builder
  TabBuilder(index: number) {
    Column() {
      Text(index === 0 ? $r('app.string.pay_text') : $r('app.string.income_text'))
        .fontSize($r('app.float.font_size_M'))
        .fontColor(this.curIndex === index ? $r('app.color.main_color') : Color.Gray)
    }
    .width($r('app.float.component_size_MP'))
    .padding({ top: $r('app.float.edge_size_LM'), bottom: $r('app.float.edge_size_S') })
    .margin({ bottom: $r('app.float.edge_size_S') })
    .border(this.curIndex === index ? {
                                        width: { bottom: $r('app.float.border_size_M') },
                                        color: $r('app.color.main_color')
                                      } : { color: Color.White })
  }

  // 当即将出现时触发的生命周期函数
  aboutToAppear() {
    this.inputAmount = this.newAccount.amount.toString(); // 初始化输入金额
    this.curIndex = this.newAccount.accountType; // 初始化当前支付或收入索引
    this.curType = this.newAccount.typeText; // 初始化当前支付或收入类型
  }

  // 选择支付或收入类型
  selectAccount(item: AccountClassification) {
    this.newAccount.accountType = item.accountType;
    this.newAccount.typeText = item.typeText;
    this.curType = item.typeText;
  }

  // 构建对话框内容
  build() {
    Column({ space: CommonConstants.SPACE_M }) {
      // 关闭按钮
      Image($rawfile('half.png'))
        .width($r('app.float.component_size_L'))
        .height($r('app.float.component_size_S'))
        .onClick(() => {
          this.controller?.close();
        })

      // 顶部标签页切换
      Tabs({ barPosition: BarPosition.Start, index: this.curIndex }) {
        // 支出标签页
        TabContent() {
          // 支出类型列表
          Grid(this.scroller) {
            ForEach(this.payList, (item: AccountClassification) => {
              GridItem() {
                Column() {
                  Image(this.curType === item.typeText ? item.iconSelected : item.icon)
                    .width($r('app.float.image_size'))
                    .aspectRatio(CommonConstants.FULL_SIZE)

                  Text(item.typeText)
                    .fontSize($r('app.float.font_size_S'))
                    .fontColor(this.curType === item.typeText ? Color.White : $r('app.color.main_color'))
                    .margin({ top: $r('app.float.edge_size_S') })
                }
                .width($r('app.float.component_size_LP'))
                .aspectRatio(CommonConstants.FULL_SIZE)
                .padding({ top: $r('app.float.edge_size_M') })
                .margin({ top: $r('app.float.edge_size_MP'), left: $r('app.float.edge_size_M') })
                .align(Alignment.TopStart)
                .backgroundColor(this.curType === item.typeText ? $r('app.color.main_color') : $r('app.color.background_color'))
                .borderRadius($r('app.float.radius_size_S'))
                .onClick(() => {
                  this.selectAccount(item);
                })
              }
            })
          }
          .columnsTemplate('1fr 1fr 1fr 1fr')
          .scrollBar(BarState.Off)
        }
        .tabBar(this.TabBuilder(0))
        .margin({ bottom: $r('app.float.edge_size_LP') })

        // 收入标签页
        TabContent() {
          // 收入类型列表
          Grid(this.scroller) {
            ForEach(this.earnList, (item: AccountClassification) => {
              GridItem() {
                Column() {
                  Image(this.curType === item.typeText ? item.iconSelected : item.icon)
                    .width($r('app.float.image_size'))
                    .aspectRatio(CommonConstants.FULL_SIZE)

                  Text(item.typeText)
                    .fontSize($r('app.float.font_size_S'))
                    .fontColor(this.curType === item.typeText ? Color.White : $r('app.color.main_color'))
                    .margin({ top: $r('app.float.edge_size_S') })
                }
                .width($r('app.float.component_size_LP'))
                .aspectRatio(CommonConstants.FULL_SIZE)
                .padding({ top: $r('app.float.edge_size_M') })
                .margin({ top: $r('app.float.edge_size_MP'), left: $r('app.float.edge_size_M') })
                .align(Alignment.TopStart)
                .backgroundColor(this.curType === item.typeText ? $r('app.color.main_color') : $r('app.color.background_color'))
                .borderRadius($r('app.float.radius_size_S'))
                .onClick(() => {
                  this.selectAccount(item);
                })
              }
            })
          }
          .columnsTemplate('1fr 1fr 1fr 1fr')
          .scrollBar(BarState.Off)
        }
        .tabBar(this.TabBuilder(1))
        .margin({ bottom: $r('app.float.edge_size_LP') })
      }
      .width(CommonConstants.FULL_WIDTH)
      .height(CommonConstants.TABS_HEIGHT)
      .vertical(false)
      .barMode(BarMode.Fixed)
      .onChange((index) => {
        this.curIndex = index;
      })

      // 选择日期和时间
      Row({ space: CommonConstants.SPACE_M }) {
        Button(this.dateString + '  ▼')
          .onClick(() => {
            DatePickerDialog.show({ end: new Date(), selected: this.newAccount.date,
              onAccept: (value: DatePickerResult) => {
                this.selectedDate.setFullYear(value.year, value.month, value.day)
                this.dateString = formatDateTime(this.selectedDate, 'yyyy.MM.dd')
              } })
          })
          .fontColor($r('app.color.gray'))
          .fontSize($r('app.float.font_size_M'))
          .backgroundColor($r('app.color.white'))
        Button(this.timeString + '  ▼')
          .onClick(() => {
            TimePickerDialog.show({ useMilitaryTime: true, selected: this.newAccount.date,
              onAccept: (value: TimePickerResult) => {
                this.selectedDate.setHours(value.hour, value.minute)
                this.timeString = formatDateTime(this.selectedDate, 'HH:mm')
              } })
          })
          .fontColor($r('app.color.gray'))
          .fontSize($r('app.float.font_size_M'))
          .backgroundColor($r('app.color.white'))
      }.height('5%').justifyContent(FlexAlign.Center)

      // 输入金额
      Column() {
        Text($r('app.string.count_text'))
          .width(CommonConstants.FULL_WIDTH)
          .fontSize($r('app.float.font_size_MP'))
          .fontColor(Color.Black)

        Column() {
          TextInput({
            placeholder: $r("app.string.input_count_text"),
            text: this.newAccount.amount.toString()
          })
            .padding({ left: CommonConstants.MINIMUM_SIZE })
            .borderRadius(CommonConstants.MINIMUM_SIZE)
            .backgroundColor(Color.White)
            .type(InputType.Number)
            .onChange((value: string) => {
              this.inputAmount = value;
            })
        }
        .height($r('app.float.component_size_MP'))
        .padding({ top: $r('app.float.edge_size_MPM'), bottom: $r('app.float.edge_size_MM') })
        .borderWidth({ bottom: CommonConstants.FULL_SIZE })
        .borderColor($r('app.color.border_color'))
      }
      .width(CommonConstants.FULL_WIDTH)
      .padding({ left: $r('app.float.edge_size_M'), right: $r('app.float.edge_size_M') })

      // 输入描述
      Column() {
        Text($r('app.string.desc_text'))
          .width(CommonConstants.FULL_WIDTH)
          .fontSize($r('app.float.font_size_MP'))
          .fontColor(Color.Black)
        Column() {
          TextInput({
            placeholder: $r("app.string.input_desc_text"),
            text: this.newAccount.desc
          })
            .padding({ left: CommonConstants.MINIMUM_SIZE })
            .borderRadius(CommonConstants.MINIMUM_SIZE)
            .backgroundColor(Color.White)
            .type(InputType.Normal)
            .onChange((value: string) => {
              this.inputDesc = value;
            })
        }
        .height($r('app.float.component_size_MP'))
        .padding({ top: $r('app.float.edge_size_MPM'), bottom: $r('app.float.edge_size_MM') })
        .borderWidth({ bottom: CommonConstants.FULL_SIZE })
        .borderColor($r('app.color.border_color'))
      }
      .width(CommonConstants.FULL_WIDTH)
      .padding({ left: $r('app.float.edge_size_M'), right: $r('app.float.edge_size_M') })

      // 确认按钮
      Column() {
        Button() {
          Text($r('app.string.confirm_text'))
            .fontSize($r('app.float.font_size_M'))
            .fontColor(Color.White)
        }
        .width(CommonConstants.FULL_WIDTH)
        .height($r('app.float.component_size_M'))
        .onClick(() => {
          // 判断输入是否合法
          if (this.newAccount.typeText === '' || this.curIndex !== this.newAccount.accountType) {
            prompt.showToast({ message: CommonConstants.TOAST_TEXT_1, bottom: CommonConstants.PROMPT_BOTTOM });
          } else {
            let regex: RegExp = new RegExp('[1-9][0-9]*');
            let matchValue: Array<string> | null = this.inputAmount.match(regex);
            if (matchValue !== null && matchValue[0] === this.inputAmount) {
              // 合法输入，更新账户信息，调用确认回调函数
              this.newAccount.amount = Number(this.inputAmount);
              this.newAccount.date = this.selectedDate
              this.newAccount.desc = this.inputDesc
              this.confirm && this.confirm(this.isInsert, this.newAccount);
              this.controller?.close();
            } else {
              // 非法输入，提示用户重新输入
              prompt.showToast({ message: CommonConstants.TOAST_TEXT_2, bottom: CommonConstants.PROMPT_BOTTOM });
            }
          }
        })
      }
      .layoutWeight(CommonConstants.FULL_SIZE)
      .padding({
        bottom: $r('app.float.font_size_L'),
        left: $r('app.float.font_size_L'),
        right: $r('app.float.font_size_L')
      })
      .justifyContent(FlexAlign.End)
    }
    .width(CommonConstants.FULL_WIDTH)
    .height(CommonConstants.DIALOG_HEIGHT)
    .borderRadius({ topLeft: $r('app.float.font_size_L'), topRight: $r('app.float.font_size_L') })
    .backgroundColor(Color.White)
    .align(Alignment.BottomEnd)
  }
}
