import CommonConstants from '../common/constants/CommonConstants'
import {
  formatDateTime,
  getDateRangeOfThisMonth,
  getDateRangeOfThisWeek,
  getDateRangeOfThisYear,
  getEndOfTheDay,
  getFirstDateOfThisMonth,
  getFirstDateOfThisYear,
  getMondayOfWeek,
  isSameDay
} from '../common/utils/DateUtils'
import { DateRange } from '../types'


type Option = {
  name: string
  canSwitch: boolean
  getDateRange: (customBeginDate?: number, customEndDate?: number) => DateRange
  getDateString: (beginDate: number, endDate: number) => string
  switch?: (curDate: number, toNext: boolean) => DateRange
}

enum DateSelectOption {
  ThisWeek = '本周',
  ThisMonth = '本月',
  ThisYear = '本年',
  All = '全部',
  CUSTOM = '自定义',
}

const dateSelectOptions: Array<Option> = [{
  name: DateSelectOption.ThisWeek,
  canSwitch: true,
  getDateRange: () => {
    const now = Date.now();
    return { beginDate: getMondayOfWeek(now).getTime(), endDate: getEndOfTheDay(now).getTime() };
  },
  getDateString: (beginDate, endDate) => formatDateTime(beginDate, 'yyyy.MM.dd') + '  -  ' + formatDateTime(endDate, 'yyyy.MM.dd'),
  switch: (curDate: number, toNext: boolean) => {
    const date = new Date(curDate)
    date.setDate(date.getDate() + (toNext ? 7 : -7))
    return getDateRangeOfThisWeek(date);
  },
},
  {
    name: DateSelectOption.ThisMonth,
    canSwitch: true,
    getDateRange: () => {
      const now = Date.now();
      return { beginDate: getFirstDateOfThisMonth(now).getTime(), endDate: getEndOfTheDay(now).getTime() };
    },
    getDateString: (beginDate, endDate) => formatDateTime(beginDate, 'yyyy.MM') + "月",
    switch: (curDate: number, toNext: boolean) => {
      const date = new Date(curDate)
      date.setMonth(date.getMonth() + (toNext ? 1 : -1))
      return getDateRangeOfThisMonth(date);
    }
  },
  {
    name: DateSelectOption.ThisYear,
    canSwitch: true,
    getDateRange: () => {
      const now = Date.now();
      return { beginDate: getFirstDateOfThisYear(now).getTime(), endDate: getEndOfTheDay(now).getTime() };
    },
    getDateString: (beginDate, endDate) => formatDateTime(beginDate, 'yyyy') + "年",
    switch: (curDate: number, toNext: boolean) => {
      const date = new Date(curDate)
      date.setFullYear(date.getFullYear() + (toNext ? 1 : -1))
      return getDateRangeOfThisYear(date);
    }
  },
  {
    name: DateSelectOption.All,
    canSwitch: false,
    getDateRange: () => {
      const now = Date.now();
      return { beginDate: 0, endDate: getEndOfTheDay(now).getTime() };
    },
    getDateString: (beginDate, endDate) => '    开始    ' + '  -  ' + formatDateTime(endDate, 'yyyy.MM.dd')
  },
  {
    name: DateSelectOption.CUSTOM,
    canSwitch: false,
    getDateRange: (customBeginDate: number = 0, customEndDate: number = Date.now()) => {
      return { beginDate: customBeginDate, endDate: getEndOfTheDay(customEndDate).getTime() }
    },
    getDateString: (beginDate, endDate) => formatDateTime(beginDate, 'yyyy.MM.dd') + '  -  ' + formatDateTime(endDate, 'yyyy.MM.dd')
  }
]


@Component
export default struct DateSelectComponent {
  @Link endDate: number
  @Link beginDate: number
  @State selectedIndex: number = 0;
  private dateSelectDialog: CustomDialogController = new CustomDialogController({
    builder: DateSelectDialog({
      beginDate: this.beginDate,
      endDate: this.endDate,
      selectedIndex: this.selectedIndex,
      onConfirm: (beginDate: number, endDate: number, selectedIndex: number) => {
        this.beginDate = beginDate
        this.endDate = endDate
        this.selectedIndex = selectedIndex
      }
    }),
    customStyle: true,
    alignment: DialogAlignment.Bottom
  });

  build() {
    Row() {
      if (dateSelectOptions[this.selectedIndex].canSwitch) {
        Text('<')
          .fontColor($r('app.color.gray'))
          .fontSize($r('app.float.font_size_M'))
          .onClick(() => {
            const dateRange = dateSelectOptions[this.selectedIndex].switch(this.beginDate, false)
            this.beginDate = dateRange.beginDate
            this.endDate = dateRange.endDate
          })
      } else {
        Text('')
      }
      Text(dateSelectOptions[this.selectedIndex].getDateString(this.beginDate, this.endDate))
        .fontColor($r('app.color.gray'))
        .fontSize($r('app.float.font_size_M'))
        .onClick(() => this.dateSelectDialog.open())
      if (dateSelectOptions[this.selectedIndex].canSwitch && !isSameDay(this.endDate, Date.now())) {
        Text('>')
          .fontColor($r('app.color.gray'))
          .fontSize($r('app.float.font_size_M'))
          .onClick(() => {
            const dateRange = dateSelectOptions[this.selectedIndex].switch(this.beginDate, true)
            this.beginDate = dateRange.beginDate
            if (dateRange.endDate > Date.now()) {
              this.endDate = getEndOfTheDay(Date.now()).getTime()
            } else this.endDate = dateRange.endDate
          })
      } else {
        Text('')
      }
    }.justifyContent(FlexAlign.SpaceBetween)
    .width(CommonConstants.FULL_WIDTH)
  }
}

@CustomDialog
export struct DateSelectDialog {
  @Prop beginDate: number
  @Prop endDate: number
  @Prop selectedIndex: number
  private controller: CustomDialogController
  private onConfirm: (beginDate: number, endDate: number, selectedIndex: number) => void

  build() {
    Column({ space: CommonConstants.SPACE_M }) {
      Image($rawfile('half.png'))
        .width($r('app.float.component_size_L'))
        .height($r('app.float.component_size_S'))
        .onClick(() => {
          this.controller?.close();
        })
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
            const {beginDate,endDate} = dateSelectOptions[this.selectedIndex].getDateRange(this.beginDate, this.endDate)
            this.onConfirm(beginDate, endDate, this.selectedIndex)
            this.controller.close()
          })
      }.justifyContent(FlexAlign.SpaceBetween)
      .width(CommonConstants.FULL_WIDTH)

      List({ space: CommonConstants.SPACE_S }) {
        ForEach(dateSelectOptions, (option: Option, index: number) => {
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

      if (dateSelectOptions[this.selectedIndex].name === '自定义') {
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
      left: $r('app.float.font_size_L'),
      right: $r('app.float.font_size_L')
    })
    .borderRadius({ topLeft: $r('app.float.font_size_L'), topRight: $r('app.float.font_size_L') })
    .backgroundColor(Color.White)
    .align(Alignment.BottomEnd)
  }
}
