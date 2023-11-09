import CommonConstants from '../common/constants/CommonConstants'
import {
  formatDateTime,
  getEndOfTheDay,
  getFirstDateOfThisMonth,
  getFirstDateOfThisYear,
  getMondayOfWeek
} from '../common/utils/DateUtils'

type Option = {
  name: string
  action: () => void
}

@CustomDialog
export default struct DateSelectDialog {
  @Prop beginDate: number
  @Prop endDate: number
  @State selectedIndex: number = 0
  private controller: CustomDialogController
  private onConfirm: (beginDate: number, endDate: number) => void
  private readonly options: Array<Option> = [{
    name: '本周',
    action: () => {
      const now = Date.now()
      this.onConfirm(getMondayOfWeek(now).getTime(), getEndOfTheDay(now).getTime())
    }
  },
    {
      name: '本月',
      action: () => {
        const now = Date.now()
        this.onConfirm(getFirstDateOfThisMonth(now).getTime(), getEndOfTheDay(now).getTime())
      }
    },
    {
      name: '本年',
      action: () => {
        const now = Date.now()
        this.onConfirm(getFirstDateOfThisYear(now).getTime(), getEndOfTheDay(now).getTime())
      }
    },
    {
      name: '自定义',
      action: () => {
        this.onConfirm(this.beginDate, getEndOfTheDay(this.endDate).getTime())
      }
    },]

  build() {
    Column() {
      Row() {
        Text('取消')
          .fontSize($r('app.float.font_size_M'))
          .fontColor($r('app.color.gray'))
          .onClick(() => this.controller.close())
        Text('统计时间')
          .fontSize($r('app.float.font_size_MP'))
          .fontColor($r('app.color.black'))
        Text('保存')
          .fontSize($r('app.float.font_size_M'))
          .fontColor($r('app.color.sava_color'))
          .onClick(() => {
            this.options[this.selectedIndex].action()
            this.controller.close()
          })
      }.justifyContent(FlexAlign.SpaceBetween)
      .width(CommonConstants.FULL_WIDTH)

      List({ space: CommonConstants.SPACE_S }) {
        ForEach(this.options, (option: Option, index: number) => {
          ListItem() {
            Row() {
              Text(option.name)
                .fontColor($r('app.color.black'))
                .fontSize($r('app.float.font_size_M'))
              if (this.selectedIndex === index) {
                Text('✔')
                  .fontColor($r('app.color.sava_color'))
                  .fontSize($r('app.float.font_size_S'))
              }
            }.width(CommonConstants.FULL_WIDTH)
            .justifyContent(FlexAlign.SpaceBetween)
          }
          .height($r('app.float.component_size_LM'))
          .onClick(() => this.selectedIndex = index)
        })
      }.divider({ strokeWidth: CommonConstants.DIVIDER_SIZE_S, color: $r('app.color.list_divider_color') })

      if (this.options[this.selectedIndex].name === '自定义') {
        Row() {
          Button(formatDateTime(this.beginDate, 'yyyy.MM.dd') + '  ▼')
            .onClick(() => {
              DatePickerDialog.show({
                end: new Date(this.endDate),
                selected: new Date(this.beginDate),
                onAccept: (value: DatePickerResult) => {
                  this.beginDate = new Date(value.year, value.month, value.day).getTime()
                } })
            })

            .fontColor($r('app.color.gray'))
            .fontSize($r('app.float.font_size_M'))
            .backgroundColor($r('app.color.white'))
          Text('至')
            .fontColor($r('app.color.black'))
            .fontSize($r('app.float.font_size_M'))
          Button(formatDateTime(this.endDate, 'yyyy.MM.dd') + '  ▼')
            .onClick(() => {
              DatePickerDialog.show({
                start: new Date(this.beginDate),
                end: new Date(),
                selected: new Date(this.endDate),
                onAccept: (value: DatePickerResult) => {
                  this.endDate = new Date(value.year, value.month, value.day).getTime()
                }
              })
            })
            .fontColor($r('app.color.gray'))
            .fontSize($r('app.float.font_size_M'))
            .backgroundColor($r('app.color.white'))
        }.height('5%').justifyContent(FlexAlign.SpaceAround).width(CommonConstants.FULL_WIDTH)
      }
    }
    .width(CommonConstants.FULL_WIDTH)
    .height(CommonConstants.DIALOG_HEIGHT)
    .padding({
      top: $r('app.float.font_size_L'),
      left: $r('app.float.font_size_L'),
      right: $r('app.float.font_size_L')
    })
    .borderRadius({ topLeft: $r('app.float.font_size_L'), topRight: $r('app.float.font_size_L') })
    .backgroundColor(Color.White)
    .align(Alignment.BottomEnd)
  }
}
